// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Contract {
    mapping(uint256 => uint256) private totalInvested;
    mapping(uint256 => mapping(address => uint256)) private investedBy;

    event Invested(uint256 indexed propertyId, address indexed investor, uint256 amount);

    function invest(uint256 propertyId, address investor, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        totalInvested[propertyId] += amount;
        investedBy[propertyId][investor] += amount;
        emit Invested(propertyId, investor, amount);
    }

    function getTotalInvested(uint256 propertyId) external view returns (uint256) {
        return totalInvested[propertyId];
    }

    function getInvestorAmount(uint256 propertyId, address investor) external view returns (uint256) {
        return investedBy[propertyId][investor];
    }
}
