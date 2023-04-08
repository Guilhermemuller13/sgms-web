import { Story, Meta } from '@storybook/react/types-6-0';
import FormProduct from '.';

export default {
  title: 'Form/FormProduct',
  component: FormProduct
} as Meta;

export const Default: Story = (args) => (
  <div style={{ width: 300, margin: 'auto' }}>
    <FormProduct {...args} />
  </div>
);
