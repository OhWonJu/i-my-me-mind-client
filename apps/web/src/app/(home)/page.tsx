import HeroSection from "./_sections/HeroSection";
import AboutSection from "./_sections/AboutSection";
import GuideSection from "./_sections/GuideSection";
import DonationSection from "./_sections/DonationSection";

const Home = () => {
  return (
    <div className="relative">
      <HeroSection />
      {/* <AboutSection /> */}
      <GuideSection />
      <DonationSection />
    </div>
  );
};

export default Home;
