import {AccountId, PrivateKey} from "@hashgraph/sdk";

export type Account = {
    accountId: AccountId,
    privateKey: PrivateKey,
    accountType: "EDCSA" | "ED25519"
};