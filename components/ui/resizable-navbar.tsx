
'use client'
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface NavbarProps { children: React.ReactNode; className?: string; }
interface NavBodyProps { children: React.ReactNode; className?: string; visible?: boolean; }
interface NavItemsProps { items: { name: string; link: string }[]; className?: string; onItemClick?: () => void; }
interface MobileNavProps { children: React.ReactNode; className?: string; visible?: boolean; }
interface MobileNavHeaderProps { children: React.ReactNode; className?: string; }
interface MobileNavMenuProps { children: React.ReactNode; className?: string; isOpen: boolean; onClose: () => void; }

// === Navbar a desktop ===
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 100));
  return (
    <motion.div ref={ref} className={cn("sticky top-0 z-50 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => (
  <motion.div
    animate={{
      backdropFilter: visible ? "blur(10px)" : "none",
      boxShadow: visible
        ? "0 0 24px rgba(34,42,53,0.06),0 1px 1px rgba(0,0,0,0.05),0 0 0 1px rgba(34,42,53,0.04)"
        : "none",
      width: visible ? "60%" : "100%",
      y: visible ? 20 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    style={{ minWidth: "800px" }}
    className={cn(
      "hidden lg:flex relative z-[60] mx-auto w-full max-w-7xl flex-row items-center justify-between rounded-full bg-transparent px-4 py-2 dark:bg-transparent",
      visible && "dark:bg-neutral-950/80",
      className
    )}
  >
    {children}
  </motion.div>
);

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => (
  <div className={cn("hidden lg:flex space-x-4", className)}>
    {items.map((item, idx) => (
      <a
        key={idx}
        href={item.link}
        onClick={onItemClick}
        className="px-4 py-2 text-white hover:gradient-text transition "
      >
        {item.name}
      </a>
    ))}
  </div>
);

// === Mobilní navigace ===
export const MobileNav = ({ children, className }: MobileNavProps) => (
  <div className={cn("lg:hidden w-full relative", className)}>{children}</div>
);
export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div className={cn("flex justify-between items-center px-4 py-2", className)}>{children}</div>
);
export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          "absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl bg-neutral-900 shadow-lg z-50",
          className
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) =>
  isOpen ? (
    <IconX className="text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white" onClick={onClick} />
  );

// === Buttony ===
export const NavbarButton = ({
  children,
  onClick,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button text-lg font-bold gradient-text text-black relative cursor-pointer hover:-translate-y-0.5 transition inline-block text-center";
  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };
  return (
    <button onClick={onClick} className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </button>
  );
};


// === NavbarLogo s modal a loginem ===
export const NavbarLogo = () => {
  const [showModal, setShowModal] = useState(false);
  const [nick, setNick] = useLocalStorage<string | null>("nick", null);
  const [skinUrl, setSkinUrl] = useLocalStorage<string | null>("skinUrl", null);
  const [inputNick, setInputNick] = useState("");
  const { toast } = useToast();

  // 👇 Přidáno pro fix hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = () => {
    if (inputNick.trim() === "") {
      toast({
        title: "Chyba",
        description: "Nick nesmí být prázdný.",
        variant: "destructive",
        className: "w-full flex flex-col text-center",
      });
      return;
    }

    setNick(inputNick);
    const generatedSkinUrl = `https://cravatar.eu/helmavatar/${inputNick}/32.png`;
    setSkinUrl(generatedSkinUrl);
    setShowModal(false);

    toast({
      description: (
        <div className="flex items-center gap-2 justify-center">
          <img src={generatedSkinUrl} alt={inputNick} className="w-6 h-6 rounded-full" />
          <span>Přihlášen jako {inputNick} ✅</span>
        </div>
      ),
      variant: "default",
      className: "w-full flex flex-col text-center",
    });
  };

  const handleLogout = () => {
    setNick(null);
    setSkinUrl(null);
    toast({
      title: "Úspěšně odhlášeno. 👋",
      variant: "default",
      className: "w-full flex flex-col text-center",
    });
  };

  return (
    <div className="relative z-20 flex items-center space-x-2 px-2 py-1">
      {/* 👇 dokud se nenamountuje klient, renderuj prázdný placeholder */}
      {!isMounted ? (
        <div className="w-24 h-8" />
      ) : nick ? (
        <div className="flex items-center gap-2">
          <img
            src={skinUrl || `https://cravatar.eu/helmavatar/${nick}/32.png`}
            alt={nick}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-red-500 font-bold">{nick}</span>
          <NavbarButton onClick={handleLogout} variant="secondary">
            Odhlásit se
          </NavbarButton>
        </div>
      ) : (
        <NavbarButton onClick={() => setShowModal(true)} variant="primary">
          Přihlásit se
        </NavbarButton>
      )}

      {showModal &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
            <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
              <h2 className="gradient-text text-xl font-bold mb-4">
                Zadejte svůj nick jako máte ve hře.
              </h2>
              <input
                type="text"
                placeholder="Nick"
                value={inputNick}
                onChange={(e) => setInputNick(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-neutral-800 text-white outline-none mb-4"
              />
              <div className="flex justify-end gap-2">
                <NavbarButton onClick={() => setShowModal(false)} variant="secondary">
                  Zrušit
                </NavbarButton>
                <NavbarButton onClick={handleLogin} variant="primary">
                  Přihlásit se
                </NavbarButton>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};