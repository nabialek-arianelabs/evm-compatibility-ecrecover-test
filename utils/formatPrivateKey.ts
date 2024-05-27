import { PrivateKey } from '@hashgraph/sdk';

export const formatPrivateKey = (pk: PrivateKey) => `0x${pk.toStringRaw()}`;
