import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import HowItWorkSection from "./HowItWorkSection";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorkSection />
    </main>
  );
};

export default HomePage;
