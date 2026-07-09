import { createContext, useContext, useState } from "react";

const CoinsContext = createContext(null);

export function CoinsProvider({ children }) {
  const [coins, setCoins] = useState(0);

  const addCoins = (amount) => setCoins((c) => c + amount);

  return (
    <CoinsContext.Provider value={{ coins, addCoins }}>
      {children}
    </CoinsContext.Provider>
  );
}

export function useCoins() {
  const ctx = useContext(CoinsContext);
  if (!ctx) throw new Error("useCoins must be used inside CoinsProvider");
  return ctx;
}