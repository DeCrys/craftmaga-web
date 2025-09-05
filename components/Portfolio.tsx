"use client"
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import portfolioImage from "@/assets/portfolio-1.jpg";
import patternBg from "@/assets/pattern-bg.jpg";

const Portfolio = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      category: "Web Development",
      description: "Moderní e-shop s AI doporučeními a pokročilou analytikó",
      image: portfolioImage,
      tech: ["React", "TypeScript", "Node.js"],
      featured: true
    },
    {
      title: "Mobile Banking App",
      category: "Mobile App",
      description: "Bezpečná bankovní aplikace s biometrickou autentizací",
      image: patternBg,
      tech: ["React Native", "Firebase", "Stripe"]
    },
    {
      title: "Brand Identity",
      category: "Design",
      description: "Kompletní rebrand pro tech startup včetně loga a guidelines",
      image: portfolioImage,
      tech: ["Figma", "Illustrator", "After Effects"]
    },
    {
      title: "SaaS Dashboard",
      category: "Web App",
      description: "Analytický dashboard s real-time daty a interaktivními grafy",
      image: patternBg,
      tech: ["Vue.js", "D3.js", "Python"]
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Podívejte se na naše nejnovější projekty a úspěšné realizace
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className={`glass-card hover-lift group cursor-pointer border-border/20 overflow-hidden ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={typeof project.image === 'string' ? project.image : project.image.src} 
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-sm font-medium rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="outline" className="glass-card border-white/20">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="glass-card border-white/20">
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-muted/50 text-muted-foreground text-xs font-medium rounded-full border border-border/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-2xl hover-lift glow-effect"
          >
            Zobrazit Všechny Projekty
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;