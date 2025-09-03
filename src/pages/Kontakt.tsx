import { Navigation } from "@/components/Navigation";
import { Kontact } from "@/components/Kontact";
import { Footer } from "@/components/Footer";

const Kontakt = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Kontact />
      <Footer />
    </div>
  );
};

export default Kontakt;