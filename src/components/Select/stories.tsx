import { Story, Meta } from '@storybook/react/types-6-0';

import Select, { SelectProps } from '.';

export default {
  title: 'Select',
  component: Select,
  args: {
    label: 'Selecione o tipo de usuário',
    initialValue: 2
  }
} as Meta<SelectProps>;

export const Default: Story<SelectProps> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <Select {...args}>
      <option value={1}>Administrador</option>
      <option value={2}>Usuário</option>
    </Select>
  </div>
);
