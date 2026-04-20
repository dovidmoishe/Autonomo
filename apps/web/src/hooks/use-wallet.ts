"use client";

import { useWallet } from "@solana/wallet-adapter-react";

export function useWalletConnection() {
  const { connected, connecting, disconnect, connect, publicKey } = useWallet();

  return {
    connected,
    connecting,
    disconnected: !connected,
    connect,
    disconnect,
    publicKey: publicKey?.toBase58() ?? null,
  };
}