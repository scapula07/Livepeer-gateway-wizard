declare const window:any
import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import {  toast } from 'react-toastify';
import { useCallback, useEffect, useState } from "react";

export interface IWeb3State {
  address: string | null;
  currentChain: number | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  isAuthenticated: boolean;
}

const useWeb3Provider = () => {
  const initialWeb3State = {
    address: null,
    currentChain: null,
    signer: null,
    provider: null,
    isAuthenticated: false,
  };


  const [walletState, setState] = useState<IWeb3State>(initialWeb3State);

  const connectWallet = useCallback(async () => {
    if (walletState.isAuthenticated) return;

    try {
      const { ethereum } = window;

      if (!ethereum) {
        return toast('No ethereum wallet found', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          
      }
      const provider = new BrowserProvider(ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
  
      setState({
        address: accounts[0],
        currentChain: Number(network.chainId),
        signer,
        provider,
        isAuthenticated: true,
      });
  



      // if (accounts.length > 0) {
      //   const signer = await provider.getSigner();
      //   const chain = Number(await (await provider.getNetwork()).chainId);

      //   setState({
      //     ...state,
      //     address: accounts[0],
      //     signer,
      //     currentChain: chain,
      //     provider,
      //     isAuthenticated: true,
      //   });

      //   localStorage.setItem("isAuthenticated", "true");
      // }
    } catch {}
  }, [walletState, toast]);

  const disconnect = () => {
    setState(initialWeb3State);
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    if (window == null) return;

    if (localStorage.hasOwnProperty("isAuthenticated")) {
      connectWallet();
    }
  }, [connectWallet, walletState.isAuthenticated]);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") return;

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      setState({ ...walletState, address: accounts[0] });
    });

    window.ethereum.on("networkChanged", (network: string) => {
      setState({ ...walletState, currentChain: Number(network) });
    });

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, [walletState]);

  return {
    connectWallet,
    disconnect,
    walletState,
  };
};

export default useWeb3Provider;