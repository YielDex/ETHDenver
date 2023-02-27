import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Web3Modal } from '@web3modal/react';
import { providers } from '@web3modal/ethereum';
import { gnosisTestnet, cronosTestnet, mumbaiTestnet } from "./utils/network";
import { useState, useEffect } from 'react';

import { ethers } from "ethers";
import { useSigner, useAccount, Web3Button } from '@web3modal/react'

import { useWeb3Polygon } from './hooks/useWeb3';

import FormHead from './componants/FormHead';

import Strategies from './componants/Strategies';

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

const App = () => {

  const [page, setPage] = useState('strategies');

  const { account, isReady } = useAccount();
  const web3Polygon = useWeb3Polygon();

  console.log(account.address)

  const shortenString = (stringToShorten) => {
      const firstPart = stringToShorten.substring(0, 6);
      const secondPart = stringToShorten.substring(stringToShorten.length - 6, stringToShorten.length)
      return `${firstPart}..${secondPart}`;
  }

  return(
    <>
      <Web3Modal config={config}/>
      <div className="main-content">
        <h3 className="text-white main-title">MOMENTO</h3>
        <div className="flex-row">
            <p className="text-white">{shortenString(account.address)}</p> <Web3Button/><br />
        </div>
        <FormHead />
        {page === 'strategies' && <Strategies />}
      </div>
    </>
    
  );
}

export default App;