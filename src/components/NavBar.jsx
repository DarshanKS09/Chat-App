import React, { useState } from "react";
import { useWallet } from "./context/WalletContext";
import ProfileModal from "./ProfileModal";
import AddFriendModal from "./AddFriendModal";
import { getProfile } from "../utils/profile";

const NavBar = () => {
  const { isLoggedIn, loginWithMetaMask, logout, isLoading, account } =
    useWallet();

  const [showProfile, setShowProfile] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const profile = account ? getProfile(account) : null;
  const hasProfile = profile && profile.name;

  return (
    <>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>Chat DApp</h2>

        {!isLoggedIn ? (
          <button
            onClick={loginWithMetaMask}
            disabled={isLoading}
            style={styles.login}
          >
            {isLoading ? "Signing..." : "Login with MetaMask"}
          </button>
        ) : (
          <div style={styles.right}>
            {/* PROFILE GREETING */}
            {hasProfile ? (
              <div
                style={styles.profileGreeting}
                onClick={() => setShowProfile(true)}
                title="Edit Profile"
              >
                {profile.avatar && (
                  <img
                    src={profile.avatar}
                    alt="profile"
                    style={styles.avatar}
                  />
                )}
                <span style={styles.greetingText}>
                  Hi {profile.name}
                </span>
              </div>
            ) : (
              <button
                style={styles.btn}
                onClick={() => setShowProfile(true)}
              >
                Add Profile
              </button>
            )}

            {/* ADD FRIEND ONLY AFTER PROFILE */}
            {hasProfile && (
              <button
                style={styles.btn}
                onClick={() => setShowAddFriend(true)}
              >
                Add Friend
              </button>
            )}

            <button onClick={logout} style={styles.logout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      {showProfile && (
        <ProfileModal onClose={() => setShowProfile(false)} />
      )}

      {showAddFriend && (
        <AddFriendModal
          onClose={() => setShowAddFriend(false)}
          onAdded={() => {}}
        />
      )}
    </>
  );
};

const styles = {
  nav: {
    height: 70,
    background: "#111",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 25px",
  },
  logo: {
    margin: 0,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  profileGreeting: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#1f1f1f",
    padding: "6px 10px",
    borderRadius: 20,
    cursor: "pointer",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    objectFit: "cover",
  },
  greetingText: {
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  btn: {
    padding: "8px 14px",
    background: "#4caf50",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
  },
  login: {
    padding: "10px 16px",
    background: "#f6851b",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
  logout: {
    padding: "8px 14px",
    background: "#ff4d4d",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
  },
};

export default NavBar;
