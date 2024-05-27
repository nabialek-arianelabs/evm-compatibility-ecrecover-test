import {AccountId, PrivateKey} from '@hashgraph/sdk';

export type Account = {
    accountId: AccountId,
    privateKey: PrivateKey,
    accountType: 'ECDSA' | 'ED25519',
};
