import {
  AvatarDemo,
  BadgeDemo,
  BreadcrumbDemo,
  ButtonDemo,
  CardDemo,
  CheckboxDemo,
  ColorsDemo,
  DrawerDemo,
  DropdownMenuDemo,
  InputDemo,
  ModalDemo,
  ProgressDemo,
  RadioDemo,
  SelectDemo,
  SkeletonDemo,
  SpacingDemo,
  SwitchDemo,
  ToastDemo,
  TooltipDemo,
  TypographyDemo,
} from './subcomponents';
import './ComponentsDemo.css';

export function ComponentsDemo() {
  return (
    <div className="components-demo">
      <ButtonDemo />
      <BadgeDemo />
      <AvatarDemo />
      <InputDemo />
      <CheckboxDemo />
      <SwitchDemo />
      <RadioDemo />
      <SelectDemo />
      <ProgressDemo />
      <BreadcrumbDemo />
      <TooltipDemo />
      <DropdownMenuDemo />
      <ModalDemo />
      <DrawerDemo />
      <CardDemo />
      <SkeletonDemo />
      <ToastDemo />
      <ColorsDemo />
      <TypographyDemo />
      <SpacingDemo />
    </div>
  );
}
