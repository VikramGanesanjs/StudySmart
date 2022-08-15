import React, { useRef, useEffect } from "react";

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    tick();
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
