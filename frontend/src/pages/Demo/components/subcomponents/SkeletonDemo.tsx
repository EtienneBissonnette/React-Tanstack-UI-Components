import { Skeleton } from "@/components/ui";
import { DemoSection } from "../../DemoSection";

export function SkeletonDemo() {
  return (
    <DemoSection title="Skeleton">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
        }}
      >
        {/* Text lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <Skeleton width="100%" />
          <Skeleton width="80%" />
          <Skeleton width="60%" />
        </div>

        {/* Circular avatars */}
        <div className="demo-section__row" style={{ gap: "var(--space-4)" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="circular" width={64} height={64} />
        </div>

        {/* Rectangular cards */}
        <div className="demo-section__row" style={{ gap: "var(--space-4)" }}>
          <Skeleton variant="rectangular" width={120} height={80} />
          <Skeleton variant="rectangular" width={160} height={100} />
        </div>

        {/* Combined: avatar + text (common pattern) */}
        <div
          className="demo-section__row"
          style={{ gap: "var(--space-3)", alignItems: "center" }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: "var(--space-2)",
            }}
          >
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </div>
        </div>

        {/* No animation example */}
        <div
          className="demo-section__row"
          style={{ gap: "var(--space-3)", alignItems: "center" }}
        >
          <Skeleton width={100} animate={false} />
          <span className="demo-section__label">No animation</span>
        </div>
      </div>
    </DemoSection>
  );
}
