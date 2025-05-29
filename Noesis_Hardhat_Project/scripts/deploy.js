
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const ReflectionVault = await ethers.getContractFactory("ReflectionVault");
  const vault = await ReflectionVault.deploy();
  await vault.deployed();

  console.log("ReflectionVault deployed to:", vault.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
