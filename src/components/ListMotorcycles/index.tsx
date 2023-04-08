import { Edit } from '@styled-icons/material-outlined';
import { useRouter } from 'next/router';

import Button from '../Button';

import * as S from './styles';

type Motorcycle = {
  dataValues: {
    brand: string;
    color: string;
    engine_capacity: string;
    id: number;
    license_plate: string;
    year: string;
  };
};

export type ListMotorcyclesProps = {
  motorcycles: Motorcycle[];
};

const ListMotorcycles = ({ motorcycles }: ListMotorcyclesProps) => {
  const routes = useRouter();

  const handleEditUser = (id: number) => {
    return routes.push(`/motorcycles/${id}`);
  };

  const renderMotorcycles = () => {
    return (motorcycles || []).map((motorcycle) => (
      <S.MotorcycleWrapper key={motorcycle.dataValues.id}>
        <S.Brand>{motorcycle.dataValues.brand}</S.Brand>
        <S.Year>Ano: {motorcycle.dataValues.year}</S.Year>
        <S.Engine>Potência: {motorcycle.dataValues.engine_capacity}cc</S.Engine>
        <S.LicensePlate>
          Placa: {motorcycle.dataValues.license_plate}
        </S.LicensePlate>
        <S.Actions>
          <Button
            icon={<Edit />}
            size="small"
            onClick={() => handleEditUser(motorcycle.dataValues.id)}
          />
        </S.Actions>
      </S.MotorcycleWrapper>
    ));
  };

  return <S.Wrapper>{renderMotorcycles()}</S.Wrapper>;
};

export default ListMotorcycles;
