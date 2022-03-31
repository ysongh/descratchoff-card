# DeScratchOff Card
A digital scratch card Dapp where users can win prizes by matching 3 images

## Technologies
- React
- Bootstrap 4
- Node.js
- Hardhat
- Ether.js
- nft.storage (Store images for the digital scratch card on IPFS)
- Covalent API (Get NFT token IDs for contract using Covalent API)
- NFTPort API (Mint the NFT of the digital scratch card on Polygon for free using Easy Mint API)
- Chainlink VRF (Determine if the user won something from digital scratch card )
- Lighthouse (Store digital scratch card's cover on IPFS forever)
- Gasless SDK (Gasless transactions for redeeming digital scratch card)

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Create a file called '.env' on the root folder and add the following code
```
ALCHEMYAPI_KEY = <KEY>
PRIVATEKEY = <KEY>
COVALENT_APIKEY = <KEY>
DESCRATCHOFF_ADDRESS = <KEY>
```
- Run `npx hardhat run scripts/sample-script.js --network mumbai` to deploy contract

- Create a file called 'config.js' on the src folder and add the following code
```
export const NFT_STRORAGE_APIKEY = <KEY>;
export const NFTPORT_APIKEY = <KEY>;
export const DESCRATCHOFF_ADDRESS = <KEY>;
export const BICONOMY_APIKEY = <KEY>;
```
- Run `npm start` to start the dapp