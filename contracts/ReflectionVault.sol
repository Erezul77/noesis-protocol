
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReflectionVault {
    address public owner;

    event ReflectionSubmitted(
        address indexed submitter,
        string cid,
        uint256 timestamp,
        uint256 adequacyScore
    );

    mapping(address => string[]) public reflectionsByUser;
    mapping(string => uint256) public adequacyScores;

    constructor() {
        owner = msg.sender;
    }

    function submitReflection(string memory cid, uint256 adequacyScore) external {
        reflectionsByUser[msg.sender].push(cid);
        adequacyScores[cid] = adequacyScore;
        emit ReflectionSubmitted(msg.sender, cid, block.timestamp, adequacyScore);
    }
}
