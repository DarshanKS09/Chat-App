import React, { useState } from "react";
import { connectingWithContract } from "../Utils/api";

const AddFriendModal = ({ onClose }) => {
  const [friendAddress, setFriendAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleAddFriend = async () => {
  try {
    const contract = await connectingWithContract();

    const signer = await contract.runner.getAddress();

    console.log("SIGNER (msg.sender):", signer);
    console.log("FRIEND ADDRESS:", friendAddress);

    const meRegistered = await contract.checkUser(signer);
    const friendRegistered = await contract.checkUser(friendAddress);

    console.log("Me registered:", meRegistered);
    console.log("Friend registered:", friendRegistered);

    const friends = await contract.displayFrnds();
    console.log("Already friends list:", friends);

    const tx = await contract.addfriend(friendAddress, "Friend");
    await tx.wait();

    alert("Friend added");
  } catch (e) {
    console.error("TX FAILED:", e);
    alert("Transaction reverted. Check console.");
  }
};


  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h3>Add Friend</h3>

        <input
          style={styles.input}
          placeholder="Friend wallet address"
          value={friendAddress}
          onChange={(e) => setFriendAddress(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={styles.btn}
          onClick={handleAddFriend}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Friend"}
        </button>

        <button style={styles.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  box: {
    width: 320,
    background: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
  btn: {
    width: "100%",
    marginTop: 15,
    padding: 10,
    background: "#4caf50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancel: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    background: "#ccc",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: 8,
  },
};

export default AddFriendModal;
