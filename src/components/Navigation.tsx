"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const navItems = [
    { name: "Domů", link: "#domu" },
    { name: "Herní módy", link: "#mody" },
    { name: "Tým", link: "#tym" },
    { name: "Hlasování", link: "#hlasovani" },
  //  { name: "Obchod", link: "#obchod" },
    { name: "Dynmap", link: "#dynmap" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const serverIP = "play.craftmaga.cz";
  const [copied, setCopied] = useState(false);

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

  return (
    <Navbar className="fixed top-0 left-0 w-full z-50">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton variant="primary" onClick={copyServerIP}>
            {copied ? "✅ Zkopírováno!" : "Připojit se"}
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-white dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            
            <NavbarButton
              onClick={() => {
                copyServerIP();
                setIsMobileMenuOpen(false);
              }}
              variant="primary"
              className="w-full"
            >
              {copied ? "✅ Zkopírováno!" : "Připojit se"}
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default Navigation;
