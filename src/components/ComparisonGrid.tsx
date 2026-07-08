import { motion } from "framer-motion";
import { tiers } from "../data/tiers";

export default function ComparisonGrid() {
  return (
    <section aria-label="Порівняння тірів" className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="mb-3 text-center text-xs font-semibold uppercase tracking-caps text-ink-soft">
          Коротко
        </h2>
        <p className="mb-12 text-center font-display text-3xl font-light text-ink md:text-4xl">
          Уся шкала одним поглядом
        </p>

        <div className="overflow-hidden rounded-card border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Порівняння шести тірів шкали краси
            </caption>
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-caps text-ink-soft">
                <th scope="col" className="px-5 py-4 font-semibold md:px-8">
                  Назва
                </th>
                <th scope="col" className="px-3 py-4 font-semibold">
                  Рівень
                </th>
                <th scope="col" className="hidden px-3 py-4 font-semibold sm:table-cell">
                  Ключове слово
                </th>
                <th scope="col" className="px-5 py-4 text-right font-semibold md:px-8">
                  Колір
                </th>
              </tr>
            </thead>
            <tbody>
              {[...tiers].reverse().map((tier, index) => (
                <tr
                  key={tier.id}
                  className={`transition-colors hover:bg-bg ${
                    index < tiers.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-display text-xl font-normal text-ink md:px-8"
                  >
                    {tier.name}
                  </th>
                  <td className="px-3 py-4 text-ink-soft">{tier.id} / 6</td>
                  <td className="hidden px-3 py-4 text-ink-soft sm:table-cell">
                    {tier.keywords[0]}
                  </td>
                  <td className="px-5 py-4 md:px-8">
                    <span
                      className="ml-auto block h-6 w-10 rounded-md ring-1 ring-black/5"
                      style={{ backgroundColor: tier.color }}
                      role="img"
                      aria-label={`Колір тіра «${tier.name}»: ${tier.color}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
