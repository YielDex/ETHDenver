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
// import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";
import { useSigner, useAccount } from 'wagmi'

import { Web3Button } from "@web3modal/react";

import { useWeb3Polygon } from './hooks/useWeb3';

import FormHead from './componants/FormHead';

import Strategies from './componants/Strategies';

import IntuButton from './Intu/IntuButton';

import { SignClient } from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";



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

// const chains = [goerli]

// // Wagmi client
// const { provider } = configureChains(chains, [
//   walletConnectProvider({ projectId: "1bd4139fcba9da0ebb55e2d5ffa1d12d" }),
// ]);
// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors: modalConnectors({
//     projectId: '1bd4139fcba9da0ebb55e2d5ffa1d12d',
//     version: "2", // "1" or "2"
//     appName: "web3Modal",
//     chains,
//   }),
//   provider,
// });

// Web3Modal Ethereum Client
// const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = () => {


  const [signClient, setSignClient ] = useState();
  const [session, setSession] = useState([]);
  const [account, setAccount] = useState([]);

  async function createClient(){
    try{
      const signClient = await SignClient.init({
        projectId: '1bd4139fcba9da0ebb55e2d5ffa1d12d'
      })
      setSignClient(signClient);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log({signClient})

  }, [signClient])


  useEffect(() => {
    if(!signClient){
      createClient();
    }
  }, [signClient])

  const web3Modal = new Web3Modal({
    projectId: '1bd4139fcba9da0ebb55e2d5ffa1d12d',
    // enableStandaloneMode: true,
    // standaloneChains: ["eip155:5"]
  })

  async function onSessionConnected(){
    console.log({session})
    try {
      setSession(session);
      setAccount(session.namespaces.eip155.accounts[0].slice(9));
    } catch(e){
      console.log(e)
    }
  }


  const handleConnect = async () => {
    if (!signClient) throw Error("SignClient does not exist");
    
    const proposalNamespace = {
      eip155: {
          methods: ["eth_sendTransaction"],
          chains: ["eip155:5"],
          events: ["connect", "disconnect"]
        }
      }
  
    const { uri, approval } = await signClient.connect({
      requiredNamespaces: proposalNamespace
    });

    console.log({uri})
  
    if (uri){
      web3Modal.openModal({ uri });
    }

    const unsubscribe = Web3Modal.subscribeModal((newState) =>
        console.log(newState)
      );
    // unsubscribe();

    const sessionNamespace = await approval();
    onSessionConnected(sessionNamespace);
    web3Modal.closeModal();
  }

  const reset = () => {
    setAccount([]);
    setSession([]);
  };

  const handleDisconnect = async () => {
    await signClient.disconnect({
      topic: session.topic,
      message: "User disconnected",
      code: 6000,
     });
    try{
      reset();
    }catch (e) {
      console.log(e);
    }
  }

  console.log({account})


  return(
    <>
      {/* <Web3Modal
        projectId='1bd4139fcba9da0ebb55e2d5ffa1d12d'
        ethereumClient={ethereumClient}
      />
      <WagmiConfig client={wagmiClient}>
        <Home />
      </WagmiConfig> */}
      {account.length ? (
        <p>{account}</p>
        ) : (
        <>
          <button onClick={handleConnect} disabled={!signClient}>
            Connect
          </button>
          <button onClick={handleDisconnect}>Disconnect</button>
        </>
      )}
    </>
    
  );
}

const Home = () => {

  const [page, setPage] = useState('strategies');
  const [selectedBuyAsset, setSelectedBuyAsset] = useState("");
  const [selectedUnderlayingAsset, setSelectedUnderlayingAsset] = useState("");

  const { address, isConnected } = useAccount();
  const web3Polygon = useWeb3Polygon();


  // const { signer, isError, isLoading } = useSigner()

  

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

  return (
    <div className="main-content">
      <h3 className="text-white main-title">MOMENTO</h3>
      <div className="flex-row">
          { isConnected && <p className="text-white">{shortenString(address)}</p> }
          <Web3Button/><br />
          <IntuButton/>
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