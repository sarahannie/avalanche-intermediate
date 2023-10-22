const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DegenToken", function () {
  let owner;
  let user;
  let token;
  const initialSupply = 1000000;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const DegenToken = await ethers.getContractFactory("DegenToken");
    token = await DegenToken.deploy();
    await token.deployed();

    // Mint initial supply to the owner for testing
    await token.mint(owner.address, initialSupply);
  });

  it("Should deploy with the correct name and symbol", async function () {
    const name = await token.name();
    const symbol = await token.symbol();

    expect(name).to.equal("Degen");
    expect(symbol).to.equal("DGN");
  });

  it("Should allow the owner to mint tokens", async function () {
    const amount = 1000;
    await token.connect(owner).mint(user.address, amount);
    const userBalance = await token.balanceOf(user.address);

    expect(userBalance).to.equal(amount);
  });

  it("Should allow the owner to set and get redemption rates", async function () {
    const itemId = 1;
    const rate = 100;

    await token.connect(owner).setRedemptionRate(itemId, rate);
    const retrievedRate = await token.getRedemptionRate(itemId);

    expect(retrievedRate).to.equal(rate);
  });

  it("Should allow a user to redeem tokens for a specific item", async function () {
    const itemId = 1;
    const rate = 100;
    const amountToRedeem = 10;
    const tokensRequired = rate * amountToRedeem;

    await token.connect(owner).setRedemptionRate(itemId, rate);

    // User buys tokens
    await token.transfer(user.address, tokensRequired);

    const initialUserBalance = await token.balanceOf(user.address);
    await token.connect(user).redeem(amountToRedeem, itemId);
    const finalUserBalance = await token.balanceOf(user.address);

    expect(finalUserBalance).to.equal(initialUserBalance - tokensRequired);
  });

  it("Should not allow redemption for an invalid item ID", async function () {
    const invalidItemId = 99;
    const amountToRedeem = 10;

    await expect(token.connect(user).redeem(amountToRedeem, invalidItemId)).to.be.revertedWith("Invalid item ID");
  });

  it("Should not allow redemption with insufficient balance", async function () {
    const itemId = 1;
    const rate = 100;
    const amountToRedeem = 10;

    await token.connect(owner).setRedemptionRate(itemId, rate);

    await expect(token.connect(user).redeem(amountToRedeem, itemId)).to.be.revertedWith("Insufficient balance");
  });
});
