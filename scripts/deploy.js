const hre = require("hardhat");

async function main() {
  // Get the contract
  const Contract = await hre.ethers.getContractFactory("HeroesFactory");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
