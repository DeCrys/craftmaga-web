'use client'

import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { useState, useEffect } from "react";
import { Server, Users, ExternalLink } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import Image from "next/image";
import logoImage from "/public/assets/logo.png";

const HeroSection = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [serverStats, setServerStats] = useState({
    onlinePlayers: 0 as number | string,
    maxPlayers: 0,
    uptime: "0%"
  });

  const serverIP = "play.craftmaga.cz";

  useEffect(() => {
    const fetchServerStats = async () => {
      try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${serverIP}`);
        const data = await response.json();

        if (data.online) {
          setServerStats({
            onlinePlayers: data.players?.online || 0,
            maxPlayers: data.players?.max || 0,
            uptime: "99.8%"
          });
        } else {
          setServerStats({
            onlinePlayers: "Offline",
            maxPlayers: 0,
            uptime: "0%"
          });
        }
      } catch (error) {
        console.error("Error fetching server stats:", error);
        setServerStats({
          onlinePlayers: "Offline",
          maxPlayers: 0,
          uptime: "0%"
        });
      }
    };

    fetchServerStats();
    const interval = setInterval(fetchServerStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const copyServerIP = async () => {
    try {
      await navigator.clipboard.writeText(serverIP);
      setCopied(true);
      toast({
        title: "✅ IP adresa zkopírována!",
        description: `${serverIP}`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "❌ Chyba při kopírování",
        description: "Zkuste to prosím znovu",
        variant: "destructive",
      });
    }
  };

  const openDiscord = () => {
    window.open("https://discord.gg/eTuYxy7Ry9", "_blank");
  };

  return (
    <BackgroundBeamsWithCollision>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-lg floating blur-sm"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-secondary/20 rounded-lg floating-delayed blur-sm"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-accent/20 rounded-lg floating blur-sm"></div>
          <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-primary/20 rounded-lg floating-delayed blur-sm"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Hero Title */}
          <div className="mb-2 sm:mb-8 animate-fade-in-scale">
            <div className="mb-2 sm:mb-6">
              <Image
                src={logoImage}
                alt="Server Logo"
                className="max-h-24 sm:max-h-32 md:max-h-40 lg:max-h-48 mx-auto drop-shadow-2xl"
                width={200}
                height={200}
                priority
              />
            </div>

            <p className="text-base sm:text-xl md:text-2xl font-medium text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Připoj se k naší úžasné komunitě a objevuj nekonečné možnosti v našich unikátních herních módech!
            </p>
          </div>

          {/* Server Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-in-up">
            <div className="card-glass text-center min-w-[120px]">
              <div className="text-2xl font-bold gradient-text">
                {typeof serverStats.onlinePlayers === "number" ? serverStats.onlinePlayers : serverStats.onlinePlayers}
              </div>
              <div className="text-sm text-foreground/60">Hráčů online</div>
            </div>
            <div className="card-glass text-center min-w-[120px]">
              <div className="text-2xl font-bold gradient-text">{serverStats.maxPlayers}</div>
              <div className="text-sm text-foreground/60">Max hráčů</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in-up">
            <button
              onClick={copyServerIP}
              className="btn-hero group relative min-w-[200px] text-center flex items-center justify-center gap-2"
            >
              <Server className="w-5 h-5" />
              <span>{copied ? "✅ Zkopírováno!" : "Připojit se"}</span>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-foreground/60">
                {serverIP}
              </div>
            </button>

            <button
              onClick={openDiscord}
              className="btn-hero bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 min-w-[200px] text-center flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              <span>Discord</span>
              <ExternalLink className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-foreground/60" />
            </button>
          </div>

          {/* Version Info */}
          <div className="mt-16 glass inline-block px-6 py-3 rounded-full animate-fade-in-scale">
            <span className="text-sm text-foreground/60">
              Podporuje verze <span className="text-primary font-semibold">1.19-1.21</span>
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:inline-flex">
          <div className="w-6 h-10 border-2 border-glass-border rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
};

export default HeroSection;
