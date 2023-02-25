import { useState } from "react";

import WalletConnectScreen from "./Pages/Wallet-connect";
import Home from './Pages/Home'

import { Web3Modal } from '@web3modal/react';
import { providers } from '@web3modal/ethereum';
import { gnosisTestnet, cronosTestnet, mumbaiTestnet } from "./utils/network";

import "./App.css";

const config = {
  projectId: '1bd4139fcba9da0ebb55e2d5ffa1d12d',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'MOMENTO',
    autoConnect: true,
    chains: [
      // gnosisTestnet,
      // cronosTestnet,
      mumbaiTestnet,
    ],
    providers: [
      providers.walletConnectProvider({
        projectId: "1bd4139fcba9da0ebb55e2d5ffa1d12d",
      }),
    ],
  }
};


function App() {
  const [appState, setAppState] = useState({
    view: "start",
  });

  const componentToRender = () => {
    switch(appState.view) {
      case "start":
        return <WalletConnectScreen changeConnectedWallet={setAppState}/>;
      case "create":
        return <Home appState={appState} />;
      default:
        return <WalletConnectScreen changeConnectedWallet={setAppState}/>;
    }
  }

  return (
    <>
      <Web3Modal config={config}/>
      <div className="App">
        {componentToRender()}
      </div>
    </>
  );
}

export default App;
