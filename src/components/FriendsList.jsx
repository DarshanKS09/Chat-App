import React, { useEffect, useState } from "react";
import { connectingWithContract } from "../Utils/api";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  const loadFriends = async () => {
    try {
      const contract = await connectingWithContract();
      const list = await contract.displayFrnds();
      setFriends(list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFriends();
  }, []);

  return (
    <div style={styles.container}>
      <h3>Your Friends</h3>

      {friends.length === 0 && <p>No friends yet</p>}

      {friends.map((f, i) => (
        <div key={i} style={styles.friend}>
          <span>{f.name}</span>
          <span style={styles.addr}>
            {f.f_add.slice(0, 6)}...{f.f_add.slice(-4)}
          </span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
  },
  friend: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    borderBottom: "1px solid #ddd",
  },
  addr: {
    fontSize: 12,
    opacity: 0.7,
  },
};

export default FriendsList;
