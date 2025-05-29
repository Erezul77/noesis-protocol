
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ReflectionVault {
    struct Reflection {
        address sender;
        string cid;
        uint256 adequacy;
        uint256 timestamp;
    }

    Reflection[] public reflections;

    event ReflectionSubmitted(address indexed sender, string cid, uint256 adequacy, uint256 timestamp);

    function submitReflection(string memory cid, uint256 adequacy) external {
        require(bytes(cid).length > 0, "CID required");
        require(adequacy <= 10000, "Adequacy out of range");

        Reflection memory newReflection = Reflection({
            sender: msg.sender,
            cid: cid,
            adequacy: adequacy,
            timestamp: block.timestamp
        });

        reflections.push(newReflection);
        emit ReflectionSubmitted(msg.sender, cid, adequacy, block.timestamp);
    }

    function getReflectionCount() external view returns (uint256) {
        return reflections.length;
    }

    function getReflection(uint256 index) external view returns (Reflection memory) {
        require(index < reflections.length, "Invalid index");
        return reflections[index];
    }
}
