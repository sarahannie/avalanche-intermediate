// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SarahToken is ERC20{

    // public variables
    address public owner;

    //  set the token name, symbol, and owner
    constructor() ERC20("Sarah Token", "SAH"){        
        owner = msg.sender;
    }

    // this modifier allows only the owner to execute a function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function!");
        _;
    }

    // this function allows only the owner of the contract to mint new tokens
    function mint(address _recipient, uint256 _amount) public onlyOwner {
        // increase the balance of the specified address
        _mint(_recipient, _amount);
    }

    // this function allows anyone to burn their own tokens
    function burn(uint256 _amount) public {
        // require that the sender has enough tokens to burn
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        // subtract the burn amount from the sender's balance        
        _burn(msg.sender, _amount);
    }

    // this allows anyone to transfer tokens to another address
    function transfer(address _recipient, uint256 _amount) public override returns (bool) {
        // require that the sender is not the recipient
        require(msg.sender != _recipient,"You cannot transfer to yourself!");
        // require that the sender has enough tokens to transfer
        require(balanceOf(msg.sender) >= _amount, " Amount to transfer is greater than balance");
        // transfer to recipient account
        _transfer(_msgSender(), _recipient, _amount);
        return true;
    }
}
