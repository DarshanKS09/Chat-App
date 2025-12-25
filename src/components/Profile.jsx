import React, { useEffect, useState } from "react";
import { useWallet } from "./context/WalletContext";
import { saveProfile, getProfile } from "../utils/profile";

const Profile = () => {
  const { account, isLoggedIn } = useWallet();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (account) {
      const profile = getProfile(account);
      if (profile) {
        setName(profile.name);
        setBio(profile.bio);
      }
    }
  }, [account]);

  const handleSave = () => {
    saveProfile(account, { name, bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  if (!isLoggedIn) {
    return <p style={{ padding: 20 }}>Login to edit profile.</p>;
  }

  return (
    <div style={styles.card}>
      <h3>My Profile</h3>

      <input
        style={styles.input}
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        style={styles.textarea}
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <button style={styles.button} onClick={handleSave}>
        Save Profile
      </button>

      {saved && <p style={styles.saved}>Profile saved ✓</p>}
    </div>
  );
};

const styles = {
  card: {
    maxWidth: 400,
    margin: "20px auto",
    padding: 20,
    borderRadius: 8,
    background: "#222",
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "none",
  },
  textarea: {
    width: "100%",
    padding: 10,
    height: 80,
    borderRadius: 5,
    border: "none",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#f6851b",
    border: "none",
    borderRadius: 5,
    fontWeight: "bold",
    cursor: "pointer",
  },
  saved: {
    marginTop: 10,
    color: "#4caf50",
  },
};

export default Profile;
