import {ethers, hexlify, Signature} from "ethers";
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

    const flatSignature = await signer.signMessage(ethers.getBytes(messageHash));
    const signature = Signature.from(flatSignature);
    const fullSignature = ethers.concat([signature.r, signature.s, hexlify(signature.v)]); // TODO

    const expectedAddress = await signer.getAddress();

    const result = await contract.verifySignature(messageHash, fullSignature, expectedAddress);

    return result;
}

export { interact };
