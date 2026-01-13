import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { type ReactNode, type ReactElement } from "react";
import "./Tooltip.css";

type TooltipSide = "top" | "right" | "bottom" | "left";
type TooltipAlign = "start" | "center" | "end";

interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  delayDuration?: number;
}

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
  delayDuration = 300,
}: TooltipProps) {
  return (
    <BaseTooltip.Provider delay={delayDuration}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            side={side}
            align={align}
            sideOffset={sideOffset}
          >
            <BaseTooltip.Popup className="tooltip">
              <BaseTooltip.Arrow className="tooltip__arrow" />
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}

Tooltip.displayName = "Tooltip";
