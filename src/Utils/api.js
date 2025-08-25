
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ChatABI, ChatAppAddress } from "../components/context/Constants";

 export const ConnectWallet = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // ✅ If already connected, just return the first account
  if (!accounts || accounts.length === 0) {
    console.warn("🟡 No accounts found. Possibly already connected.");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return {
    provider,
    signer,
    userAddress: accounts[0],
  };
};
 export const checkIfWalletConnected = async () => {
  if (!window.ethereum) return null;

  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  });

  if (accounts.length > 0) {
    return {
      userAddress: accounts[0],
    };
  } else {
    return null;
  }
};


 export const fetchContract=(signerOrProvider)=>{
   return  new ethers.Contract(ChatAppAddress,ChatABI,signerOrProvider);

 }

 export const connectingWithContract = async() =>{
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        return contract; 
    }
    catch(error){
        console.log("Can't connect");
    }
 }

 export const getTime = (timestamp)=>{
         const newtime = new Date(timestamp.toNumber()*1000);
         const realtime = newtime.getHours() + "/" + newtime.getMinutes() + "/" +  newtime.getSeconds() +
                          "Date :" + newtime.getDate() + "/" + (newtime.getMonth()+1) + "/" + newtime.getFullYear() ; 
         return realtime;    
 }

 