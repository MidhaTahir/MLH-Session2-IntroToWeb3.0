const hre = require("hardhat");

async function main() {
  const { chainId, name } = await hre.ethers.provider.getNetwork();
  const [owner] = await hre.ethers.getSigners();

  console.log(
    `Deployer: ${owner.address}, Balance: ${hre.ethers.utils.formatEther(
      await hre.ethers.provider.getBalance(owner.address)
    )} ETH/MATIC`
  );

  /*//////////////////////////////////////////////////////////////
    DEPLOY CONTRACT
    //////////////////////////////////////////////////////////////*/

  const BasicToken = await hre.ethers.getContractFactory("BasicToken");

  console.log(
    `Deploying: BasicToken to Network: ${name} & ChainId: ${chainId}`
  );

  const basicToken = await BasicToken.deploy();

  await basicToken.deployed();

  console.log("BasicToken deployed: ", basicToken.address);

  // Deployed to: https://mumbai.polygonscan.com/address/0x4ef6F0AB46f419874894Dc49e66ae9498223B2F5

  /*//////////////////////////////////////////////////////////////
                            VERIFY CONTRACT
  //////////////////////////////////////////////////////////////*/

  // You don't want to verify on localhost
  try {
    if (chainId != 31337 && chainId != 1337) {
      await hre.run("verify:verify", {
        address: "basicToken.address",
      });
    }
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
