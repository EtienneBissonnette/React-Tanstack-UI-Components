import {
  AvatarDemo,
  BadgeDemo,
  ButtonDemo,
  CardDemo,
  CheckboxDemo,
  ColorsDemo,
  DrawerDemo,
  DropdownMenuDemo,
  InputDemo,
  ModalDemo,
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
      <SelectDemo />
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
