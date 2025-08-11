import { Map, MapPin, Users, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const DynMap = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-secondary" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Dynmap
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prozkoumej celý svět Crafmaga online! Sleduj hráče v reálném čase a objevuj nová místa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Map Preview */}
          <div className="lg:col-span-2">
            <Card className="glass-card hover-lift h-full">
              <CardContent className="p-8">
                <div className="aspect-video bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                  {/* Map placeholder with animated elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
                  <div className="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <div className="absolute top-8 right-6 w-2 h-2 bg-accent rounded-full animate-pulse animation-delay-1000" />
                  <div className="absolute bottom-6 left-8 w-2 h-2 bg-secondary rounded-full animate-pulse animation-delay-2000" />
                  <div className="absolute bottom-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse animation-delay-500" />
                  
                  <div className="text-center">
                    <Map className="w-16 h-16 text-primary mb-4 mx-auto" />
                    <h3 className="text-2xl font-bold mb-2">Interaktivní Mapa</h3>
                    <p className="text-muted-foreground">Klikni pro otevření plné mapy</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 text-white font-semibold"
                  onClick={() => window.open('http://play.crafmaga.cz:8123', '_blank')}
                >
                  <Map className="mr-2 w-5 h-5" />
                  Otevřít Dynmap
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Map Features */}
          <div className="space-y-6">
            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary p-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Online Hráči</h3>
                    <p className="text-sm text-muted-foreground">Sleduj aktivitu v reálném čase</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">24 online</div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent p-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Významná Místa</h3>
                    <p className="text-sm text-muted-foreground">Objevuj důležité lokace</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Spawn</span>
                    <span className="text-xs text-primary">0, 64, 0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">PvP Aréna</span>
                    <span className="text-xs text-secondary">-500, 70, 200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Obchod</span>
                    <span className="text-xs text-accent">100, 65, -150</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary p-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Herní Čas</h3>
                    <p className="text-sm text-muted-foreground">Aktuální stav světa</p>
                  </div>
                </div>
                <div className="text-lg font-semibold text-accent">Den 1247</div>
                <div className="text-sm text-muted-foreground">Slunečno, 14:30</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Funkce Dynmap
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Sledování hráčů v reálném čase</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span className="text-sm">Zobrazení všech měst a regionů</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm">Detailní 3D pohled na svět</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Chat integrace pro komunikaci</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DynMap;