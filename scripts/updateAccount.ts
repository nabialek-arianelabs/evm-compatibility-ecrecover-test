import { PrivateKey, AccountUpdateTransaction } from '@hashgraph/sdk';
import * as dotenv from 'dotenv';
import { Account } from './account';
import { initClient } from './client';

dotenv.config();

async function changeAccountKeys(account: Account, keyType: string) {
    const client = initClient();
    let newPrivateKey;
    switch (keyType) {
        case 'ED25519': {
            newPrivateKey = PrivateKey.generateED25519();
            break;
        }
        case 'ECDSA': {
            newPrivateKey = PrivateKey.generateECDSA();
            break;
        }
        default:{
            throw new Error('Unsupported key type');
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
    return newPrivateKey;
}

export { changeAccountKeys };
