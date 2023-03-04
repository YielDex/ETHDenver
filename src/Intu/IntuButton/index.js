import './style.css'
import { useState } from 'react'

import { ethers } from 'ethers';
import { IntuABI } from '../ABI';



const IntuButton = () => {

    const [intu, setIntu] = useState({})

    const connectIntu = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        
        const CONTRACT_ADDRESS = '0x4eA8A6DfC72A458F8892e81B785eec44093794BD'; // Goerli
        const INTUContract = await new ethers.Contract(CONTRACT_ADDRESS, IntuABI, signer);

        const result = await INTUContract.getUserVaults()
        console.log({result})

        console.log(parseInt(result[0].toString()))

        const vaultId = parseInt(result[0].toString())

        const vaultInfo = await INTUContract.getVaultInfo(vaultId)

        console.log({vaultInfo})

        setIntu(state => ({...state, vaultInfo}))
    }
        


    return (
        <div>
            {intu.vaultInfo && <p>Intu sig name: {intu.vaultInfo[0].toString()}</p>}
            {intu.vaultInfo && <p>Intu sig address: {intu.vaultInfo[3].toString()}</p>}
            <button className="btn btn-primary btn-intu" onClick={connectIntu}>Connect with Intu</button>
        </div>
    )
}

export default IntuButton
