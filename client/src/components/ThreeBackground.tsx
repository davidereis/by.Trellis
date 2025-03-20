import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useWebGL } from "@/lib/hooks/use-webgl";

const ThreeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initialize, animate } = useWebGL();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const { cleanup } = initialize(canvasRef.current);
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cleanup();
      window.removeEventListener("resize", handleResize);
    };
  }, [initialize, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen z-[-1] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ThreeBackground;
