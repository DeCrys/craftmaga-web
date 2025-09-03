import { Navigation } from "@/components/Navigation";
import { Napoveda } from "@/components/Napoveda";
import { Footer } from "@/components/Footer";

const NapovedaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Napoveda />
      <Footer />
    </div>
  );
};

export default NapovedaPage;