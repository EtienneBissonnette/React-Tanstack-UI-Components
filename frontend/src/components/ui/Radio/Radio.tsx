import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import {
  forwardRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import "./Radio.css";

type RadioSize = "sm" | "md" | "lg";
type RadioOrientation = "horizontal" | "vertical";

/* =============================================================================
   RadioGroup - Container for Radio items
   ============================================================================= */

interface RadioGroupProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "defaultValue"
> {
  /** Current selected value */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Callback when selection changes */
  onValueChange?: (value: string) => void;
  /** Layout orientation */
  orientation?: RadioOrientation;
  /** Size of all radio buttons in group */
  size?: RadioSize;
  /** Disable all radios in group */
  disabled?: boolean;
  /** Radio items */
  children: ReactNode;
  /** Optional group label */
  label?: string;
}

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      orientation = "vertical",
      size = "md",
      disabled = false,
      children,
      label,
      className = "",
      ...props
    },
    ref
  ) => {
    const classes = ["radio-group", className].filter(Boolean).join(" ");

    return (
      <BaseRadioGroup
        ref={ref}
        className={classes}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(val) => val && onValueChange?.(String(val))}
        disabled={disabled}
        data-orientation={orientation}
        data-size={size !== "md" ? size : undefined}
        {...props}
      >
        {label && <span className="radio-group__label">{label}</span>}
        <div className="radio-group__items">{children}</div>
      </BaseRadioGroup>
    );
  }
);

RadioGroupRoot.displayName = "RadioGroup";

/* =============================================================================
   Radio - Individual radio button
   ============================================================================= */

interface RadioProps {
  /** Value for this radio option */
  value: string;
  /** Optional label */
  label?: string;
  /** Description text below label */
  description?: string;
  /** Size variant (inherits from group if not set) */
  size?: RadioSize;
  /** Disable this radio option */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
}

const RadioItem = forwardRef<HTMLElement, RadioProps>(
  ({ value, label, description, size, className = "", disabled }, ref) => {
    const classes = ["radio", className].filter(Boolean).join(" ");

    const radio = (
      <BaseRadio.Root
        ref={ref}
        className={classes}
        value={value}
        disabled={disabled}
        data-size={size}
      >
        <BaseRadio.Indicator className="radio__indicator" />
      </BaseRadio.Root>
    );

    if (label || description) {
      return (
        <label
          className="radio__label"
          data-disabled={disabled ? "" : undefined}
        >
          {radio}
          <span className="radio__content">
            {label && <span className="radio__text">{label}</span>}
            {description && (
              <span className="radio__description">{description}</span>
            )}
          </span>
        </label>
      );
    }

    return radio;
  }
);

RadioItem.displayName = "Radio";

/* =============================================================================
   Exports
   ============================================================================= */

export const RadioGroup = RadioGroupRoot;
export const Radio = RadioItem;
