'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useMemo, useState, useEffect } from 'react'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Memoize config to prevent reinitializing WalletConnect on every render
  const config = useMemo(() => {
    if (typeof window === 'undefined') return null
    return getDefaultConfig({
      appName: 'NeuralHash',
      projectId: 'demo',
      chains: [sepolia],
      ssr: false,
    })
  }, [])

  // Only render providers after mounting on client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !config) {
    return <>{children}</>
  }

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
