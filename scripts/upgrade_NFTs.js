const { ethers, network, upgrades} = require(`hardhat`);

const playerNFTAddress = `0xb00ED7E3671Af2675c551a1C26Ffdcc5b425359b`;
const busNFTAddress = `0x6d57712416eD4890e114A37E2D84AB8f9CEe4752`;
const ownerAddress = `0xbafefe87d57d4c5187ed9bd5fab496b38abdd5ff`;


async function main() {
    let accounts = await ethers.getSigners();
    console.log(`Deployer address: ${ accounts[0].address}`);
    if(accounts[0].address.toLowerCase() !== ownerAddress.toLowerCase()){
        console.log(`Change deployer address. Current deployer: ${accounts[0].address}. Owner: ${ownerAddress}`);
        return;
    }
    let nonce = await network.provider.send(`eth_getTransactionCount`, [accounts[0].address, "latest"]) - 1;

    console.log(`Start upgrade Bus NFT contract`);
    const BusNFT = await ethers.getContractFactory(`SquidBusNFT`);
    const busNft = await upgrades.upgradeProxy(busNFTAddress, BusNFT);
    await busNft.deployed();
    console.log(`Bus NFT upgraded`);

    console.log(`Start upgrade Bus NFT contract`);
    const PlayerNFT = await ethers.getContractFactory(`SquidBusNFT`);
    const playerNft = await upgrades.upgradeProxy(playerNFTAddress, PlayerNFT);
    await playerNft.deployed();
    console.log(`Player NFT upgraded`);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
