import { GetServerSidePropsContext } from "next";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import Base from "../templates/Base";
import Container from "../components/Container";

import { withSession } from "../services/auth/session";

import { UserSession } from "../types/models";

import * as S from "./home/styles";
import { tokenService } from "../services/auth/tokenService";
import api from "../services/api";
import CardDashboard from "../components/CardDashboard";
import TableUsers from "../components/TableUsers";
import TableStockProducts from "../components/TableStockProducts";

export type HomeTemplateProps = { session: UserSession; dashboard: any };

const Index = ({ session, dashboard }: HomeTemplateProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const {
    totalProducts,
    totalProductsUsed,
    totalServices,
    mostUsedProducts,
    lastUsers,
    lowStockProducts,
  } = dashboard;

  const data = {
    labels: [...mostUsedProducts.map((product: any) => product.name)],
    datasets: [
      {
        label: "# produto",
        data: [...mostUsedProducts.map((product: any) => product.quantity)],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Base session={session}>
      <Container>
        <S.Wrapper>
          <S.Cards>
            <CardDashboard
              description="Produtos em estoque"
              title={totalProducts > 1000 ? `${totalProducts}k` : totalProducts}
            />
            <CardDashboard
              description="Qtd de produtos utilizados"
              title={
                totalProductsUsed > 1000
                  ? `${totalProductsUsed}k`
                  : totalProductsUsed
              }
            />
            <CardDashboard
              description="Serviços realizados"
              title={totalServices > 1000 ? `${totalServices}k` : totalServices}
            />
          </S.Cards>
          <S.WrapperDataGraphics>
            <S.Graphic>
              <S.GraphicTitle>Produtos mais utilizados</S.GraphicTitle>
              <Pie data={data} />
            </S.Graphic>
            <S.ListUsers>
              <div>
                <S.GraphicTitle>Últimos usuários cadastrados</S.GraphicTitle>
                <TableUsers data={lastUsers} />
              </div>
              <div style={{ marginTop: "2rem" }}>
                <S.GraphicTitle>Produtos com baixa em estoque</S.GraphicTitle>
                <TableStockProducts data={lowStockProducts} />
              </div>
            </S.ListUsers>
          </S.WrapperDataGraphics>
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
      const { data: dashboard } = await api.get(`/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        props: {
          dashboard: dashboard,
          session: session,
        },
      };
    } catch (error) {
      return {
        props: {
          session: session,
        },
      };
    }
  },
  "view:home"
);

export default Index;
