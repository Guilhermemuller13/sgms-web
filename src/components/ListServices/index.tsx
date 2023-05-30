import { useRouter } from "next/router";

import { getImageUrl } from "../../utils/getImageUrl";
import Card from "../Card";

import * as S from "./styles";

type Service = {
  dataValues: {
    photos: string;
    description: string;
    name: string;
    price: string;
    id: string;
  };
};

export type ListServicesProps = { services: Service[] };

const ListServices = ({ services }: ListServicesProps) => {
  const routes = useRouter();
  const handleClickService = (id: string) => {
    if (id) {
      return routes.push(`/services/view/${id}`);
    }
  };

  const renderProducts = () => {
    return (services || []).map((service) => (
      <Card
        onClick={() => handleClickService(service.dataValues.id)}
        imageSrc={getImageUrl(service.dataValues.photos?.split(";")[0])}
        title={service.dataValues.name}
        description={service.dataValues.description}
        price={service.dataValues.price}
        key={service.dataValues.id}
      />
    ));
  };

  return <S.Wrapper>{renderProducts()}</S.Wrapper>;
};

export default ListServices;
