import React, { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 🔐 LOGIN → MetaMask POPUP EVERY TIME (signature)
  const loginWithMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not installed");
        return;
      }

      setIsLoading(true);

      // Get account (silent if already connected)
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const address = accounts[0];

      // FORCE POPUP via signature
      const message = `Login to Chat App\nTime: ${new Date().toISOString()}`;

      await window.ethereum.request({
        method: "personal_sign",
        params: [message, address],
      });

      setAccount(address);
      setIsLoggedIn(true);

      console.log("✅ Logged in:", address);
    } catch (err) {
      console.error("❌ Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🚪 LOGOUT (app-level, real)
  const logout = () => {
    setAccount("");
    setIsLoggedIn(false);
    console.log("🚪 Logged out");
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        isLoggedIn,
        isLoading,
        loginWithMetaMask,
        logout,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
