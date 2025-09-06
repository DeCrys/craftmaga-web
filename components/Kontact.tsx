import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import Navigation from "./Navigation"; // tvoje navigace
import { Heart, ExternalLink } from "lucide-react";
import Link from "next/link";
import logoImage from "../public/assets/logo.png";

const Contact = () => {
  const contactInfo = [
    { icon: Mail, title: "Email", content: "hello@studio.cz", link: "mailto:hello@studio.cz" },
    { icon: Phone, title: "Telefon", content: "+420 123 456 789", link: "tel:+420123456789" },
    { icon: MapPin, title: "Adresa", content: "Praha, Česká republika", link: "https://maps.google.com" }
  ];

  const currentYear = new Date().getFullYear();
  const links = [
    { label: "Pravidla serveru", href: "/pravidla" },
    { label: "Nápověda", href: "/napoveda" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Discord", href: "https://discord.gg/eTuYxy7Ry9", external: true }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        <section id="kontakt" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float animation-delay-2000" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                  Kontakt
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Máte nápad? Spojme se a vytvořme něco úžasného společně
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="glass-card border-border/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Napište nám</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Jméno</label>
                        <Input placeholder="Vaše jméno" className="glass-card border-border/20 focus:border-primary/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input type="email" placeholder="vas@email.cz" className="glass-card border-border/20 focus:border-primary/50" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Předmět</label>
                      <Input placeholder="O čem chcete mluvit?" className="glass-card border-border/20 focus:border-primary/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Zpráva</label>
                      <Textarea placeholder="Popište váš projekt nebo nápad..." rows={6} className="glass-card border-border/20 focus:border-primary/50 resize-none" />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground py-6 text-lg font-semibold rounded-2xl hover-lift group">
                      Odeslat Zprávu
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center p-20">Spojte se s námi</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed gradient-text text-center">
                    !!Momentalně pracujeme na zprovoznění kontaktního formuláře.
                    Posilaní zpráv je momentálně nedostupné!!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 relative overflow-hidden border-t border-glass-border">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <img
                src={logoImage.src}
                alt="logo"
                width={50}
                height={50}
              />
              <span className="text-2xl font-bold gradient-text">CraftMaga</span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Nejlepší český Minecraft server s unikátními herními módy a skvělou komunitou.
              Připoj se k nám a začni své dobrodružství!
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-bold mb-4 text-primary">Rychlé odkazy</h3>
            <div className="space-y-2">
              {links.map((link) => (
                <div key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition-colors text-sm inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-foreground/70 hover:text-primary transition-colors text-sm inline-flex items-center gap-1"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Server Info */}
          <div className="text-center md:text-right">
            <h3 className="font-bold mb-4 text-primary">Server info</h3>
            <div className="space-y-2 text-sm">
              <div className="glass inline-block px-3 py-1 rounded-full">
                <span className="text-foreground/70">IP: </span>
                <span className="font-semibold">play.craftmaga.cz</span>
              </div>
              <div>
                <span className="text-foreground/70">Verze: </span>
                <span className="font-semibold text-primary">1.19-1.21</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-glass-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
            <div className="flex items-center gap-1">
              <span>© {currentYear} CraftMaga</span>
            </div>

            <div className="flex items-center gap-1">
              <span>Web s láskou</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>vytvořil DeCrys</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Contact;
