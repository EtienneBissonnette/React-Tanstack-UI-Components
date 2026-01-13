'use no forget';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook to temporarily skip auto-reset behavior in TanStack Table.
 * Used when editing cells to prevent the table from resetting page/sort/filter state.
 *
 * @returns [shouldSkip, skip] - Current skip state and function to trigger skip
 */
export function useSkipper() {
  const shouldSkipRef = useRef(true);
  // eslint-disable-next-line react-hooks/refs -- Intentional: This pattern is from TanStack Table's editable-data example
  const shouldSkip = shouldSkipRef.current;

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  // eslint-disable-next-line react-hooks/refs -- Intentional: shouldSkip is captured before render completes
  return [shouldSkip, skip] as const;
}
