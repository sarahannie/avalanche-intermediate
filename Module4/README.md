
# DegenToken Smart Contract

This is a Solidity contract pertaining to the DegenToken, an ERC20 token that has been deployed onto the Avalanche network. This contract expands upon the capabilities of the OpenZeppelin `ERC20` and `Ownable` contracts, furnishing a range of functionalities including token minting, transferring, redeeming, burning, as well as the ability to verify token balances.

## Prerequisites

- Solidity Compiler (version ^0.8.18 recommended)
- Remix for testing
- Hardhat for deployment and verification

## Contract Details

- Contract Name: DegenToken
- Symbol: DGN

## Features

- Minting new tokens by the contract owner.
- Transferring tokens between accounts with an event emission.
- Redeeming tokens based on user input, with randomized item redemptions.
- Getting balance of user to know the amount of token the user has.
- Burning (destroying) tokens by the token owner.
- Event emission for token transfers, redemptions, and burns.
  
## Usage

### Deployment and Verification on Snowtrace

1. To use the project, downdload the code or clone the repository, run the following command:
   - `npm install`.

2. Deploy the contract to Avalanche Fuji network by running the following command:
   - `npx hardhat run scripts/deploy.js --network fuji`

3. To verify the smart contract, run the following command:
   - `npx hardhat verify 'your-contract-address' --network fuji`

### Testing on Remix

1. Deploy the `DegenToken` contract to the Ethereum network.

2. Use a wallet to interact with the contract's functions:
   - Mint new tokens using the `mint` function, accessible only by the owner.
   - Transfer tokens using the standard ERC20 `transfer` function.
   - Redeem tokens using the `redeemTokens` function with a specified amount.
   - Get balance of user by calling the `getBalance` function.
   - Burn tokens using the `burn` function, accessible by token holders.

3. Explore the emitted events to track transfers, redemptions, and burns.

## Authors

[Sarah](https://github.com/sarahannie/)

## License

This project is licensed under the MIT License. For details, see the [LICENSE](LICENSE) file.
