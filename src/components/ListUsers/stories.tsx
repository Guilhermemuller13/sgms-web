import { Story, Meta } from '@storybook/react/types-6-0';
import ListUsers from '.';

export default {
  title: 'ListUsers',
  component: ListUsers
} as Meta

export const Default: Story = () => <ListUsers />;
