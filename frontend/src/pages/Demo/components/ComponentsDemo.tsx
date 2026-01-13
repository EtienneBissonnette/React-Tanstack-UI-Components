import {
  ButtonDemo,
  CheckboxDemo,
  ColorsDemo,
  DrawerDemo,
  InputDemo,
  ModalDemo,
  SelectDemo,
  SpacingDemo,
  SwitchDemo,
  ToastDemo,
  TypographyDemo,
} from './subcomponents';
import './ComponentsDemo.css';

export function ComponentsDemo() {
  return (
    <div className="components-demo">
      <ButtonDemo />
      <InputDemo />
      <CheckboxDemo />
      <SwitchDemo />
      <SelectDemo />
      <ModalDemo />
      <DrawerDemo />
      <ToastDemo />
      <ColorsDemo />
      <TypographyDemo />
      <SpacingDemo />
    </div>
  );
}
