import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { tiers } from "../data/tiers";
import { darken, lerpHex, mixWithBg } from "../utils/color";

const STEPS = tiers.length - 1;

export default function LiveScale() {
  const [slider, setSlider] = useState(0.44);
  const dragging = useRef(false);
  const reduceMotion = useReducedMotion();

  const gradient = `linear-gradient(90deg, ${tiers
    .map((t) => t.color)
    .join(", ")})`;

  const pos = slider * STEPS;
  const lo = Math.floor(pos);
  const hi = Math.min(STEPS, lo + 1);
  const nearest = tiers[Math.round(pos)];
  const liveColor = lerpHex(tiers[lo].color, tiers[hi].color, pos - lo);

  const updateFromEvent = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSlider(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const snap = Math.round(pos);
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSlider(Math.min(STEPS, snap + 1) / STEPS);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSlider(Math.max(0, snap - 1) / STEPS);
    } else if (e.key === "Home") {
      e.preventDefault();
      setSlider(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSlider(1);
    }
  };

  return (
    <section aria-label="Жива шкала" className="px-6 py-24">
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
          Проведіть по шкалі — від рум'янцю до вина
        </p>

        <div
          className="rounded-card border border-line px-6 py-10 text-center transition-colors duration-500 md:px-16 md:py-14"
          style={{ backgroundColor: mixWithBg(liveColor, 0.2) }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-caps text-ink-soft">
            Рівень {nearest.id} із 6
          </p>
          <motion.h3
            key={nearest.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="font-display font-light leading-[1.05] transition-colors duration-500"
            style={{
              fontSize: "clamp(3rem, 12vw, 6rem)",
              color: darken(liveColor, 0.45),
            }}
          >
            {nearest.name}
          </motion.h3>
          <p
            className="mt-4 text-sm font-semibold uppercase tracking-caps transition-colors duration-500"
            style={{ color: darken(liveColor, 0.55) }}
          >
            {nearest.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-ink-soft">
            {nearest.description}
          </p>
          <ul
            className="mt-6 flex flex-wrap justify-center gap-2"
            aria-label="Ключові слова"
          >
            {nearest.keywords.map((word) => (
              <li
                key={word}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-ink"
                style={{ backgroundColor: `${nearest.color}55` }}
              >
                {word}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-12 max-w-2xl">
            <div
              role="slider"
              tabIndex={0}
              aria-label="Рівень шкали краси"
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuenow={nearest.id}
              aria-valuetext={nearest.name}
              onPointerDown={(e) => {
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                updateFromEvent(e);
              }}
              onPointerMove={(e) => {
                if (dragging.current) updateFromEvent(e);
              }}
              onPointerUp={() => {
                dragging.current = false;
              }}
              onKeyDown={onKeyDown}
              className="relative flex h-11 cursor-pointer touch-none items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <div
                className="h-[18px] w-full rounded-full shadow-[inset_0_1px_3px_rgba(42,36,49,0.12)]"
                style={{ background: gradient }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-surface shadow-[0_4px_14px_rgba(42,36,49,0.25)] transition-[border-color] duration-300"
                style={{
                  left: `${(slider * 100).toFixed(2)}%`,
                  borderColor: liveColor,
                }}
              />
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-y-1 sm:grid-cols-6">
              {tiers.map((tier, i) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSlider(i / STEPS)}
                  className={`px-0 py-1 text-xs transition-colors ${
                    tier.id === nearest.id
                      ? "font-bold text-ink"
                      : "font-medium text-ink-soft hover:text-ink"
                  }`}
                >
                  {tier.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
