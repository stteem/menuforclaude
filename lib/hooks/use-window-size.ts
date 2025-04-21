import { useEffect, useState } from "react";

export default function useWindowSize() {
  const isClient = typeof window === 'object';

  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  useEffect(() => {
    if (!isClient) {
      return;
    }
    
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]); // Include isClient dependency

  return {
    windowSize,
    isMobile: typeof windowSize?.width === "number" && windowSize?.width < 768,
    isDesktop: typeof windowSize?.width === "number" && windowSize?.width >= 768,
  };
}
