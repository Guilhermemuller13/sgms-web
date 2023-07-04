import { Story, Meta } from '@storybook/react/types-6-0';
import ListProducts, { ListProductsProps } from '.';

export default {
  title: 'ListProducts',
  component: ListProducts,
  args: {
    products: []
  }
} as Meta<ListProductsProps>;

export const Default: Story<ListProductsProps> = (args) => (
  <ListProducts {...args} />
);
