import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import Base from '../../templates/Base';
import Button from '../../components/Button';
import Container from '../../components/Container';
import ListProducts, { ListProductsProps } from '../../components/ListProducts';

import api from '../../services/api';
import { tokenService } from '../../services/auth/tokenService';

import * as S from './styles';
import { UserSession } from '../../types/models';
import { withSession } from '../../services/auth/session';

type ProductsProps = { session: UserSession } & ListProductsProps;

const Products = ({ products, session }: ProductsProps) => {
  const routes = useRouter();

  const renderActionNewProduct = () => {
    return <Button onClick={() => routes.push('/products/new')}>Novo</Button>;
  };

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <S.WrapperListActions>
            {renderActionNewProduct()}
          </S.WrapperListActions>
          <ListProducts products={products} />
        </S.Wrapper>
      </Container>
    </Base>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps<ListProductsProps> =
  withSession(async (context: GetServerSidePropsContext) => {
    const { session } = context.req;
    const token = tokenService.get({ context: context });

    try {
      const { data } = await api.get(`/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return {
        props: {
          products: data,
          session: session
        }
      };
    } catch (error) {
      return {
        props: {
          products: [],
          session: session
        }
      };
    }
  }, 'view:products');
