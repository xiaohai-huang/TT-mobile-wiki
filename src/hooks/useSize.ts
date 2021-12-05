import { useEffect, useState } from "react";

/**
 * Get the size of a HTML element
 * @param selector CSS Selector
 * @returns [width, height]
 */
export default function useSize(selector: string) {
  const [size, setSize] = useState<number[]>([]);

  useEffect(() => {
    getElement(selector).then((el) => {
      setSize([el.offsetWidth, el.offsetHeight]);
    });
  }, [selector]);
  return size;
}

function getElement(selector: string): Promise<HTMLElement> {
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      const el = document.querySelector(selector) as HTMLElement;
      if (el) {
        resolve(el);
        clearInterval(timer);
      }
    }, 400);
  });
}
