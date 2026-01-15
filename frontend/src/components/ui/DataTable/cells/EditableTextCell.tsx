'use no forget';

import { useState, useCallback, useRef } from 'react';
import type { CellContext } from '@tanstack/react-table';
import { AlertCircle, X } from 'lucide-react';
import { Input } from '../../Input';
import { useDataTableContext } from '../DataTableContext';

export function EditableTextCell<TData>({
  getValue,
  row,
  column,
  table,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
CellContext<TData, any>) {
  const initialValue = getValue() as string;
  const [editValue, setEditValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shouldShake, setShouldShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isEditMode, cellWithError, setCellWithError } = useDataTableContext<TData>();

  // Check if this cell is the one with an error
  const isThisCellWithError = cellWithError?.rowIndex === row.index && cellWithError?.columnId === column.id;
  // Check if another cell has an error (blocks editing this cell)
  const isBlockedByOtherError = cellWithError !== null && !isThisCellWithError;

  const startEditing = useCallback(() => {
    if (!isEditMode || isBlockedByOtherError) return;
    setEditValue(initialValue ?? '');
    setIsEditing(true);
    setErrorMessage(null);
  }, [initialValue, isEditMode, isBlockedByOtherError]);

  const triggerShake = useCallback(() => {
    setShouldShake(true);
    // Remove shake after animation completes
    setTimeout(() => setShouldShake(false), 400);
  }, []);

  const handleSave = useCallback(async () => {
    // If value unchanged, just exit
    if (editValue === initialValue) {
      setIsEditing(false);
      setErrorMessage(null);
      setCellWithError(null);
      return;
    }

    const { validateAndUpdate, updateData } = table.options.meta ?? {};

    // Get validator from column meta
    const validator = column.columnDef.meta?.validate;

    if (validator) {
      setIsValidating(true);
      const result = await Promise.resolve(validator(editValue, column.id, row.index));
      setIsValidating(false);

      if (!result.valid) {
        // Show error inline, keep editing
        setErrorMessage(result.message ?? 'Invalid value');
        setCellWithError({ rowIndex: row.index, columnId: column.id });
        triggerShake();
        // Defer focus to ensure it happens after React re-renders
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
        return;
      }
    }

    // Validation passed or no validator - update the data
    if (validateAndUpdate) {
      await validateAndUpdate(row.index, column.id, editValue);
    } else if (updateData) {
      updateData(row.index, column.id, editValue);
    }

    setIsEditing(false);
    setErrorMessage(null);
    setCellWithError(null);
  }, [editValue, initialValue, table.options.meta, row.index, column.id, column.columnDef.meta?.validate, setCellWithError, triggerShake]);

  const handleCancel = useCallback(() => {
    setEditValue(initialValue ?? '');
    setIsEditing(false);
    setErrorMessage(null);
    setCellWithError(null);
  }, [initialValue, setCellWithError]);

  const handleBlur = (e: React.FocusEvent) => {
    // Don't close if clicking on the error popover or cancel button
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget?.closest('.data-table__cell-error')) {
      return;
    }
    handleSave();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="data-table__cell-edit-wrapper" data-shake={shouldShake || undefined}>
        <Input
          ref={inputRef}
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value);
            // Clear error when user starts typing
            if (errorMessage) {
              setErrorMessage(null);
              setCellWithError(null);
            }
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          size="sm"
          className="data-table__cell-input"
          data-validating={isValidating || undefined}
          data-error={errorMessage ? true : undefined}
          disabled={isValidating}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `error-${row.id}-${column.id}` : undefined}
        />
        {errorMessage && (
          <div
            className="data-table__cell-error"
            id={`error-${row.id}-${column.id}`}
            role="alert"
          >
            <div className="data-table__cell-error-content">
              <AlertCircle className="data-table__cell-error-icon" />
              <span>{errorMessage}</span>
            </div>
            <div className="data-table__cell-error-footer">
              <span className="data-table__cell-error-hint">
                <kbd>Esc</kbd> to cancel
              </span>
              <button
                type="button"
                className="data-table__cell-error-dismiss"
                onClick={handleCancel}
                aria-label="Dismiss and reset value"
              >
                <X size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const canEdit = isEditMode && !isBlockedByOtherError;

  return (
    <div
      className="data-table__cell-text"
      onClick={canEdit ? startEditing : undefined}
      onKeyDown={
        canEdit
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                startEditing();
              }
            }
          : undefined
      }
      tabIndex={canEdit ? 0 : undefined}
      role={canEdit ? 'button' : undefined}
      aria-label={canEdit ? `Edit ${column.id}: ${initialValue}` : undefined}
      data-readonly={!isEditMode || undefined}
      data-blocked={isBlockedByOtherError || undefined}
    >
      {initialValue || '\u00A0'}
    </div>
  );
}

EditableTextCell.displayName = 'EditableTextCell';
