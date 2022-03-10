
const hre = require("hardhat");

async function main() {
  const DeScratchOff = await hre.ethers.getContractFactory("DeScratchOff");
  const deScratchOff = await DeScratchOff.deploy();

  await deScratchOff.deployed();

  console.log("DeScratchOff deployed to:", deScratchOff.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
