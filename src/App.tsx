import Hero from "./components/Hero";
import Intro from "./components/Intro";
import SpectrumBar from "./components/SpectrumBar";
import TierScale from "./components/TierScale";
import ComparisonGrid from "./components/ComparisonGrid";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative overflow-x-clip">
      <Hero />
      <main>
        <Intro />
        <SpectrumBar />
        <TierScale />
        <ComparisonGrid />
      </main>
      <Footer />
    </div>
  );
}
