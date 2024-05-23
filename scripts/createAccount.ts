import {Client, PrivateKey, AccountCreateTransaction, Hbar, AccountId} from "@hashgraph/sdk";
import {HEDERA_OPERATOR_ID, HEDERA_OPERATOR_KEY} from "./config";
import {Account} from "./account";


async function createAccount(keyType: string) {
    const client = Client.forTestnet();
    client.setOperator(AccountId.fromString(HEDERA_OPERATOR_ID), PrivateKey.fromStringECDSA(HEDERA_OPERATOR_KEY));

    let newPrivateKey;
    switch (keyType) {
        case "ED25519": {
            newPrivateKey = PrivateKey.generateED25519();
            break;
        }
        case "EDCSA": {
            newPrivateKey = PrivateKey.generateECDSA();
            break;
        }
        default:{
            throw new Error("Unsupported key type");
        }
    }
    const newPublicKey = newPrivateKey.publicKey;

    const transaction = new AccountCreateTransaction()
        .setKey(newPublicKey)
        .setInitialBalance(new Hbar(10));

    const response = await transaction.execute(client);
    const receipt = await response.getReceipt(client);

    const newAccountId = receipt.accountId;

    console.log(`Account ID: ${newAccountId}`);
    console.log(`Public Key: 0x${newPublicKey.toStringRaw()}`);
    console.log(`Private Key: 0x${newPrivateKey.toStringRaw()}`);
    return {
        accountId: newAccountId,
        privateKey: newPrivateKey,
        accountType: keyType
    } as Account;
}

export { createAccount };