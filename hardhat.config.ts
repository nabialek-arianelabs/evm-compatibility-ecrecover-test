import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { HEDERA_NETWORK, HEDERA_OPERATOR_KEY } from './scripts/config';

const config: HardhatUserConfig = {
  mocha: {
    timeout: 100000000,
  },
  solidity: '0.8.24',
  networks: {
    hedera: {
      url: HEDERA_NETWORK,
      accounts: [HEDERA_OPERATOR_KEY]!,
    },
  },
};

export default config;
