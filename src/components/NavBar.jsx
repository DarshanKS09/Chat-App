import React, { useState, useContext, createContext } from "react";
import { dataContext } from "./context/ChatAppContext";
const Navbar = ({view,setView,create,setCreate}) => {
  const menuitems = [
    { menu: "AllUsers", link: "/" },
    { menu: "CHAT", link: "/" },
    { menu: "CONTACT", link: "/" },
    { menu: "SETTING", link: "/" },
    { menu: "FAQ's", link: "/" },
    { menu: "TERMS & CONDITIONS", link: "/" }
  ];
  console.log(view);
  const {fetchData} = useContext(dataContext);
  const [name, setName] = useState("Create Account");
  const { account, userName, connectWallet,disconnectWallet } = useContext(dataContext);

 const handleButton = async () => {
  setCreate(1);
  if (!account) {
    await connectWallet(); // ✅ Uses global context logic
  } else {
    console.log("Wallet already connected:", account);
  }
};

  return (
    <nav className="w-full bg-[#1e2a38] text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-3">
        <div className="flex items-center space-x-3">
          <img
            src="images/Straw Hat Pirates.jpeg"
            alt="logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="text-orange-400 font-bold hidden sm:inline">Chat App</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {menuitems.map((el, i) => (
            <div
              key={i}
              onClick={() => setView(i)}
              className={`cursor-pointer transition-all duration-200 px-3 py-1 ${
                view === i
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-400"
              }`}
            >
              {el.menu}
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <button
            onClick={handleButton}
            className="bg-gray-700 text-orange-400 hover:text-orange-600 text-xs px-4 py-2 rounded-md"
          >
            {account ? userName : name}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
