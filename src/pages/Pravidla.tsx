import { Navigation } from "@/components/Navigation";
import { Pravidla } from "@/components/Pravidla";
import { Footer } from "@/components/Footer";

const PravidlaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Pravidla />
      <Footer />
    </div>
  );
};

export default PravidlaPage;