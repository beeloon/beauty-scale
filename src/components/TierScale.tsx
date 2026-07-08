import { motion } from "framer-motion";
import { tiers } from "../data/tiers";
import TierCard from "./TierCard";
import WatercolorBlob from "./WatercolorBlob";

const TOP_TIER_ID = 6;

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function TierScale() {
  // Висхідна композиція: тір 6 зверху → тір 1 знизу
  const descending = [...tiers].sort((a, b) => b.id - a.id);

  return (
    <section
      aria-label="Шкала тірів"
      className="relative px-6 py-24 md:py-32"
    >
      <WatercolorBlob
        color="#9B5C7E"
        size={560}
        className="left-[-15%] top-[20%]"
        opacity={0.18}
        duration={20}
      />
      <WatercolorBlob
        color="#F0C39C"
        size={520}
        className="right-[-12%] top-[60%]"
        opacity={0.22}
        duration={17}
        delay={3}
      />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-16 text-center md:mb-20"
        >
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-caps text-ink-soft">
            Шкала
          </h2>
          <p className="font-display text-3xl font-light text-ink md:text-5xl">
            Шість сходинок догори
          </p>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
            Читайте знизу догори — так, як росте сама шкала: від затишного
            першого рівня до сліпучого шостого.
          </p>
        </motion.div>

        {/* вертикальна вісь */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 left-1/2 top-56 hidden w-px -translate-x-1/2 bg-gradient-to-b from-gold/50 via-line to-line lg:block"
        />

        <motion.ol
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative flex flex-col gap-8 md:gap-10"
          reversed
        >
          {descending.map((tier, index) => (
            <li
              key={tier.id}
              value={tier.id}
              className={
                index % 2 === 0 ? "lg:-translate-x-6" : "lg:translate-x-6"
              }
            >
              <TierCard tier={tier} highlighted={tier.id === TOP_TIER_ID} />
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
