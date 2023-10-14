import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { myTokenAddress } from "../contractAddress";
import MyToken from "../artifacts/contracts/Token.sol/MyToken.json";

export default function HomePage() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(null);
  const [tknName, setTknName] = useState(null);
  const [tknAbbrv, setTknAbbrv] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [mintValue, setMintValue] = useState("");
  const [burnValue, setBurnValue] = useState("");

  useEffect(() => {
    // Create a Web3Modal instance
    const web3Modal = new Web3Modal();

    // Connect to the user's Ethereum provider
    web3Modal.connect().then((provider) => {
      // Create an ethers.js provider using the Web3 provider
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      setProvider(ethersProvider);

      // Create an instance of the MyToken contract using the contract ABI and address
      const tokenContract = new ethers.Contract(
        myTokenAddress,
        MyToken.abi,
        ethersProvider.getSigner()
      );
      setContract(tokenContract);

      // Get the balance of the current user's Ethereum address
      ethersProvider
        .getSigner()
        .getAddress()
        .then((address) => {
          tokenContract.balances(address).then((balance) => {
            setBalance(balance.toNumber());
          });
        });

      // Get the total supply of the MyToken contract
      tokenContract.totalSupply().then((totalSupply) => {
        setTotalSupply(totalSupply.toNumber());
      });

      // Get the token name of the MyToken contract
      tokenContract.tknName().then((tknName) => {
        setTknName(tknName);
      });

      // Get the token name of the MyToken contract
      tokenContract.tknAbbrv().then((tknAbbrv) => {
        setTknAbbrv(tknAbbrv);
      });
    });
  }, []);

  // Function to mint new tokens and increase the balance of a specified address
  const mintTokens = async () => {
    // Make sure the address is valid
    const signer = await provider.getSigner();
    const to = await signer.getAddress();
    if (!ethers.utils.isAddress(to)) {
      console.error("Invalid address");
      alert("Invalid address");
      return;
    }

    // Mint new tokens
    try {
      const value = parseInt(mintValue);
      if (isNaN(value) || value <= 0) {
        console.error("Invalid mint value");
        alert("Invalid mint value");
        return;
      }

      const tx = await contract.mint(to, value);
      await tx.wait();
      setMintValue('');
      console.log(`Minted ${value} tokens to ${to}`);
      alert(`Minted ${value} tokens to ${to}`);
    } catch (error) {
      console.error(`Error: ${error}`);
      alert(`Error: ${error}`);
    }
  };

  // Function to burn tokens and decrease the balance of the contract creator
  const burnTokens = async () => {
    // Make sure the address is valid
    const signer = await provider.getSigner();
    const burnAddress = await signer.getAddress();
    if (!ethers.utils.isAddress(burnAddress)) {
      console.error("Invalid address");
      alert("Invalid address");
      return;
    }

    // Make sure the contract creator has sufficient balance
    const value = parseInt(burnValue);
    if (isNaN(value) || value <= 0) {
      console.error("Invalid burn value");
      alert("Invalid burn value");
      return;
    }

    if (balance < value) {
      console.error("Insufficient balance");
      alert("Insufficient balance");
      return;
    }

    // Burn tokens
    try {
      const tx = await contract.burn(burnAddress, value);
      await tx.wait();
      setBurnValue('');
      console.log(`Burned ${value} tokens`);
      alert(`Burned ${value} tokens`);
    } catch (error) {
      console.error(`Error: ${error}`);
      alert(`Error: ${error}`);
    }
  };

  return (
    <main>
      {provider && (
        <>
            <h1>{tknName}</h1>
            <h2>${tknAbbrv}</h2>
            <div>
              <p>Token Balance: {balance}</p>
              <p>Total Supply of Token: {totalSupply}</p>
              <div>
                <h2>Mint</h2>
                <input
                  type="number"
                  value={mintValue}
                  onChange={(e) => setMintValue(e.target.value)}
                  style={{ textAlign: 'center' }}
                />
                <button onClick={mintTokens}>Mint</button>
              </div>
              <div>
                <h2>Burn</h2>
                <input
                  type="number"
                  value={burnValue}
                  onChange={(e) => setBurnValue(e.target.value)}
                  style={{ textAlign: 'center' }}
                />
                <button onClick={burnTokens}>Burn</button>
              </div>
            </div>
        </>
      )}
    </main>
  )
}
