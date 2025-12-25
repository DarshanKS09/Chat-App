import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatAppProvider } from "./components/context/ChatAppContext";
import { WalletProvider } from "./components/context/WalletContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WalletProvider>
    <ChatAppProvider>
      <App />
    </ChatAppProvider>
  </WalletProvider>
);
