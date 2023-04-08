import { Story, Meta } from '@storybook/react/types-6-0';
import ProductView from '.';

export default {
  title: 'ProductView',
  component: ProductView
} as Meta

export const Default: Story = () => <ProductView />;
