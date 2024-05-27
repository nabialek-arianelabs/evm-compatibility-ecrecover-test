import { JsonRpcProvider, Signature, Wallet } from 'ethers';
import { HEDERA_NETWORK } from '../scripts/config';

export const sign = async (message: string, privateKey: string): Promise<Signature> =>  {
  const provider = new JsonRpcProvider(HEDERA_NETWORK);
  const signer = new Wallet(privateKey, provider);
  const flatSignature = await signer.signMessage(message);
  return Signature.from(flatSignature);
}
