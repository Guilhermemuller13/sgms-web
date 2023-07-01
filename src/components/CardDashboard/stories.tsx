import { Story, Meta } from '@storybook/react/types-6-0';
import styled, { css } from 'styled-components';

import Card, { CardProps } from '.';

export default {
  title: 'Card',
  component: Card,
  args: {
    imageSrc:
      'https://cdn.autopapo.com.br/box/uploads/2021/11/24222455/salao-de-milao-2021-13.-yamaha-mt-10-srorm-2.jpg',
    title: 'Motocicleta',
    description: 'Texto referente ao produto que está exposto aqui',
    price: '25,90'
  }
} as Meta<CardProps>;

export const Default: Story<CardProps> = (args) => <Card {...args} />;

const WrapperListCards = styled.div`
  ${() => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
    justify-items: center;
    align-items: center;
    grid-gap: 3px;
  `}
`;

export const ListCards: Story<CardProps> = (args) => {
  return (
    <WrapperListCards>
      <Card {...args} />
      <Card {...args} />
      <Card {...args} />
      <Card {...args} />
      <Card {...args} />
      <Card {...args} />
      <Card {...args} />
    </WrapperListCards>
  );
};
