import { ethers } from 'ethers';
import * as readlineSync from 'readline-sync';

function getUSDTBalance(address: string) {
const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const provider = new ethers.providers.InfuraProvider('mainnet', '95a6dabb7d5646cd984b4deba4c6fe9b');
const usdtContract = new ethers.Contract(usdtContractAddress, ['function balanceOf(address) view returns (uint256)'], provider);
usdtContract.balanceOf(address).then((balance: ethers.BigNumber) => {
const formattedBalance = ethers.utils.formatUnits(balance, 6);
console.log('USDT Balance:', formattedBalance);
});
}

async function main() {
console.log('Select an option:');
console.log('1. Get Last Block Number');
console.log('2. Get USDT Balance');
const option = readlineSync.question('Enter your choice: ');

if (option === '1') {
await getBlockNumber();
} else if (option === '2') {
const address = readlineSync.question('Enter the address: ');
getUSDTBalance(address);
}
}

async function getBlockNumber() {
const provider = new ethers.providers.InfuraProvider('mainnet', '95a6dabb7d5646cd984b4deba4c6fe9b');
const blockNumber = await provider.getBlockNumber();
console.log('Last Block Number:', blockNumber);
}

main().catch((error) => {
console.error(error);
process.exit(1);
});