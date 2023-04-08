import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import Base from '../../../templates/Base';
import Container from '../../../components/Container';
import FormProduct, {
  FormProductSchema
} from '../../../components/FormProduct';

import api from '../../../services/api';
import { withSession } from '../../../services/auth/session';

import * as S from '../styles';
import { tokenService } from '../../../services/auth/tokenService';
import { UserSession } from '../../../types/models';

type ProductEditProps = {
  product: any;
  productid: number;
  session: UserSession;
};

const ProductEdit = ({
  product: { dataValues },
  productid,
  session
}: ProductEditProps) => {
  const routes = useRouter();

  const handleSubmitForm = async (values: FormProductSchema) => {
    const token = tokenService.get({ context: null });
    const filesFiltered = values.updatedFiles?.filter(
      (file) => !file.src.includes('blob')
    );

    const product: Omit<FormProductSchema, 'photos'> = {
      name: values.name,
      quantity_minimum: values.quantity_minimum,
      available: values.available,
      brand: values.brand,
      code: values.code,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      updatedFiles: filesFiltered?.map((file) => ({
        src: file.src.replace('http://localhost:3333/', ''),
        id: file.id
      }))
    };

    try {
      await api.put(`/products/${productid}`, product, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const files = Array.from(values.photos);

      if (files.length > 0) {
        const hasNewFiles = files.find((file) => !!file.file);
        if (hasNewFiles) {
          const formData = new FormData();

          files.forEach((photo) => {
            if (!!photo.file && photo.file instanceof File) {
              formData.append('photos', photo.file);
            }
          });

          await api.post(`/products/files/${productid}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      }
      return routes.push('/products');
    } catch (error) {
      console.log({ error });
    }

    return;
  };

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <FormProduct
            handleSubmitForm={handleSubmitForm}
            productForEdit={{
              ...dataValues,
              photos: JSON.parse(dataValues.photos)
            }}
          />
        </S.Wrapper>
      </Container>
    </Base>
  );
};

export const getServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const { session } = context.req;
    const token = tokenService.get({ context: context });

    try {
      const { data } = await api.get(`/products/${context.params.productid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return {
        props: {
          product: data,
          productid: +context.params.productid,
          session: session
        }
      };
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: '/products'
        }
      };
    }
  },
  'manage:products'
);

export default ProductEdit;
