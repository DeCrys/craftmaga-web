'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/ui/resizable-navbar";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const navItems = [
    { name: "Domů", id: "domu" },
    { name: "Herní módy", id: "mody" },
    { name: "Tým", id: "tym" },
    { name: "Hlasování", id: "hlasovani" },
    { name: "Obchod", id: "shop" },
    { name: "Dynmap", id: "dynmap" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const serverIP = "play.craftmaga.cz";
  const [copied, setCopied] = useState(false);

  const copyServerIP = async () => {
    try {
      await navigator.clipboard.writeText(serverIP);
      setCopied(true);
      toast({ title: "✅ IP adresa zkopírována!", description: `${serverIP}` });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "❌ Chyba při kopírování", description: "Zkuste to prosím znovu", variant: "destructive" });
    }
  };

  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (id: string) => {
    if (pathname !== "/") {
      router.push(`/?scrollTo=${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <Navbar className="fixed top-0 left-0 w-full z-50">
      <NavBody>
        <NavbarLogo />
        <div className="hidden lg:flex gap-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-white hover:gradient-text transition px-4 py-2"
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <NavbarButton variant="primary" onClick={copyServerIP}>
            {copied ? "✅ Zkopírováno!" : "Připojit se"}
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile nav */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          <div className="flex flex-col gap-3 w-full bg-gradient-to-b from-neutral-900 to-neutral-800 rounded-2xl p-6 shadow-xl">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-center px-4 py-3 text-white font-medium rounded-lg hover:bg-neutral-700 hover:text-violet-400 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <NavbarButton onClick={() => { copyServerIP(); setIsMobileMenuOpen(false); }} variant="primary" className="w-full mt-2">
              {copied ? "✅ Zkopírováno!" : "Připojit se"}
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default Navigation;
