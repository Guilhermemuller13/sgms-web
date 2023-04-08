import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import Base from '../../../templates/Base';
import Container from '../../../components/Container';

import api from '../../../services/api';
import { withSession } from '../../../services/auth/session';

import * as S from '../styles';
import { tokenService } from '../../../services/auth/tokenService';
import { UserSession } from '../../../types/models';

import ProductView from '../../../components/ProductView';

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

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <ProductView product={dataValues} />
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
