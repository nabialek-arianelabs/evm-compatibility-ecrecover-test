import { interact } from "./interact";
import {CONTRACT_ADDRESS} from "./config";
import {createAccount} from "./createAccount";
import {changeAccountKeys} from "./updateAccount";
import {PrivateKey} from "@hashgraph/sdk";
import {Account} from "./account";

async function main() {
    const contractAddress = CONTRACT_ADDRESS;
    const keys = ["EDCSA", "ED25519"];
    let account: Account;
    let result: boolean;
    let newPrivateKey: PrivateKey;
    for(const initialKey of keys) {
       for(const changedKey of keys) {
           console.log(`---------------------------- ${initialKey} -> ${changedKey} ----------------------------------`)
           console.log(`Creating account with ${initialKey} keys...`);
           account = await createAccount(initialKey);

           console.log("Interacting with ecrecover, before key change");
           result = await interact(contractAddress, formatPrivateKey(account.privateKey));
           console.log("Initial ecrecover verification result:", result);

           console.log(`Changing account keys to ${changedKey} key`);
           newPrivateKey = await changeAccountKeys(account, changedKey);

           console.log("Interacting with ecrecover contract using new keys...");
           result = await interact(contractAddress, formatPrivateKey(newPrivateKey));
           console.log(`${initialKey} -> ${changedKey} after change, ecrecover verification result:`, result);
       }
    }
}
function formatPrivateKey(pk: PrivateKey) {
    return `0x${pk.toStringRaw()}`;
}

main().catch(console.error);
