'use client'

import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { readContract } from 'wagmi/actions'
import { useConfig } from 'wagmi'
import { keccak256, stringToBytes } from 'viem'
import { useSearchParams } from 'next/navigation'
import { contractConfig } from '../contract'
import { ViewToggle } from '../components/home/ViewToggle'

type Credential = {
  ipfsCID: string
  issuer: `0x${string}`
  isValid: boolean
  issuedAt: bigint
  credentialHash: `0x${string}`
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 p-6 text-slate-300">
          Loading verifier portal...
        </div>
      }
    >
      <VerifyPageContent />
    </Suspense>
  )
}

function VerifyPageContent() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [config, setConfig] = useState<any>(null)

  const userParam = searchParams.get('user')
  const hashParam = searchParams.get('hash')

  const [disclosedData, setDisclosedData] = useState<any>(null)
  const [inputAddress, setInputAddress] = useState('')
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [verificationResult, setVerificationResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Initialize config on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wagmiConfig = useConfig()
      setConfig(wagmiConfig)
      setMounted(true)
    }
  }, [])

  // ---------------- AUTO FILL ADDRESS ----------------
  useEffect(() => {
    if (userParam) {
      setInputAddress(userParam)
    }
  }, [userParam])

  // ---------------- FETCH CREDENTIALS ----------------
  async function fetchCredentials(addressToFetch?: string) {
    const address = addressToFetch || inputAddress
    if (!address) return

    try {
      setLoading(true)
      setDisclosedData(null)
      setVerificationResult(null)

      const data = await readContract(config, {
        ...contractConfig,
        functionName: 'getUserCredentials',
        args: [address as `0x${string}`],
      })

      const creds = data as Credential[]
      setCredentials(creds)

      // 🔥 AUTO VERIFY IF HASH PROVIDED
      if (hashParam) {
        const index = creds.findIndex(
          (cred) => cred.credentialHash === hashParam
        )

        if (index !== -1) {
          await verifyCredential(index, creds)
        }
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ---------------- AUTO FETCH ----------------
  useEffect(() => {
    if (inputAddress && mounted && config) {
      fetchCredentials(inputAddress)
    }
  }, [inputAddress, mounted, config])

  // ---------------- VERIFY ----------------
  async function verifyCredential(
    index: number,
    credsOverride?: any[]
  ) {
    const creds = credsOverride || credentials
    const cred = creds[index]

    if (!cred.isValid) {
      setVerificationResult('❌ Credential Revoked')
      return
    }

    try {
      const res = await fetch(
        `https://gateway.pinata.cloud/ipfs/${cred.ipfsCID}`
      )

      const json = await res.json()

      const recomputedHash = keccak256(
        stringToBytes(JSON.stringify(json))
      )

      if (recomputedHash === cred.credentialHash) {
        setVerificationResult('✅ Credential Verified (Authentic)')
      } else {
        setVerificationResult('❌ Credential Tampered')
      }

    } catch (err) {
      console.error(err)
      setVerificationResult('❌ Failed to fetch IPFS document')
    }
  }

  // ---------------- SELECTIVE DISCLOSURE ----------------
  async function selectiveDisclosure(index: number) {
    const cred = credentials[index]

    try {
      const res = await fetch(
        `https://gateway.pinata.cloud/ipfs/${cred.ipfsCID}`
      )

      const json = await res.json()

      setDisclosedData({
        type: json.type,
        year: json.year,
      })

    } catch (err) {
      console.error(err)
    }
  }

  // ---------------- UI ----------------
  if (!mounted || !config) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 p-6 text-slate-300">
        Loading verifier portal...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <main className="space-y-6">
          <div className="flex justify-start">
            <ViewToggle active="verifier" />
          </div>

          <section className="paper-grid relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg sm:p-8">
            <div className="max-w-2xl">
              <p className="inline-block rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                NeuralHash Verifier Space
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
                verify with confidence
                <span className="block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-2 text-white">without revealing everything</span>
              </h2>
              <p className="mt-4 text-sm text-slate-300 sm:text-base">
                Check authenticity and selectively disclose only the data you need.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Public Credential Verification
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Lookup wallet credentials, verify integrity, and perform selective disclosure.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                className="w-full rounded-xl border border-blue-500/30 bg-slate-800/50 px-3 py-2 text-white placeholder-slate-500 outline-none ring-blue-500 transition focus:ring-2 focus:border-blue-400"
                placeholder="Enter Wallet Address"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
              />

              <button
                className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => fetchCredentials()}
                disabled={loading || !config}
              >
                {loading ? 'Fetching...' : 'Fetch Credentials'}
              </button>
            </div>
          </section>

          {verificationResult && (
            <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 shadow-sm sm:p-6">
              <p className="text-lg font-semibold text-white">Verification Result</p>
              <p className="mt-2 text-sm text-slate-300">{verificationResult}</p>
            </section>
          )}

          {disclosedData && (
            <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 shadow-sm sm:p-6">
              <h3 className="text-lg font-semibold text-white">Selectively Disclosed Information</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-500/20 bg-slate-900/50 p-3 text-sm text-slate-300">
                  <span className="font-semibold text-white">Type:</span> {disclosedData.type}
                </div>
                <div className="rounded-xl border border-blue-500/20 bg-slate-900/50 p-3 text-sm text-slate-300">
                  <span className="font-semibold text-white">Year:</span> {disclosedData.year}
                </div>
              </div>
            </section>
          )}

          <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 shadow-sm sm:p-6">
            <h3 className="text-lg font-semibold text-white">Credential Records</h3>
            <p className="mt-1 text-sm text-slate-300">Verify cryptographic integrity before accepting any claim.</p>

            {credentials.length === 0 && !loading && (
              <div className="mt-5 rounded-xl border border-dashed border-blue-500/30 bg-blue-500/5 p-6 text-sm text-slate-400">
                No credentials found.
              </div>
            )}

            <div className="mt-5 space-y-4">
              {credentials.map((cred, index) => (
                <article key={index} className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20">
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <span className="font-semibold text-white">IPFS CID:</span>{' '}
                      <span className="break-all text-blue-400">{cred.ipfsCID}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Issuer:</span> <span className="break-all text-slate-300">{cred.issuer}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-white">Status:</span>{' '}
                      <span className={cred.isValid ? 'font-semibold text-green-400' : 'font-semibold text-red-400'}>
                        {cred.isValid ? 'Active' : 'Revoked'}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/30"
                      onClick={() => verifyCredential(index)}
                    >
                      Verify Integrity
                    </button>

                    <button
                      className="rounded-xl bg-gradient-to-r from-green-600 to-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-green-500 hover:to-green-400 hover:shadow-lg hover:shadow-green-500/30"
                      onClick={() => selectiveDisclosure(index)}
                    >
                      Selective Disclosure
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
