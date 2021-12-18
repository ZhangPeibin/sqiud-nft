//npx hardhat flatten ./contracts/NFTMinter.sol > ./temp/flatten/NFTMinterFlatten.sol
//npx hardhat run scripts/upgradeNftMinter.js --network mainnetBSC
const { ethers, network, hardhat, upgrades} = require(`hardhat`);
const deployedContracts = require('../deploymentCache.json')

const nftMinterAddress = deployedContracts.proxy_nftMinter //`0x23462C03CEDb1ef6109b84d7c8E2af967d253336`;

let nftMinter;

async function main() {
    let accounts = await ethers.getSigners();
    console.log(`Deployer address: ${ accounts[0].address}`);
    console.log(`Start deploying upgrade NFT minter contract`);
    const NftMinter = await ethers.getContractFactory(`NFTMinter`);
    nftMinter = await upgrades.upgradeProxy(nftMinterAddress, NftMinter);
    await nftMinter.deployed();
    console.log(`NFT minter upgraded`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });