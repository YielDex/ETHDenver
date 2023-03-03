import { BrowserRouter, Route, Routes } from 'react-router-dom';


// import { Web3Modal } from '@web3modal/react';
import { providers } from '@web3modal/ethereum';
import { gnosisTestnet, cronosTestnet, mumbaiTestnet } from "./utils/network";
import { useState, useEffect } from 'react';

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";
import { useSigner, useAccount } from 'wagmi'

import { Web3Button } from "@web3modal/react";

import { useWeb3Polygon } from './hooks/useWeb3';

import FormHead from './componants/FormHead';

import Strategies from './componants/Strategies';

// const config = {
//   projectId: '1bd4139fcba9da0ebb55e2d5ffa1d12d',
//   theme: 'dark',
//   accentColor: 'default',
//   ethereum: {
//     appName: 'MOMENTO',
//     autoConnect: true,
//     chains: [
//       goerli
//       // gnosisTestnet,
//       // cronosTestnet,
//       // mumbaiTestnet,

//     ],
//     providers: [
//       providers.walletConnectProvider({
//         projectId: "1bd4139fcba9da0ebb55e2d5ffa1d12d",
//       }),
//     ],
//   }
// };

const chains = [goerli]

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "1bd4139fcba9da0ebb55e2d5ffa1d12d" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: '1bd4139fcba9da0ebb55e2d5ffa1d12d',
    version: "2", // "1" or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {

  return(
    <>
      <Web3Modal
        projectId='1bd4139fcba9da0ebb55e2d5ffa1d12d'
        ethereumClient={ethereumClient}
      />
      <WagmiConfig client={wagmiClient}>
        <Home />
      </WagmiConfig>
    </>
    
  );
}

const Home = () => {

  const [page, setPage] = useState('strategies');
  const [selectedBuyAsset, setSelectedBuyAsset] = useState("");
  const [selectedUnderlayingAsset, setSelectedUnderlayingAsset] = useState("");

  const { address, isConnected } = useAccount();
  const web3Polygon = useWeb3Polygon();

  useEffect(() => {
    if (isConnected) {
      console.log('account', address);
    }
  }, [isConnected, address])

  const shortenString = (stringToShorten) => {
      const firstPart = stringToShorten.substring(0, 6);
      const secondPart = stringToShorten.substring(stringToShorten.length - 6, stringToShorten.length)
      return `${firstPart}..${secondPart}`;
  }

  // useEffect(() => {
    


  //   (async () => {
  //     
  //   })()
      

  // })

  return (
    <div className="main-content">
      <h3 className="text-white main-title">MOMENTO</h3>
      <div className="flex-row">
          { isConnected && <p className="text-white">{shortenString(address)}</p> }
          <Web3Button/><br />
      </div>
      <FormHead
        underlayingAssetState={{selectedUnderlayingAsset, setSelectedUnderlayingAsset}}
        buyAssetState={{selectedBuyAsset, setSelectedBuyAsset}}
      />
      {page === 'strategies' && <Strategies
        underlayingAssetState={{selectedUnderlayingAsset, setSelectedUnderlayingAsset}}
        buyAssetState={{selectedBuyAsset, setSelectedBuyAsset}}
      />}
    </div>
  )

}

  

export default App;