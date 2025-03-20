import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if the element or its parent has interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button");
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Only show on desktop devices */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          mixBlendMode: isHovering ? "plus-lighter" : "screen",
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: 1,
          x: "-50%",
          y: "-50%",
        }}
        transition={{
          scale: { type: "spring", stiffness: 500, damping: 30 },
          opacity: { duration: 0.2 }
        }}
      >
        <div 
          className="w-5 h-5 bg-cyan/50 rounded-full" 
          style={{
            boxShadow: isHovering 
              ? "0 0 15px rgba(0, 175, 255, 0.8), 0 0 30px rgba(0, 175, 255, 0.4)" 
              : "0 0 5px rgba(0, 175, 255, 0.6), 0 0 10px rgba(0, 175, 255, 0.3)"
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
