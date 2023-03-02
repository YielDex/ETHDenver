import { ethers } from 'ethers'
import ABI from './ABI.js'

const Oracle = {
    'ETHUSD': '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
}

// Public etherereum RPC provider
const providerUrl = 'https://rpc.ankr.com/eth'

const provider = ethers.getDefaultProvider(providerUrl);

const getLatestPrice = async (pair) => {
    const contract = new ethers.Contract(Oracle[pair], ABI, provider);
    const price = await contract.latestAnswer();
    return price;
}

(async () => {
    const price = await getLatestPrice('ETHUSD');
    console.log(price.toString());
})();



