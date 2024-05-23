// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract EcrecoverCheck {
    function verifySignature(bytes32 hash, bytes memory signature, address expectedAddress) public pure returns (bool) {
        require(signature.length == 65, "Invalid signature length");
        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
            v := byte(0, mload(add(signature, 0x60)))
        }
        address recoveredAddress = ecrecover(hash, v, r, s);
        console.log("Address received from ecrecover: ", recoveredAddress);
        console.log("Expected address: ", expectedAddress);
        return recoveredAddress == expectedAddress;
    }
}
