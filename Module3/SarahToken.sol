// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract SarahToken {

    // public variables
    string public tknName;
    string public tknSymbol;
    uint256 public totalSupply;
    address public owner;

    // mapping of addresses to balances
    mapping(address => uint256) public balance;

    //  set the token name, symbol, and owner
    constructor() {
        tknName = "Sarah Token";
        tknSymbol = "SAH";
        owner = msg.sender;
    }

    // this modifier allows only the owner to execute a function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function!");
        _;
    }

    // this function allows only the owner of the contract to mint new tokens
    function mint(address _recipient, uint256 _amount) public onlyOwner {
        // increase the total supply
        totalSupply += _amount;
        // increase the balance of the specified address
        balance[_recipient] += _amount;
    }

    // this function allows anyone to burn their own tokens
    function burn(uint256 _amount) public {
        // require that the sender has enough tokens to burn
        require(balance[msg.sender] >= _amount, "Insufficient balance");
        // subtract the burn amount from the total supply
        totalSupply -= _amount;
        // subtract the burn amount from the sender's balance
        balance[msg.sender] -= _amount;
    }

    // this allows anyone to transfer tokens to another address
    function transfer(address _recipient, uint256 _amount) public {
        // require that the sender is not the recipient
        require(msg.sender != _recipient,"You cannot transfer to yourself!");
        // require that the sender has enough tokens to transfer
        require(balance[msg.sender] >= _amount, " Amount to transfer is greater than balance");
        // subtract the transfer amount from the sender's balance
        balance[msg.sender] -= _amount;
        // add the transfer amount to the recipient's balance
        balance[_recipient] += _amount;
    }
}
