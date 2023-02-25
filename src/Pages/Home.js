import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { useSigner, useAccount, Web3Button } from '@web3modal/react'

import { useWeb3Polygon } from '../hooks/useWeb3';

const Home = ({ appState }) => {

    const { account, isReady } = useAccount();
    const web3Polygon = useWeb3Polygon();

    console.log(account.address)

    const shortenString = (stringToShorten) => {
        const firstPart = stringToShorten.substring(0, 6);
        const secondPart = stringToShorten.substring(stringToShorten.length - 6, stringToShorten.length)
        return `${firstPart}..${secondPart}`;
    }

    var GrandView = (<></>)

    return (
        <div className="main-content">
            <h3 className="text-white main-title">MOMENTO</h3>
            <div className="flex-row">
                <p className="text-white">{shortenString(account.address)}</p> <Web3Button/><br />
                {GrandView}
            </div>
        </div>
    )
}

export default Home;
