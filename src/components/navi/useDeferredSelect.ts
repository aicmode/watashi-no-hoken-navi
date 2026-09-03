"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 選択肢をタップしたとき、「選ばれた状態」を一瞬見せてから次へ進めるための小さなフック。
 *
 * 押した瞬間に画面が切り替わると「選ばされた」感が出るため、
 * 選択状態のフィードバックを見せてから遷移する。
 * prefers-reduced-motion でも遅延はごく短く、体験を妨げない。
 */
export function useDeferredSelect<T>(onSelect: (id: T) => void, delay = 220) {
  const [pending, setPending] = useState<T | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const select = useCallback(
    (id: T) => {
      if (timer.current) clearTimeout(timer.current);
      setPending(id);
      timer.current = setTimeout(() => onSelect(id), delay);
    },
    [onSelect, delay],
  );

  return { pending, select };
}
