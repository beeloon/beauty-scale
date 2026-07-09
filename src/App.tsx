import { useEffect, useRef, useState } from "react";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import LiveScale from "./components/LiveScale";
import TierScale from "./components/TierScale";
import ComparisonGrid from "./components/ComparisonGrid";
import Footer from "./components/Footer";
import { tiers } from "./data/tiers";
import { lerpHex, mixWithBg } from "./utils/color";

const BASE_BG = "#FBF7F2";

/**
 * Підфарбовує фон сторінки кольорами тірів під час скролу шкали:
 * прогрес секції відносно середини в'юпорта → колір тіра (6 зверху → 1 знизу),
 * з «конвертом», що гасить відтінок біля країв секції.
 */
function usePageTint(sectionRef: React.RefObject<HTMLElement>): string {
  const [pageBg, setPageBg] = useState(BASE_BG);

  useEffect(() => {
    // кольори згори донизу: тір 6 → тір 1
    const colors = [...tiers].sort((a, b) => b.id - a.id).map((t) => t.color);

    // scroll-події вже вирівняні по кадрах — рахуємо одразу, без rAF-гейта
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh / 2 - rect.top) / rect.height));
      const ramp = Math.min(1, Math.max(0, Math.min(p, 1 - p) * 4));
      const pos = p * (colors.length - 1);
      const lo = Math.floor(pos);
      const hi = Math.min(colors.length - 1, lo + 1);
      const tint = lerpHex(colors[lo], colors[hi], pos - lo);
      setPageBg(mixWithBg(tint, 0.12 * ramp));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef]);

  return pageBg;
}

export default function App() {
  const scaleRef = useRef<HTMLElement>(null);
  const pageBg = usePageTint(scaleRef);

  return (
    <div className="relative overflow-x-clip">
      {/* Фіксована підкладка на в'юпорт: тонування без швів, які дає
          перемальовування плитками величезного скрол-контейнера */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: pageBg,
          transition: "background-color 0.6s ease",
        }}
      />
      <Hero />
      <main>
        <Intro />
        <LiveScale />
        <TierScale ref={scaleRef} />
        <ComparisonGrid />
      </main>
      <Footer />
    </div>
  );
}
