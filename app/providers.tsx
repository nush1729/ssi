'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useMemo } from 'react'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  // Memoize config to prevent reinitializing WalletConnect on every render
  const config = useMemo(() => getDefaultConfig({
    appName: 'NeuralHash',
    projectId: 'demo',
    chains: [sepolia],
    ssr: false,
  }), [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
