import { motion, useReducedMotion } from "framer-motion";

interface WatercolorBlobProps {
  color: string;
  size?: number; // px
  className?: string;
  opacity?: number;
  /** Тривалість «дихання», сек */
  duration?: number;
  delay?: number;
}

/**
 * Декоративна акварельна пляма: radial-gradient + blur,
 * повільно «дихає» (масштаб і легкий дрейф), нескінченно.
 */
export default function WatercolorBlob({
  color,
  size = 480,
  className = "",
  opacity = 0.5,
  duration = 14,
  delay = 0,
}: WatercolorBlobProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        background: `radial-gradient(circle at 40% 40%, ${color} 0%, ${color}66 45%, transparent 70%)`,
        filter: "blur(48px)",
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.12, 0.96, 1],
              x: [0, 24, -16, 0],
              y: [0, -20, 14, 0],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
