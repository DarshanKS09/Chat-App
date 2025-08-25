import React, { createContext, useEffect,useState } from 'react'
import { connectingWithContract, ConnectWallet , checkIfWalletConnected } from '../../Utils/api';
export const dataContext  = createContext();
const ChatAppContext = ({children}) => {
  const [account, setAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserAddress, setCurrentUserAddress] = useState('');

//Fetch Data
const fetchData = async (address) => {
  try {
    if (!address) {
      console.warn("🚫 No address provided to fetchData");
      return;
    }

    console.log("⏳ Connecting with contract...");
    const contract = await connectingWithContract();
    if (!contract) {
      console.error("❌ Contract connection failed");
      return;
    }

    const name = await contract.getname(address);
    setUserName(name);

    const friends = await contract.displayFrnds();
    setFriendList(friends);

    const users = await contract.displayUsers();
    setUserLists(users);
  } catch (err) {
    console.error("❌ ERROR in fetchData:", err);
    setError("Failed to load data");
  }
};


useEffect(() => {
  const autoConnect = async () => {
    const connected = await checkIfWalletConnected();
    if (connected && connected.userAddress) {
      setAccount(connected.userAddress);
      await fetchData(connected.userAddress); // ✅ Pass explicitly
    }
  };

  autoConnect();
}, []);

const disconnectWallet = () => {
  setAccount('');
  setUserName('');
  setFriendList([]);
  setFriendMsg([]);
  setUserLists([]);
  setCurrentUserAddress('');
  setCurrentUserName('');
  setError('');
  console.log("👋 Wallet disconnected");
};



const connectWallet = async () => {
  const connected = await ConnectWallet();
  if (connected && connected.userAddress) {
    setAccount(connected.userAddress);
    await fetchData(connected.userAddress); // ✅ Pass explicitly
  }
};


  // Read messages
  const readMessage = async ({friendCode}) =>{
    try{
      const contract = await connectingWithContract();
      const read = await contract.displayMsg(friendCode);
      setFriendMsg(read);
    }
    catch(error){
      setError("NO messages to display");
    }
  }
  

  //create account 
  const createAccount = async ({name})=>{
    try{
      if(!name){
        setError("please enter your name");
      }
      const contract = await connectingWithContract();
      const LoggedUser = await contract.register(name);
      setLoading(true);
      await LoggedUser.wait();
      setLoading(false);
    }
    catch(error){
      setError("refresh , currently cant create the account");
    }
  }

  // add friend
  const addFriend = async({friendAddress,Fname}) =>{
    try{
      if(!(friendAddress && Fname)){
        console.log("Please enter friend address and name");
      }
    const contract = await connectingWithContract();
    const addFriend = await contract.addfriend(friendAddress,Fname);
    setLoading(true);
    await addFriend.wait();
    setLoading(false);
    console.log("Friend added");
    window.location.reload();
    }
    catch(error){
      setError("Unable to add friend");
    }
  }

  //send message to friend
  const sendMessage = async({FrdAddress,msg}) =>{
    try{
      if(!(FrdAddress && msg)){
        console.log("Please enter friend address and name");
      }
        const contract = await connectingWithContract();
        const addMsg = await contract.sendMessage(FrdAddress,msg);
        setLoading(true);
        await addMsg.wait();
        setLoading(false);
        console.log("Message sent");
        window.location.reload();
    }
    catch(error){
      setError("Unable to send message");
    }
  }

  //read info
  const readUser = async({userAdd})=>{
    try{
      if(!userAdd){console.log("Enter user Address");}
      const contract = await connectingWithContract();
      const userName = await contract.getname(userAdd);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAdd);
    }
    catch(error){
      setError("Unable to find user with the address");
    }
  }
  return (
    <dataContext.Provider value = {{fetchData ,connectWallet,disconnectWallet, createAccount , addFriend , sendMessage , readUser ,account ,userName, friendList, friendMsg,loading,userLists,error,currentUserName,currentUserAddress ,connectingWithContract,ConnectWallet,}}>
        {children}
    </dataContext.Provider>
  )
}

export default ChatAppContext;