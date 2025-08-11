import { Palette, Code, Smartphone, Globe, Zap, Eye } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "Brand Design",
      description: "Vytváříme jedinečné vizuální identity, které vaši značku odliší od konkurence.",
      gradient: "from-primary to-secondary"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Moderní webové aplikace s nejnovějšími technologiemi a responsivním designem.",
      gradient: "from-secondary to-accent"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Intuitivní mobilní aplikace pro iOS a Android s focus na uživatelský zážitek.",
      gradient: "from-accent to-primary"
    },
    {
      icon: Globe,
      title: "Digital Marketing",
      description: "Komplexní digitální strategie pro růst vaší online přítomnosti.",
      gradient: "from-primary to-accent"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimalizace výkonu pro rychlé načítání a lepší konverze.",
      gradient: "from-secondary to-primary"
    },
    {
      icon: Eye,
      title: "UX/UI Design",
      description: "Uživatelsky přívětivé rozhraní s důrazem na intuitivní navigaci.",
      gradient: "from-accent to-secondary"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Naše Služby
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specializujeme se na kompletní digitální řešení od návrhu po implementaci
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="glass-card hover-lift hover-glow group cursor-pointer border-border/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative Element */}
                <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} transition-all duration-500 rounded-full`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;