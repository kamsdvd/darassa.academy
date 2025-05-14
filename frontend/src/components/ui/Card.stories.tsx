import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>Card Title</CardHeader>
        <CardBody>This is the card content</CardBody>
        <CardFooter>Card Footer</CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>Elevated Card</CardHeader>
        <CardBody>This card has an elevated style</CardBody>
        <CardFooter>Footer content</CardFooter>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardHeader>Outlined Card</CardHeader>
        <CardBody>This card has an outlined style</CardBody>
        <CardFooter>Footer content</CardFooter>
      </>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <>
        <CardHeader>Filled Card</CardHeader>
        <CardBody>This card has a filled style</CardBody>
        <CardFooter>Footer content</CardFooter>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <>
        <CardHeader>No Padding Card</CardHeader>
        <CardBody>This card has no padding</CardBody>
        <CardFooter>Footer content</CardFooter>
      </>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: (
      <>
        <CardHeader>Small Padding Card</CardHeader>
        <CardBody>This card has small padding</CardBody>
        <CardFooter>Footer content</CardFooter>
      </>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: (
      <>
        <CardHeader>Large Padding Card</CardHeader>
        <CardBody>This card has large padding</CardBody>
        <CardFooter>Footer content</CardFooter>
      </>
    ),
  },
}; 