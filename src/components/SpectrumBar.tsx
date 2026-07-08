import { motion } from "framer-motion";
import { tiers } from "../data/tiers";

export default function SpectrumBar() {
  const gradient = `linear-gradient(90deg, ${tiers
    .map((t) => t.color)
    .join(", ")})`;

  return (
    <section aria-label="Спектр відтінків" className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto max-w-4xl"
      >
        <h2 className="mb-3 text-center text-xs font-semibold uppercase tracking-caps text-ink-soft">
          Спектр
        </h2>
        <p className="mb-12 text-center font-display text-3xl font-light text-ink md:text-4xl">
          Від теплого рум'янцю — до глибокого вина
        </p>

        <div
          className="h-4 w-full rounded-full md:h-5"
          style={{ background: gradient }}
        />

        <ul className="mt-5 grid grid-cols-3 gap-y-6 sm:grid-cols-6">
          {tiers.map((tier) => (
            <li key={tier.id} className="group relative flex flex-col items-center">
              <span
                aria-hidden="true"
                className="mb-2 block h-2.5 w-2.5 rounded-full ring-2 ring-white transition-transform duration-300 group-hover:scale-150"
                style={{ backgroundColor: tier.color }}
              />
              <span className="text-center text-[11px] font-medium text-ink-soft transition-colors group-hover:text-ink sm:text-xs">
                {tier.name}
              </span>

              {/* tooltip */}
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full mb-3 w-max max-w-[180px] -translate-y-1 rounded-xl bg-surface px-3.5 py-2 text-center text-[11px] leading-snug text-ink opacity-0 shadow-[0_8px_24px_rgba(42,36,49,0.12)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                {tier.tagline}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
