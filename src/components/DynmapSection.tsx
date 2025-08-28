import { Map, Eye, Navigation, Maximize2, Users, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const DynmapSection = () => {
  const [currentWorld, setCurrentWorld] = useState("spawn");
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  // Nový stav pro uchování centra mapy (souřadnice)
  const [mapCenter, setMapCenter] = useState({ x: 0, y: 64, z: 0 });

  const dynmapBaseUrl = "https://map.craftmaga.cz"; // URL Dynmap serveru

  useEffect(() => {
    // Funkce pro načtení online hráčů
    const fetchOnlinePlayers = async () => {
      try {
        const corsProxy = 'https://api.allorigins.win/raw?url=';   
        const dynmapUrl = `http://135.181.49.221:25326/up/world/${currentWorld}/`; // URL Dynmap API pro aktuální svět, url v čiselné podobě
        console.log("Volám Dynmap API:", dynmapUrl);
        
        try {
          const dynmapResponse = await fetch(`${corsProxy}${encodeURIComponent(dynmapUrl)}`);
          const dynmapData = await dynmapResponse.json();
          console.log("Dynmap API vrací:", dynmapData);
          
          if (dynmapData.players && Array.isArray(dynmapData.players)) {
            const playersData = dynmapData.players.map((player: any) => ({
              player: player.name || player.account,
              location: player.world ? player.world : currentWorld,
              // Uložíme také oddělené souřadnice
              coords: `${Math.round(player.x || 0)}, ${Math.round(player.y || 64)}, ${Math.round(player.z || 0)}`,
              x: Math.round(player.x || 0),
              y: Math.round(player.y || 64),
              z: Math.round(player.z || 0)
            }));
            setOnlinePlayers(playersData);
            return;
          }
          console.warn("API Dynmap neobsahuje pole players.");
        } catch (dynmapError) {
          console.error("Chyba při načítání z Dynmap API:", dynmapError);
          console.log('Přecházím na fallback API.');
        }
  
        // Fallback na fi-hel2.altare.cv:25326 API
        const server = 'fi-hel2.altare.cv:25326';  
        if (!server) {
          console.error('Server není definován');
          return;
        }
        const response = await fetch(`https://api.mcsrvstat.us/3/${server}`);   
        const data = await response.json();
        console.log("Fallback API vrací:", data);
  
        const playerList = (data?.players?.list ?? []) as Array<{ name: string }>; 
        const playersData = playerList.map((p) => ({
          player: p.name,
          location: currentWorld,
          coords: 'Pozice nedostupná',
          x: 0,
          y: 64,
          z: 0
        }));
        setOnlinePlayers(playersData);
      } catch (error) {
        console.error('Error fetching online players:', error);
        setOnlinePlayers([]);
      }
    };

    fetchOnlinePlayers();
    
    // Aktualizace každých 15 sekund (5000 ms)
    const interval = setInterval(() => {
      fetchOnlinePlayers();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentWorld]);

  // Funkce pro přesměrování mapy na vybraného hráče
  const handlePlayerClick = (player: any) => {
    console.log("Kliknuto na hráče:", player);
    // Centrum mapy na souřadnice hráče
    setMapCenter({ x: player.x, y: player.y, z: player.z });
    // Pokud se svět hráče liší, přepneme i svět
    if (player.location && player.location !== currentWorld) {
      setCurrentWorld(player.location);
    }
  };

  const openFullscreenMap = () => {
    window.open(dynmapBaseUrl, "_blank");
  };

  const handleWorldChange = (world: string) => {
    console.log("Měním svět na:", world);
    setCurrentWorld(world);
    // Resetujeme centrum mapy na výchozí hodnotu
    setMapCenter({ x: 0, y: 64, z: 0 });
  };

  return (
    <section id="dynmap" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full">
            <Map className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Dynmap</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Živá Mapa Světa</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Prozkoumej celý serverový svět v reálném čase. Sleduj hráče, najdi lokace a plánuj své dobrodružství!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Map Preview */}
          <div className="lg:col-span-2">
            <div className="card-glass relative overflow-hidden group">
              <div className="relative h-96 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg overflow-hidden">
                <iframe 
                  src={`${dynmapBaseUrl}/?worldname=${currentWorld}&mapname=flat&zoom=4&x=${mapCenter.x}&y=${mapCenter.y}&z=${mapCenter.z}`}
                  className="w-full h-full border-0 rounded-lg"
                  title="Dynmap"
                />
                <button
                  onClick={openFullscreenMap}
                  className="absolute top-4 right-4 glass p-2 rounded-lg hover:bg-glass-hover transition-colors group/btn z-10"
                >
                  <Maximize2 className="w-4 h-4 group-hover/btn:text-primary transition-colors" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleWorldChange("spawn")}
                    className={`glass px-3 py-1 rounded-md text-sm hover:bg-glass-hover transition-colors ${currentWorld === "spawn" ? "bg-primary/20 text-white" : ""}`}
                  >
                    Spawn
                  </button>
                  <button 
                    onClick={() => handleWorldChange("playworld")}
                    className={`glass px-3 py-1 rounded-md text-sm hover:bg-glass-hover transition-colors ${currentWorld === "playworld" ? "bg-primary/20 text-white" : ""}`}
                  >
                    Playworld
                  </button>
                </div>
                <button
                  onClick={openFullscreenMap}
                  className="btn-hero py-2 px-4 text-sm justify-center items-center h-9 hidden sm:inline-flex"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Otevřít plnou mapu
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar – jen karta "Online hráči" */}
          <div className="lg:self-center">
            <div className="card-glass max-h-96">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Online hráči</h3>
                <div className="ml-auto glass px-2 py-1 rounded text-xs">
                  {onlinePlayers.length}
                </div>
              </div>
              {/* Seznam hráčů s posuvným kontejnerem */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 3rem)' }}>
                {onlinePlayers.map((player, index) => (
                  <div
                    key={player.player}
                    onClick={() => handlePlayerClick(player)}
                    className="flex items-center gap-3 p-2 glass rounded-lg hover:bg-glass-hover transition-colors cursor-pointer group"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fade-in-scale 0.4s ease-out both'
                    }}
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                        {player.player}
                      </div>
                      <div className="text-xs text-foreground/60 truncate">
                        {player.location} – {player.coords}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Konec Sidebar */}
        </div>
      </div>
    </section>
  );
};

export default DynmapSection;