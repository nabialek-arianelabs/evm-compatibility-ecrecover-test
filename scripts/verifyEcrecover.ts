import { QUERY_GAS, QUERY_HBAR_PAYMENT } from './config';
import { Client, Hbar } from '@hashgraph/sdk';
import { ContractCallQuery, ContractFunctionParameters } from '@hashgraph/sdk';
import { arrayify } from '../utils/arrayify';
import { sign } from '../utils/sign';
import { Signature } from 'ethers';

const getAddressRecoveredFromEcRecover = async (
  contractId: string,
  client: Client,
  message: string,
  signature: Signature,
) => {
    const verifySignatureQuery = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(QUERY_GAS)
      .setFunction(
        'verifySignature',
        new ContractFunctionParameters()
          .addString(message)
          .addUint8(signature.v)
          .addBytes32(arrayify(signature.r))
          .addBytes32(arrayify(signature.s)),
      )
      .setQueryPayment(new Hbar(QUERY_HBAR_PAYMENT));
    const verifySignatureTransaction = await verifySignatureQuery.execute(client);
    return verifySignatureTransaction.getAddress();
}

const getMsgSenderAddress = async (contractId: string, client: Client) => {
    const getSenderQuery = new ContractCallQuery()

      .setContractId(contractId)
      .setGas(QUERY_GAS)
      .setFunction('getSender')
      .setQueryPayment(new Hbar(QUERY_HBAR_PAYMENT));
    const getSenderTransaction = await getSenderQuery.execute(client);
    return getSenderTransaction.getAddress();
}

async function verifyEcrecover(contractId: string, client: Client, privateKey: string) {
    const message = 'Test message';
    const addressRecoveredFromEcRecover = await getAddressRecoveredFromEcRecover(
      contractId,
      client,
      message,
      await sign(message, privateKey)
    );
    const msgSenderFromSmartContract = await getMsgSenderAddress(contractId, client);
    return addressRecoveredFromEcRecover === msgSenderFromSmartContract;
}

export { verifyEcrecover };
