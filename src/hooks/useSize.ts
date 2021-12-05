import { useLayoutEffect, useRef, useState } from "react";

/**
 * Get the size of a HTML element
 * @param selector CSS Selector
 * @returns [width, height]
 */
export default function useSize(selector: string, deps?: any) {
  const [size, setSize] = useState<number[]>([0, 0]);
  const timer = useRef(0);
  function getElement(selector: string): Promise<HTMLElement> {
    return new Promise((resolve) => {
      timer.current = setInterval(() => {
        const el = document.querySelector(selector) as HTMLElement;
        if (el) {
          resolve(el);
          clearInterval(timer.current);
        }
      }, 400) as any;
    });
  }

  useLayoutEffect(() => {
    getElement(selector).then((el) => {
      setSize([el.offsetWidth, el.offsetHeight]);
    });

    return () => {
      clearInterval(timer.current);
    };
  }, [selector, deps]);
  return size;
}
