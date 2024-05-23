import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import {HEDERA_NETWORK, HEDERA_OPERATOR_KEY, HEDERA_OPERATOR_ID} from "./scripts/config";
import {AccountId, Client, PrivateKey} from "@hashgraph/sdk";
const client = Client.forTestnet();
client.setOperator(AccountId.fromString(HEDERA_OPERATOR_ID), PrivateKey.fromStringECDSA(HEDERA_OPERATOR_KEY))
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hedera: {
      url: HEDERA_NETWORK,
      accounts: [HEDERA_OPERATOR_KEY]!,
    },
  },
};

export default config;
