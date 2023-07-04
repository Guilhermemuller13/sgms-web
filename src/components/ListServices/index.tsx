import { useRouter } from "next/router";

import TableServices from "../TableServices";

import * as S from "./styles";

export type Service = {
  dataValues: {
    description: string;
    name: string;
    id: string;
  };
};

export type ListServicesProps = { services: Service[] };

const ListServices = ({ services }: ListServicesProps) => {
  const routes = useRouter();

  const handleClickService = (id: string) => {
    if (!!id) {
      return routes.push(`/services/${id}`);
    }
  };

  const renderProducts = () => {
    return (
      <TableServices data={services} handleClickService={handleClickService} />
    );
  };

  return <S.Wrapper>{renderProducts()}</S.Wrapper>;
};

export default ListServices;
