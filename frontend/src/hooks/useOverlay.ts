import { useSearch, useNavigate } from '@tanstack/react-router';
import { useCallback, useMemo } from 'react';

export interface UseOverlayOptions {
  /** Local controlled state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** URL-driven mode */
  searchParamKey?: string;
  searchParamValue?: string;
}

export interface UseOverlayReturn {
  /** Whether the overlay is open */
  isOpen: boolean;
  /** Open the overlay */
  open: () => void;
  /** Close the overlay */
  close: () => void;
  /** Toggle the overlay */
  toggle: () => void;
  /** Whether this is URL-driven mode */
  isUrlDriven: boolean;
}

export function useOverlay(options: UseOverlayOptions): UseOverlayReturn {
  const {
    open: localOpen,
    onOpenChange,
    searchParamKey,
    searchParamValue,
  } = options;

  const isUrlDriven = Boolean(searchParamKey && searchParamValue);

  // Use strict: false to work without route-specific search param validation
  const search = useSearch({ strict: false }) as Record<string, unknown>;
  const navigate = useNavigate();

  const urlOpen = useMemo(() => {
    if (!isUrlDriven || !searchParamKey) return false;
    return search?.[searchParamKey] === searchParamValue;
  }, [isUrlDriven, searchParamKey, searchParamValue, search]);

  const isOpen = isUrlDriven ? urlOpen : Boolean(localOpen);

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (isUrlDriven && searchParamKey) {
        const newSearch = {
          ...search,
          [searchParamKey]: nextOpen ? searchParamValue : undefined,
          // Clear overlay data when closing
          ...(nextOpen ? {} : { overlayData: undefined }),
        };
        navigate({
          search: newSearch as never,
          replace: true,
        });
      } else {
        onOpenChange?.(nextOpen);
      }
    },
    [isUrlDriven, searchParamKey, searchParamValue, navigate, onOpenChange, search]
  );

  const openOverlay = useCallback(() => setOpen(true), [setOpen]);
  const closeOverlay = useCallback(() => setOpen(false), [setOpen]);
  const toggleOverlay = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  return {
    isOpen,
    open: openOverlay,
    close: closeOverlay,
    toggle: toggleOverlay,
    isUrlDriven,
  };
}
