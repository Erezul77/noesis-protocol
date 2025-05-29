
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);

    const ReflectionVault = await ethers.getContractFactory("ReflectionVault");
    const contract = await ReflectionVault.deploy();
    await contract.deployed();

    console.log("ReflectionVault deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
