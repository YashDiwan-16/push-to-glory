import { useState, useCallback } from 'react';

export interface ToggleActions {
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

/**
 * Custom hook for boolean toggle state
 * Provides convenient actions for toggle operations
 */
export function useToggle(
  initialValue = false
): [boolean, ToggleActions] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const setValueCallback = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  const actions: ToggleActions = {
    toggle,
    setTrue,
    setFalse,
    setValue: setValueCallback,
  };

  return [value, actions];
}

export default useToggle;
