import { useRouter } from "next/router";

import { getImageUrl } from "../../utils/getImageUrl";
import Card from "../Card";

import * as S from "./styles";

export type Product = {
  dataValues: {
    photos: string;
    description: string;
    name: string;
    price: string;
    id: string;
  };
};

export type ListProductsProps = { products: Product[] };

const ListProducts = ({ products }: ListProductsProps) => {
  const routes = useRouter();
  const handleClickProduct = (id: string) => {
    if (id) {
      return routes.push(`/products/view/${id}`);
    }
  };

  const renderProducts = () => {
    return (products || []).map((product) => (
      <Card
        onClick={() => handleClickProduct(product.dataValues.id)}
        imageSrc={getImageUrl(product.dataValues.photos?.split(";")[0])}
        title={product.dataValues.name}
        description={product.dataValues.description}
        price={product.dataValues.price}
        key={product.dataValues.id}
      />
    ));
  };

  return <S.Wrapper>{renderProducts()}</S.Wrapper>;
};

export default ListProducts;
