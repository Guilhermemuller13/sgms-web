import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';

import Container from '../../components/Container';
import FormProduct, { FormProductSchema } from '../../components/FormProduct';
import Base from '../../templates/Base';

import api from '../../services/api';
import { withSession } from '../../services/auth/session';
import { UserSession } from '../../types/models';

import * as S from './styles';

type ProductNewProps = { session: UserSession };

const ProductNew = ({ session }: ProductNewProps) => {
  const routes = useRouter();

  const handleSubmitForm = async (values: FormProductSchema) => {
    const product: Omit<FormProductSchema, 'photos'> = {
      name: values.name,
      quantity_minimum: +values.quantity_minimum,
      available: values.available,
      brand: values.brand,
      code: values.code,
      description: values.description,
      price: values.price,
      quantity: +values.quantity
    };

    try {
      const { data } = await api.post('/products', product);

      if (Array.from(values.photos).length > 0) {
        const formData = new FormData();
        Array.from(values.photos).forEach((photo) =>
          formData.append('photos', photo.file)
        );
        const productId = data.dataValues.id;
        await api.post(`/products/files/${productId}`, formData);
      }
      return routes.push('/products');
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <FormProduct handleSubmitForm={handleSubmitForm} />
        </S.Wrapper>
      </Container>
    </Base>
  );
};

export const getServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const { session } = context.req;

    return {
      props: {
        session: session
      }
    };
  },
  'manage:products'
);

export default ProductNew;
