import { motion, useReducedMotion } from "framer-motion";
import WatercolorBlob from "./WatercolorBlob";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <WatercolorBlob
        color="#E4A6AE"
        size={640}
        className="-top-40 left-1/2 -translate-x-[80%]"
        opacity={0.45}
      />
      <WatercolorBlob
        color="#F0C39C"
        size={520}
        className="right-[-10%] top-1/3"
        opacity={0.4}
        duration={18}
        delay={2}
      />
      <WatercolorBlob
        color="#C98BA9"
        size={420}
        className="bottom-[-15%] left-[-5%]"
        opacity={0.35}
        duration={16}
        delay={4}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6 text-xs font-semibold uppercase tracking-caps text-ink-soft"
      >
        Візуальний словник
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35 }}
        className="font-display font-light leading-[1.05] text-ink"
        style={{ fontSize: "clamp(3.25rem, 10vw, 7.5rem)" }}
      >
        Шкала краси
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8 max-w-xl text-balance text-base leading-relaxed text-ink-soft md:text-lg"
      >
        Шість відтінків привабливості в українській мові — від м'якої,
        затишної миловидності до сяйва, що межує з ідеалом.
      </motion.p>

      <motion.a
        href="#intro"
        aria-label="Прокрутити донизу"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-10 flex flex-col items-center gap-3 text-ink-soft transition-colors hover:text-ink"
      >
        <span className="text-[11px] font-medium uppercase tracking-caps">
          Гортайте
        </span>
        <motion.span
          aria-hidden="true"
          className="block h-12 w-px bg-gradient-to-b from-ink-soft/60 to-transparent"
          animate={reduceMotion ? undefined : { scaleY: [1, 0.6, 1], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.a>
    </header>
  );
}
