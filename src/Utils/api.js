import { ethers } from "ethers";
import ChatApp from "./ChatApp.json";

// 🔴 REPLACE WITH YOUR DEPLOYED CONTRACT ADDRESS
const CONTRACT_ADDRESS = "0x8bc031B8597dbf6137Ede4BCDC7D573Bf8a5e2E6";



/* ===============================
   CONNECT WALLET
================================ */
export const ConnectWallet = async () => {
  try {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return null;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return { userAddress: accounts[0] };
  } catch (error) {
    console.error("ConnectWallet error:", error);
    return null;
  }
};

/* ===============================
   CHECK WALLET CONNECTION
================================ */
export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return null;

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      return { userAddress: accounts[0] };
    }

    return null;
  } catch (error) {
    console.error("checkIfWalletConnected error:", error);
    return null;
  }
};

/* ===============================
   CONNECT CONTRACT
================================ */
export const connectingWithContract = async () => {
  try {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ChatApp.abi,
      signer
    );

    return contract;
  } catch (error) {
    console.error("connectingWithContract error:", error);
    return null;
  }
};
