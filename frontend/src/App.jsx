import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants";
import { isPolygonMumbai, toWei } from "./utils";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  const [loader, setLoader] = useState(false);

  const [provider, setProvider] = useState("");
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethersProvider);

      // set up event listener for account change
      window.ethereum.on("accountsChanged", (accounts) => {
        if (!accounts[0]) {
          setIsConnected(false);
        }

        setAccount(accounts[0]);
      });

      // set up event listener for network change
      window.ethereum.on("chainChanged", async () => {
        setNetwork(window.ethereum.networkVersion);
      });
    }
  }, []);

  const handleConnectMetamask = async () => {
    try {
      if (!window.ethereum) {
        setIsConnected(false);
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await ethereum.request({ method: "eth_accounts" });
      setAccount(accounts[0]);

      setNetwork(window.ethereum.networkVersion);

      // initialize contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI);
      setContract(contract);

      setIsConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMint = async () => {
    try {
      if (!provider && !contract && !isPolygonMumbai(network) && !account) {
        alert("Please connect to Polygon Mumbai Network!");
        return;
      }

      const signer = await provider.getSigner();

      setLoader(true);

      const response = await contract
        .connect(signer)
        .mint(account, toWei("10"));
      await response.wait();

      console.log("txHash: ", response.hash);

      setLoader(false);

      alert("10 BTKNs minted to your address!");

      return;
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <h1>Connected to Metamask</h1>
          <p>Account: {account}</p>
          <p>Network: {network}</p>

          {isPolygonMumbai(network) ? (
            <div>
              {!loader ? (
                <button onClick={handleMint}>Mint</button>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ) : (
            <p>Please connect to Polygon Mumbai Network!</p>
          )}
        </div>
      ) : (
        <button onClick={handleConnectMetamask}>Connect to Metamask</button>
      )}
    </div>
  );
};

export default App;
