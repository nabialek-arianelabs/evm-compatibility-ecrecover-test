import { ethers } from "ethers";
import {AccountId, Client, PrivateKey} from "@hashgraph/sdk";
import {HEDERA_NETWORK, HEDERA_OPERATOR_ID, HEDERA_OPERATOR_KEY} from "./config";

async function interact(contractAddress: string, privateKeyString: string) {
    const client = Client.forTestnet();
    client.setOperator(AccountId.fromString(HEDERA_OPERATOR_ID), PrivateKey.fromStringECDSA(HEDERA_OPERATOR_KEY));
    const provider = new ethers.JsonRpcProvider(HEDERA_NETWORK);
    const signer = new ethers.Wallet(privateKeyString, provider);
    const abi = [
        "function verifySignature(bytes32 hash,bytes memory signature,address expectedAddress) public pure returns (bool)",
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const message = "Hello, Hedera!";
    const messageHash = ethers.keccak256(ethers.toUtf8Bytes(message));
    const signature = await signer.signMessage(ethers.getBytes(messageHash));

    const expectedAddress = await signer.getAddress();

    return await contract.verifySignature(messageHash, signature, expectedAddress);
}

export { interact };
