// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Functions {

    // subtract 'num2' from 'num1' with a require statement
    function requireFunction(uint num1, uint num2) public pure returns (uint) {
        // Ensure that 'num2' is not zero to avoid substraction by zero
        require(num2 != 0, "Cannot subtract by zero");

        // Perform the subtraction and return the result
        return num1 - num2;
    }

    // function demonstrating the use of assert statement
    function assertFunction() public pure {
        uint result = requireFunction(20, 10);

        // Assert that the result is equal to 15, which will cause the transaction to fail
        assert(result == 15);
    }

    // function demonstrating the use of revert statement
    function revertFunction() public pure {
        uint result = requireFunction(20, 10);

        // Revert the transaction if the result is equal to 10
        if (result == 10) {
            revert("Reverting due to result being 10");
        }
    }
}