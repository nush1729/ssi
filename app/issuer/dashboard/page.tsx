'use client'

import { useEffect, useState } from 'react'
import { useAccount, useContractWrite, useContractRead } from 'wagmi'
import { DashboardHeader } from '@/app/components/home/DashboardHeader'
import { IssueCredentialSection } from '@/app/components/home/IssueCredentialSection'
import { CredentialsSection } from '@/app/components/home/CredentialsSection'
import { ConnectWalletPrompt } from '@/app/components/home/ConnectWalletPrompt'
import { ViewToggle } from '@/app/components/home/ViewToggle'
import type { Credential } from '@/app/types'

const CONTRACT_ADDRESS = '0x123...' as `0x${string}`

export default function IssuerDashboard() {
  const { address } = useAccount()
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [year, setYear] = useState('')

  const activeCredentials = credentials.filter((c) => c.isValid).length
  const revokedCredentials = credentials.filter((c) => !c.isValid).length

  const handleIssue = async () => {
    if (!address || !name || !type || !year) return
    setLoading(true)
    try {
      // TODO: Implement credential issuance
      console.log('Issuing credential:', { name, type, year })
    } finally {
      setLoading(false)
    }
  }

  const handleRevoke = async (credentialHash: `0x${string}`) => {
    setLoading(true)
    try {
      // TODO: Implement credential revocation
      console.log('Revoking credential:', credentialHash)
    } finally {
      setLoading(false)
    }
  }

  if (!address) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <main className="space-y-6">
            <div className="flex justify-start animate-fade-in-up">
              <ViewToggle active="issuer" />
            </div>
            <div className="animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
              <ConnectWalletPrompt />
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <main className="space-y-6">
          <div className="flex justify-between items-center animate-fade-in-up">
            <h1 className="text-3xl font-black">Issuer Dashboard</h1>
            <ViewToggle active="issuer" />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <DashboardHeader />
          </div>

          <div
            className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 animate-fade-in-scale"
            style={{ animationDelay: '0.2s' }}
          >
            <p className="text-sm text-blue-300">
              Connected with{' '}
              <span className="font-semibold text-cyan-300">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </p>
          </div>

          <div className="stagger-children">
            <IssueCredentialSection
              name={name}
              type={type}
              year={year}
              loading={loading}
              onNameChange={setName}
              onTypeChange={setType}
              onYearChange={setYear}
              onIssue={handleIssue}
            />
          </div>

          <div className="stagger-children">
            <CredentialsSection
              credentials={credentials}
              address={address}
              loading={loading}
              onRevoke={handleRevoke}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
