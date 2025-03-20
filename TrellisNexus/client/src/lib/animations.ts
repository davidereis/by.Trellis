import { Variants } from "framer-motion";

// Common animation variants to be used throughout the site
export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay: number = 0): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.7,
        delay: delay,
        ease: "easeOut"
      }
    }
  };
};

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };
};

export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 5px rgba(0, 175, 255, 0.6), 0 0 10px rgba(0, 175, 255, 0.4)"
  },
  animate: {
    boxShadow: [
      "0 0 5px rgba(0, 175, 255, 0.6), 0 0 10px rgba(0, 175, 255, 0.4)",
      "0 0 10px rgba(0, 175, 255, 0.8), 0 0 20px rgba(0, 175, 255, 0.6), 0 0 30px rgba(0, 175, 255, 0.4)",
      "0 0 5px rgba(0, 175, 255, 0.6), 0 0 10px rgba(0, 175, 255, 0.4)"
    ],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const float: Variants = {
  initial: {
    y: 0
  },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const textGradientAnimation: Variants = {
  initial: {
    backgroundPosition: "0% 50%"
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const revealInOut: Variants = {
  initial: {
    clipPath: "inset(0 100% 0 0)"
  },
  animate: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  },
  exit: {
    clipPath: "inset(0 0 0 100%)",
    transition: {
      duration: 0.75,
      ease: "easeInOut"
    }
  }
};
