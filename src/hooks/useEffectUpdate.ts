import {
  DependencyList, EffectCallback, useEffect, useRef,
} from 'react';

export const useEffectUpdate = (effect: EffectCallback, deps?: DependencyList): void => {
  const allowEffect = useRef(false);

  useEffect(() => {
    if (allowEffect.current) {
      effect();
    } else {
      allowEffect.current = true;
    }
  }, deps);
};
