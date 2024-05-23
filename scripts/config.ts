import * as dotenv from "dotenv";

dotenv.config();

export const HEDERA_NETWORK = process.env.HEDERA_NETWORK!;
export const HEDERA_OPERATOR_ID = process.env.HEDERA_OPERATOR_ID!;
export const HEDERA_OPERATOR_KEY = process.env.HEDERA_OPERATOR_KEY!;
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
