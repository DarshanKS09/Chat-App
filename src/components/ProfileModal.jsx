import React, { useEffect, useState } from "react";
import { saveProfile, getProfile } from "../utils/profile";
import { useWallet } from "./context/WalletContext";

const ProfileModal = ({ onClose }) => {
  const { account } = useWallet();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (account) {
      const profile = getProfile(account);
      if (profile) {
        setName(profile.name || "");
        setBio(profile.bio || "");
        setAvatar(profile.avatar || "");
      }
    }
  }, [account]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveProfile(account, { name, bio, avatar });
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Edit Profile</h3>

        {avatar && (
          <img
            src={avatar}
            alt="preview"
            style={styles.preview}
          />
        )}

        <input type="file" accept="image/*" onChange={handleImage} />

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={handleSave} style={styles.save}>
          Save Profile
        </button>

        {success && (
          <p style={styles.success}>
            Profile updated successfully
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    width: 340,
    background: "#f9f9f9",
    padding: 20,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    color: "#000",
  },
  preview: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    objectFit: "cover",
    alignSelf: "center",
  },
  input: {
    padding: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  textarea: {
    padding: 10,
    height: 70,
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  save: {
    padding: 12,
    background: "#4caf50",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  success: {
    marginTop: 8,
    color: "#2e7d32",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default ProfileModal;
