"use client";

import { useWallet } from "@solana/wallet-adapter-react";

function getNetworkLabel(): "Devnet" | "Testnet" | "Mainnet" {
  const raw = (process.env.NEXT_PUBLIC_SOLANA_NETWORK ?? "devnet").toLowerCase();

  if (raw === "mainnet" || raw === "mainnet-beta") {
    return "Mainnet";
  }

  if (raw === "testnet") {
    return "Testnet";
  }

  return "Devnet";
}

export function useWalletConnection() {
  const { connected, connecting, disconnect, connect, publicKey, wallet } = useWallet();

  return {
    connected,
    connecting,
    disconnected: !connected,
    connect,
    disconnect,
    publicKey: publicKey?.toBase58() ?? null,
    walletName: wallet?.adapter.name ?? null,
    networkLabel: getNetworkLabel(),
  };
}
