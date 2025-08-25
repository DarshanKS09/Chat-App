// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const ChatApp = await ethers.getContractFactory("ChatApp");
  const chatapp = await ChatApp.deploy();

  await chatapp.waitForDeployment(); // ✅ for ethers v6

  console.log("Contract deployed to:", await chatapp.getAddress()); // ✅ fixed
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
