import { ThemeControls } from './ThemeControls';
import {
  ButtonDemo,
  CheckboxDemo,
  ColorsDemo,
  InputDemo,
  SelectDemo,
  SpacingDemo,
  SwitchDemo,
  TypographyDemo,
} from './sections';
import './Demo.css';

export function Demo() {
  return (
    <div className="demo">
      <ThemeControls />
      <div className="demo__content">
        <ButtonDemo />
        <InputDemo />
        <CheckboxDemo />
        <SwitchDemo />
        <SelectDemo />
        <ColorsDemo />
        <TypographyDemo />
        <SpacingDemo />
      </div>
    </div>
  );
}
