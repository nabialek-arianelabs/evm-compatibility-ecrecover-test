# Hardhat Project: ECRecover Usability in the Hedera Network

This project investigates the relationship between private key types and the usability of the `ecrecover` function in the Hedera Network.

## Overview

Accounts with an ECDSA key pair and an EVM alias derived from them should be able to use the `ecrecover` function correctly, provided their key pair has not been replaced.

In the Hedera Network:
- `msg.sender` always returns the EVM alias associated with the user account, even if the key pairs associated with that account are replaced. This means `msg.sender` will remain consistent for every transaction signed by that account.
- The `ecrecover` function, however, returns the address associated with the actual private key used to sign the message passed to it. Therefore, after the first key pair update, `ecrecover` will no longer work correctly for ECDSA accounts. Despite this, `msg.sender` will remain unchanged and consistent.

Please note that `ecrecover` will never work for ED25519 accounts, regardless of the circumstances.

## Running Tests

To prove these assumptions, automated tests have been prepared. To run them, follow these steps:

1. Copy `.env.example` to `.env`:

    ```shell
    cp .env.example .env
    ```

2. Set the environment variables in the `.env` file:

    ```plaintext
    HEDERA_NETWORK=https://testnet.hashio.io/api
    HEDERA_MIRRORNODE=https://testnet.mirrornode.hedera.com/api/v1/
    HEDERA_OPERATOR_KEY={Your operator Private Key - remember to keep it secret}
    HEDERA_OPERATOR_ID={Your operator id in 0.0.Z format}
    QUERY_GAS=100000
    QUERY_HBAR_PAYMENT=2
    ```

   Ensure you have the `HEDERA_OPERATOR_KEY` and `HEDERA_OPERATOR_ID` set, and that they have test hbars.

    - `HEDERA_NETWORK`: This URL is used to create transactions in the Hedera network.
    - `HEDERA_MIRRORNODE`: This URL is required to get the Hedera contract ID of the deployed contract (using the Hedera address as an input).
    - `HEDERA_OPERATOR_KEY` and `HEDERA_OPERATOR_ID`: These are required and should have test hbars.
    - `QUERY_HBAR_PAYMENT`: This is the payment for querying contract methods.
    - `QUERY_GAS`: This is the gas used for querying contract methods.

3. Run the following command:
```shell
REPORT_GAS=true npx hardhat test --network hedera
```

## Contract Deployment

This repository also contains the code for a Smart Contract. This smart contract allows users to:

- Verify a signature and return the recovered address.
- Retrieve the address of the sender.

To deploy this Smart Contract, run the following command:

```shell
npx hardhat ignition deploy ./ignition/modules/ecrecover-check.deploy.ts --network hedera
```
