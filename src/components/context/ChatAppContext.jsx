import React, { createContext, useEffect, useState } from "react";
import {
  connectingWithContract,
  ConnectWallet,
  checkIfWalletConnected,
} from "../../Utils/api";

// ✅ Create context
export const ChatAppContext = createContext();

// ✅ Provider
export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  // Fetch Data
  const fetchData = async (address) => {
    try {
      if (!address) return;

      const contract = await connectingWithContract();
      if (!contract) return;

      const name = await contract.getname(address);
      setUserName(name);

      const friends = await contract.displayFrnds();
      setFriendList(friends);

      const users = await contract.displayUsers();
      setUserLists(users);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    }
  };

  // Auto-connect wallet
  useEffect(() => {
    const autoConnect = async () => {
      const connected = await checkIfWalletConnected();
      if (connected?.userAddress) {
        setAccount(connected.userAddress);
        await fetchData(connected.userAddress);
      }
    };
    autoConnect();
  }, []);

  const connectWallet = async () => {
    const connected = await ConnectWallet();
    if (connected?.userAddress) {
      setAccount(connected.userAddress);
      await fetchData(connected.userAddress);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setUserName("");
    setFriendList([]);
    setFriendMsg([]);
    setUserLists([]);
    setCurrentUserAddress("");
    setCurrentUserName("");
    setError("");
  };

  // Read messages
  const readMessage = async ({ friendCode }) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.displayMsg(friendCode);
      setFriendMsg(read);
    } catch {
      setError("No messages to display");
    }
  };

  // Create account
  const createAccount = async ({ name }) => {
    try {
      if (!name) return setError("Please enter your name");

      const contract = await connectingWithContract();
      const tx = await contract.register(name);
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch {
      setError("Unable to create account");
    }
  };

  // Add friend
  const addFriend = async ({ friendAddress, Fname }) => {
    try {
      if (!friendAddress || !Fname) return;

      const contract = await connectingWithContract();
      const tx = await contract.addfriend(friendAddress, Fname);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.location.reload();
    } catch {
      setError("Unable to add friend");
    }
  };

  // Send message
  const sendMessage = async ({ FrdAddress, msg }) => {
    try {
      if (!FrdAddress || !msg) return;

      const contract = await connectingWithContract();
      const tx = await contract.sendMessage(FrdAddress, msg);
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.location.reload();
    } catch {
      setError("Unable to send message");
    }
  };

  // Read user info
  const readUser = async ({ userAdd }) => {
    try {
      if (!userAdd) return;

      const contract = await connectingWithContract();
      const name = await contract.getname(userAdd);
      setCurrentUserName(name);
      setCurrentUserAddress(userAdd);
    } catch {
      setError("User not found");
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        fetchData,
        connectWallet,
        disconnectWallet,
        createAccount,
        addFriend,
        sendMessage,
        readUser,
        readMessage,
        account,
        userName,
        friendList,
        friendMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
