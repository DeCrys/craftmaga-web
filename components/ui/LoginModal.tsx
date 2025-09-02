"use client";
import React, { useState, FormEvent } from "react";
import { createPortal } from "react-dom";

// Helper pro správné spojení tříd, pokud není k dispozici @/lib/utils
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

// Simulace komponent, které způsobovaly chybu s importem
const NavbarButton = ({ children, onClick, className, variant = "primary" }: { children: React.ReactNode; onClick?: () => void; className?: string; variant?: "primary" | "secondary" | "dark" | "gradient"; }) => {
  const baseStyles = "px-4 py-2 rounded-md bg-white button text-lg font-bold gradient-text text-black relative cursor-pointer hover:-translate-y-0.5 transition inline-block text-center";
  const variantStyles = {
    primary: "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };
  return <button onClick={onClick} className={cn(baseStyles, variantStyles[variant], className)}>{children}</button>;
};

// Vytvoření samostatné komponenty pro přihlášení
export const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [nick, setNick] = useState<string | null>(null);
  const [inputNick, setInputNick] = useState("");
  const [online, setOnline] = useState<boolean | null>(null);
  const [skinUrl, setSkinUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  // Simulace useToast
  const useToast = () => ({ toast: (options: any) => console.log('Toast:', options) });
  const { toast } = useToast();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!inputNick) {
      toast({ title: "Zadejte nick", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nick: inputNick }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setNick(inputNick);
        setOnline(data.online); 
        setSkinUrl(data.skinUrl);
        setShowModal(false);
        toast({ title: `Přihlášen: ${inputNick}`, variant: "default" });
      } else {
        setError(data.error || "Nepodařilo se přihlásit");
        toast({ title: data.error || "Nepodařilo se přihlásit", variant: "destructive" });
      }
    } catch (err) {
      setError("Chyba při připojení k serveru");
      toast({ title: "Chyba při připojení k serveru", variant: "destructive" });
    }
  };

  return (
    <div className="relative z-20 flex items-center space-x-2 px-2 py-1">
      {nick ? (
        <div className="flex items-center gap-2">
          {skinUrl && (
            <img
              src={skinUrl}
              alt={nick}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-white font-bold">{nick}</span>
          {online !== null && (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${online ? 'bg-green-500' : 'bg-red-500'}`}>
              {online ? 'Online' : 'Offline'}
            </span>
          )}
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
              <h2 className="text-white text-xl font-bold mb-4">Zadejte svůj nick</h2>
              <form onSubmit={handleLogin} className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Nick"
                  value={inputNick}
                  onChange={(e) => setInputNick(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-600 bg-neutral-800 text-white outline-none mb-4"
                />
                <div className="flex justify-end gap-2 mt-4">
                  <NavbarButton onClick={() => setShowModal(false)} variant="secondary">
                    Zrušit
                  </NavbarButton>
                  <button type="submit" className="px-4 py-2 rounded-md bg-white button text-lg font-bold gradient-text text-black relative cursor-pointer hover:-translate-y-0.5 transition inline-block text-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
                    Přihlásit se
                  </button>
                </div>
              </form>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
