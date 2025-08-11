import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@studio.cz",
      link: "mailto:hello@studio.cz"
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+420 123 456 789",
      link: "tel:+420123456789"
    },
    {
      icon: MapPin,
      title: "Adresa",
      content: "Praha, Česká republika",
      link: "https://maps.google.com"
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Effects */}
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
                    <Input 
                      placeholder="Vaše jméno"
                      className="glass-card border-border/20 focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      type="email"
                      placeholder="vas@email.cz"
                      className="glass-card border-border/20 focus:border-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Předmět</label>
                  <Input 
                    placeholder="O čem chcete mluvit?"
                    className="glass-card border-border/20 focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Zpráva</label>
                  <Textarea 
                    placeholder="Popište váš projekt nebo nápad..."
                    rows={6}
                    className="glass-card border-border/20 focus:border-primary/50 resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground py-6 text-lg font-semibold rounded-2xl hover-lift group"
                >
                  Odeslat Zprávu
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Spojte se s námi</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Jsme tu pro vás 24/7. Ať už máte otázku, nápad na projekt, 
                nebo jen chcete pohovořit o možnostech spolupráce.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index}
                  className="glass-card hover-lift group cursor-pointer border-border/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {info.title}
                        </h4>
                        <a 
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Office Hours */}
            <Card className="glass-card border-border/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-4">Pracovní doba</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Pondělí - Pátek</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sobota</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Neděle</span>
                    <span>Zavřeno</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;