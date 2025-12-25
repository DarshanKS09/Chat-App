import React, { useEffect, useState } from "react";
import { connectingWithContract } from "../Utils/api";
import { useWallet } from "./context/WalletContext";

const AllUsers = () => {
  const { account } = useWallet();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      const contract = await connectingWithContract();
      if (!contract) return;

      const allUsers = await contract.displayUsers();

      // remove current user
      const filtered = allUsers.filter(
        (u) => u.add.toLowerCase() !== account?.toLowerCase()
      );

      setUsers(filtered);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  const addFriend = async (address, name) => {
    try {
      setLoading(true);
      const contract = await connectingWithContract();
      if (!contract) return;

      const tx = await contract.addfriend(address, name);
      await tx.wait();

      alert("Friend added successfully");
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add friend");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) loadUsers();
  }, [account]);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Find Your Friends</h1>

      <div style={styles.grid}>
        {users.map((user, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.avatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h3>{user.name}</h3>

            <p style={styles.address}>
              {user.add.slice(0, 6)}...{user.add.slice(-4)}
            </p>

            <button
              style={styles.button}
              disabled={loading}
              onClick={() => addFriend(user.add, user.name)}
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "40px",
    background: "#1c2533",
    minHeight: "100vh",
    color: "#fff",
  },
  title: {
    marginBottom: "30px",
    fontSize: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "#242f42",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
  },
  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#ff9800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    margin: "0 auto 15px",
    fontWeight: "bold",
  },
  address: {
    opacity: 0.7,
    fontSize: "14px",
    marginBottom: "15px",
  },
  button: {
    background: "#ff9800",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AllUsers;
