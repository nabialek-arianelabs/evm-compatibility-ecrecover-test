import {ethers} from "hardhat";

async function main() {
    const EcrecoverCheck = await ethers.getContractFactory("EcrecoverCheck");
    console.log("Deploying EcrecoverCheck...");
    try {
        const ecrecoverCheck = await EcrecoverCheck.deploy();
        await ecrecoverCheck.waitForDeployment();
        console.log("EcrecoverCheck deployed to:", await ecrecoverCheck.getAddress());
    } catch(e) {
        console.log("Deployment error: ", e);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });