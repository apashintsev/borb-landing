import { useEffect, useCallback } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useAppDispatch, useAppSelector } from "./redux";
import { Web3ProviderState, web3Slice } from "../store/reducers/web3Slice";
import { toast } from "react-toastify";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    },
  },
};

let web3Modal: Web3Modal | null;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    //network: "mainnet", // optional
    //cacheProvider: true,
    providerOptions, // required
  });
}

export const useWeb3 = () => {
  const { provider, web3Provider, address, network } = useAppSelector(
    (store) => store.web3Reducer
  );

  const { setWeb3Provider, setAddress, resetWeb3Provider } =
    web3Slice.actions;
  const dispatch = useAppDispatch();

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: ethers.utils.hexStripZeros(
                ethers.utils.hexlify(
                  Number.parseInt(process.env.REACT_APP_CHAIN_ID!)
                )
              ),
            },
          ],
        });

        const provider = await web3Modal.connect();

        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        //check network

        toast.success("Connected to Web3");
        dispatch(setWeb3Provider({ provider, web3Provider, address, network }));
      } catch (e) {
        console.log("connect error", e);
      }
    } else {
      console.error("No Web3Modal");
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      toast.error("Disconnected from Web3");
      dispatch(resetWeb3Provider());
    } else {
      console.error("No Web3Modal");
    }
  }, [provider]);

  // Auto connect to the cached provider
  /*useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);*/

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        toast.info("Changed Web3 Account");
        dispatch(setAddress({ address: accounts[0] }));
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId: string) => {
        if (typeof window !== "undefined") {
          console.log("switched to chain...", _hexChainId);
          //toast.info("Web3 Network Changed");
          window.location.reload();
        } else {
          console.log("window is undefined");
        }
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return {
    provider,
    web3Provider,
    address,
    network,
    connect,
    disconnect,
  } as Web3ProviderState;
};
