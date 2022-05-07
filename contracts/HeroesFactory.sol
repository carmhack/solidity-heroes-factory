//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract HeroesFactory {
    struct Hero {
        string name;
        uint strength;
        uint intelligence;
        uint dexterity;
    }

    event NewHero(uint id, string name, uint strength, uint intelligence, uint dexterity);

    Hero[] public heroes;

    function _createHero(string memory _name, uint _str, uint _int, uint _dex) private {
        heroes.push(Hero(_name, _str, _int, _dex));
        uint id = heroes.length;
        emit NewHero(id, _name, _str, _int, _dex);
    }

    function _generateRandomStats(string memory _str) private pure returns (uint, uint, uint) {
        uint s = uint(keccak256(abi.encodePacked(_str, "strength"))) % 20;
        uint i = uint(keccak256(abi.encodePacked(_str, "intelligence"))) % 20;
        uint d = uint(keccak256(abi.encodePacked(_str, "dexterity"))) % 20;
        
        return (s, i, d);
    }

    function createRandomHero(string memory _name) public {
        (uint strength, uint intelligence, uint dexterity) = _generateRandomStats(_name);
        _createHero(_name, strength, intelligence, dexterity);
    }

    function getHeroes() external view returns(Hero[] memory) {
        return heroes;
    }
}