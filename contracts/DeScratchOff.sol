//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DeScratchOff is VRFConsumerBase, ERC721{
    bytes32 internal keyHash;
    uint256 internal fee;

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    
    uint256 public randomResult;
    uint public scratchCardSupply = 0;
    mapping(uint => ScratchCard) public scratchCards;

    struct ScratchCard {
        uint id;
        uint[] numbers;
        bool isScratch;
        address owner;
    }

    event ScratchCardPurchase (
        uint id,
        uint[] numbers,
        bool isScratch,
        address owner
    );

    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Polygon (Matic) Mumbai Testnet
     * Chainlink VRF Coordinator address: 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
     * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Key Hash: 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
     */
    constructor ()
        VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
        )
        ERC721("De-Scratch Card", "DSC") 
    {
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001 * 10 ** 18; // 0.0001 LINK
    }

    /** 
     * Buy a Scratch Card NFT
     */
    function buyScratchCard() external {
        scratchCardSupply++;

        _tokenIds.increment();
        uint _tokenId = _tokenIds.current();
        _safeMint(msg.sender, _tokenId);

        scratchCards[scratchCardSupply] = ScratchCard(scratchCardSupply, new uint[](0), false, msg.sender);
        emit ScratchCardPurchase(scratchCardSupply, new uint[](0), false, msg.sender);
    }

    /** 
     * Get numbers on Scratch Card
     */
    function getNumbersByScratchCard(uint _id) public view returns (uint [] memory){
        ScratchCard storage _scratchCard = scratchCards[_id];
        return _scratchCard.numbers;
    }

    /** 
     * Set list of random numbers on Scratch Card
     */
    function fillScratchCard(uint _id) external {
        ScratchCard storage _scratchCard = scratchCards[_id];

        require(_scratchCard.isScratch == false, "You already use this Scratch Card");
        _scratchCard.isScratch = true;

        getRandomNumber();

        for(uint i = 0; i < 9; i++){
            uint256 _randomNumber = uint256(keccak256(abi.encode(randomResult, i))) % 9 + 1;
            _scratchCard.numbers.push(_randomNumber);
        }
    }

    /** 
     * Requests randomness 
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) > fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        bytes32 i = requestId;
        i = requestId;
        randomResult = randomness;
    }

    /**
     * DO NOT ADD THIS IN PRODUCTION
     * Avoid locking your LINK in the contract
     */
    function withdrawLink() external {
        require(LINK.transfer(msg.sender, LINK.balanceOf(address(this))), "Unable to transfer");
    }
}
