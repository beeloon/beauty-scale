import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section id="intro" className="relative px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <span
          aria-hidden="true"
          className="mx-auto mb-10 block h-px w-16 bg-gold/60"
        />
        <p className="font-display text-2xl font-light leading-snug text-ink md:text-[1.75rem]">
          Це не рейтинг людей — це мапа мови. Українська має дивовижно тонку
          палітру слів для краси, і кожне з них означає{" "}
          <em className="italic">трохи інше</em>: інший настрій, іншу
          температуру, інший ступінь сяйва. Ця сторінка — спроба розкласти ці
          відтінки поруч, як фарби на палітрі.
        </p>
      </motion.div>
    </section>
  );
}
