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
      <header className="demo__header">
        <h1 className="demo__title">Design System</h1>
        <p className="demo__subtitle">
          Interactive component showcase with theme customization
        </p>
      </header>
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
