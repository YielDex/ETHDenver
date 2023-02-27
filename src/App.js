import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Strategies from './componants/Strategies';
import { Web3Modal } from '@web3modal/react';
import { providers } from '@web3modal/ethereum';
import { gnosisTestnet, cronosTestnet, mumbaiTestnet } from "./utils/network";
import { useState } from 'react';
import Wrapper from './Pages/Wrapper';

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

  return(
    <>
      <Web3Modal config={config}/>
      <Wrapper>
        {page === 'strategies' && <Strategies />}
      </Wrapper>
    </>
    
  );
}

export default App;