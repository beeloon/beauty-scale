import { motion, useReducedMotion } from "framer-motion";
import type { BeautyTier } from "../data/tiers";
import { darken } from "../utils/color";

interface TierCardProps {
  tier: BeautyTier;
  /** Найвищий тір отримує gold-leaf акцент і легке світіння */
  highlighted?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TierCard({ tier, highlighted = false }: TierCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={cardVariants}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={`group relative overflow-hidden rounded-card bg-surface px-7 py-9 transition-shadow duration-500 md:px-12 md:py-12 ${
        highlighted
          ? "border border-gold/50 shadow-[0_0_60px_rgba(201,162,75,0.18)]"
          : "border border-line"
      }`}
    >
      {/* кольорова акцентна пляма */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-50 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-80"
        style={{
          background: `radial-gradient(circle, ${tier.color} 0%, transparent 70%)`,
        }}
      />

      {highlighted && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      )}

      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <div className="flex shrink-0 items-baseline gap-3 md:flex-col md:gap-1">
          <span
            className={`font-display text-5xl font-light leading-none md:text-6xl ${
              highlighted ? "text-gold" : "text-ink/20"
            }`}
          >
            {String(tier.id).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-caps text-ink-soft">
            рівень
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-4xl font-light text-ink md:text-5xl">
            {tier.name}
          </h3>
          <p
            className="mt-2 text-sm font-semibold uppercase tracking-caps"
            style={{
              color: highlighted ? "#A07B2C" : darken(tier.color, 0.55),
            }}
          >
            {tier.tagline}
          </p>
          <p className="mt-5 max-w-prose leading-relaxed text-ink-soft">
            {tier.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Ключові слова">
            {tier.keywords.map((word) => (
              <li
                key={word}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-ink"
                style={{ backgroundColor: `${tier.color}40` }}
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
