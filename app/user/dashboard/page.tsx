'use client'

import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import { ViewToggle } from '@/app/components/home/ViewToggle'
import { ConnectWalletPrompt } from '@/app/components/home/ConnectWalletPrompt'

interface VerificationResult {
  id: string
  issuer: string
  credentialType: string
  status: 'verified' | 'pending' | 'invalid'
  issuedAt: string
  name: string
}

export default function UserDashboard() {
  const { address } = useAccount()
  const [verifications, setVerifications] = useState<VerificationResult[]>([])
  const [qrScanInput, setQrScanInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleQRScan = async () => {
    if (!qrScanInput.trim()) return
    
    setLoading(true)
    try {
      // TODO: Parse QR code and verify credential
      console.log('Verifying credential:', qrScanInput)
    } finally {
      setLoading(false)
      setQrScanInput('')
    }
  }

  if (!address) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <main className="space-y-6">
            <div className="flex justify-start animate-fade-in-up">
              <ViewToggle active="verifier" />
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
            <h1 className="text-3xl font-black">Verify Credentials</h1>
            <ViewToggle active="verifier" />
          </div>

          {/* Connected Status */}
          <div
            className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 p-6 animate-fade-in-scale"
            style={{ animationDelay: '0.1s' }}
          >
            <p className="text-sm text-cyan-300">
              Connected with{' '}
              <span className="font-semibold text-cyan-200">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </p>
          </div>

          {/* QR Scanner Section */}
          <div
            className="rounded-2xl border border-cyan-500/20 bg-slate-800/50 p-6 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <h2 className="text-lg font-semibold mb-4">Scan QR Code</h2>
            <p className="text-sm text-slate-400 mb-4">
              Scan a credential QR code to verify its authenticity
            </p>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Paste QR code data or credential hash here..."
                  value={qrScanInput}
                  onChange={(e) => setQrScanInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleQRScan()}
                  className="w-full rounded-xl border border-cyan-500/30 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 outline-none transition duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              <button
                onClick={handleQRScan}
                disabled={loading || !qrScanInput.trim()}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {loading ? 'Verifying...' : 'Verify Credential'}
              </button>
            </div>
          </div>

          {/* Verification History */}
          <div className="rounded-2xl border border-blue-500/20 bg-slate-800/50 p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-lg font-semibold mb-4">Verification History</h2>

            {verifications.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p className="text-sm">No verifications yet</p>
                <p className="text-xs mt-1">Scan your first QR code to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {verifications.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-900/30 p-4 hover:border-slate-600 transition-all"
                  >
                    <div>
                      <p className="font-medium text-white">{v.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{v.credentialType}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          v.status === 'verified'
                            ? 'bg-green-500/20 text-green-300'
                            : v.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
