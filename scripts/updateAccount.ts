import { Client, PrivateKey, AccountUpdateTransaction, AccountId } from "@hashgraph/sdk";
import * as dotenv from "dotenv";
import {HEDERA_OPERATOR_ID, HEDERA_OPERATOR_KEY} from "./config";
import {Account} from "./account";

dotenv.config();

async function changeAccountKeys(account: Account, keyType: string) {
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

    const transaction = new AccountUpdateTransaction()
        .setAccountId(account.accountId)
        .setKey(newPublicKey)
        .freezeWith(client);
    let oldPrivateKey = account.privateKey;
    const signTx = await (await transaction.sign(oldPrivateKey)).sign(newPrivateKey);
    const submitTx = await signTx.execute(client);
    await submitTx.getReceipt(client);

    console.log(`New public key: 0x${newPublicKey.toStringRaw()}`);
    console.log(`New private key: 0x${newPrivateKey.toStringRaw()}`);
    return newPrivateKey;
}

export { changeAccountKeys };
