
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SignClient } from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";
import './App.css';

import FormHead from './componants/FormHead';
import Strategies from './componants/Strategies';

const web3Modal = new Web3Modal({
  projectId: "1bd4139fcba9da0ebb55e2d5ffa1d12d",
  standaloneChains: ["eip155:5"]
});

function WalletAbstraction() {
  const [signClient, setSignClient] = useState();
  const [sessions, setSessions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [txHash, setTxHash] = useState();
  const reset = () => {
    setAccounts([]);
    setSessions([]);
  };

  async function createClient() {
    try {
      const client = await SignClient.init({
        projectId:"1bd4139fcba9da0ebb55e2d5ffa1d12d",
      })
      console.log(client);
      setSignClient(client);
      await subscribeToEvents(client);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleConnect() {
    if (!signClient) throw Error("cannot connect, signClient is not defined")
    try {
      const proposalNamespace = {
        eip155: {
          chains: ["eip155:5"],
          methods: ["eth_sendTransaction"],
          events: ["connect", "disconnect"]
        }
      };

      const { uri, approval } = await signClient.connect({
        requiredNamespaces: proposalNamespace
      });

      console.log('uri', uri);

      if (uri) {
        web3Modal.openModal({ uri })
        const sessionNamespace = await approval();
        console.log("sessionNamespace", sessionNamespace)
        onSessionConnect(sessionNamespace)
        //close the modal
        web3Modal.closeModal();
      }

    } catch (e) {
      console.log(e);
    }
  }

  async function onSessionConnect(session) {
    if (!session) throw Error("session doesn't even exist")
    try {
      setSessions(session)
      setAccounts(session.namespaces.eip155.accounts[0].slice(9));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDisconnect() {
    try {
      await signClient.disconnect({
        topic: sessions.topic,
        code: 6000,
        message: "User disconnected"
      });
      reset();
    } catch (e) {
      console.log(e);
    }
  }

  async function subscribeToEvents(client) {
    if (!client)
      throw Error("No events to subscribe to b/c client is not defined");

    try {
      client.on("session_delete", () => {
        console.log("user disconnected the session from their wallet");
        reset();
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!signClient) {
      createClient();
    }
  }, [signClient]);

  return (
    <div className="App">
      {accounts.length ? (
        <>
          <p>{accounts}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
          {txHash &&
            <h2> Check your Transaction Hash {" "}
              <a
                href={`https://goerli.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferer noreferrer"
              >here
              </a>
              !
            </h2>
          }
        </>
      ) : (
        <button onClick={handleConnect} disabled={!signClient}>
          Connect
        </button>
      )
      }
      <App accounts={accounts}/>
    </div>
  );
}

const App = ({ accounts}) => {

  const [page, setPage] = useState('strategies');
  const [selectedBuyAsset, setSelectedBuyAsset] = useState("");
  const [selectedUnderlayingAsset, setSelectedUnderlayingAsset] = useState("");

  // const { account, isReady } = useAccount();
  // const web3Polygon = useWeb3Polygon();

  // console.log(account.address)

  const shortenString = (stringToShorten) => {
      const firstPart = stringToShorten.substring(0, 6);
      const secondPart = stringToShorten.substring(stringToShorten.length - 6, stringToShorten.length)
      return `${firstPart}..${secondPart}`;
  }

  return(
    <>
      <div className="main-content">
        <h3 className="text-white main-title">Yieldex</h3>
        <div className="flex-row">
            <p className="text-white">{accounts}</p>
        </div>
        <FormHead
          underlayingAssetState={{selectedUnderlayingAsset, setSelectedUnderlayingAsset}}
          buyAssetState={{selectedBuyAsset, setSelectedBuyAsset}}
        />
        {/* {page === 'strategies' && <Strategies
          underlayingAssetState={{selectedUnderlayingAsset, setSelectedUnderlayingAsset}}
          buyAssetState={{selectedBuyAsset, setSelectedBuyAsset}}
        />} */}
      </div>
    </>
    
  );
}




export default WalletAbstraction;