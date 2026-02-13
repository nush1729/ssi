import { QRCodeCanvas } from 'qrcode.react'
import type { Credential } from './types'

function CredentialCard({
  credential,
  address,
  loading,
  onRevoke,
}: {
  credential: Credential
  address: `0x${string}`
  loading: boolean
  onRevoke: (credentialHash: `0x${string}`) => void
}) {
  return (
    <article className="grid gap-5 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 md:grid-cols-[1fr_auto] transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 hover:border-blue-400 animate-fade-in-up">
      <div className="space-y-2 text-sm text-slate-300">
        <p>
          <span className="font-semibold text-slate-100">IPFS CID:</span>{' '}
          <a
            href={`https://gateway.pinata.cloud/ipfs/${credential.ipfsCID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all font-medium text-blue-400 underline-offset-4 hover:underline transition-colors duration-200 hover:text-cyan-300"
          >
            {credential.ipfsCID}
          </a>
        </p>

        <p>
          <span className="font-semibold text-slate-100">Issuer:</span>{' '}
          <span className="break-all text-slate-300">{credential.issuer}</span>
        </p>

        <p>
          <span className="font-semibold text-slate-100">Status:</span>{' '}
          <span
            className={`font-semibold transition-colors duration-200 ${
              credential.isValid
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            {credential.isValid ? 'Active' : 'Revoked'}
          </span>
        </p>

        <p>
          <span className="font-semibold text-slate-100">Issued At:</span>{' '}
          <span className="text-slate-400">{new Date(Number(credential.issuedAt) * 1000).toLocaleString()}</span>
        </p>

        {credential.isValid && credential.issuer === address && (
          <button
            className="mt-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:from-red-500 hover:to-red-400 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:from-red-600 disabled:hover:to-red-500"
            onClick={() => onRevoke(credential.credentialHash)}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Revoke Credential'}
          </button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-blue-500/20 bg-slate-900/50 p-4 transition-all duration-300 hover:shadow-sm">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
          Scan to Verify
        </p>
        <QRCodeCanvas
          value={
            typeof window !== 'undefined'
              ? `${window.location.origin}/verify?user=${address}&hash=${credential.credentialHash}`
              : ''
          }
          size={140}
        />
      </div>
    </article>
  )
}

export function CredentialsSection({
  credentials,
  address,
  loading,
  onRevoke,
}: {
  credentials: Credential[]
  address: `0x${string}`
  loading: boolean
  onRevoke: (credentialHash: `0x${string}`) => void
}) {
  return (
    <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 shadow-sm sm:p-6 transition-all duration-300 animate-fade-in-up">
      <h3 className="text-lg font-semibold text-white">Issued Credentials</h3>
      <p className="mt-1 text-sm text-slate-300">
        Each card includes status, provenance, and shareable verification QR.
      </p>

      {credentials.length === 0 && (
        <div className="mt-5 rounded-xl border border-dashed border-blue-500/30 bg-blue-500/5 p-6 text-sm text-slate-400 animate-fade-in-scale">
          No credentials issued yet.
        </div>
      )}

      <div className="mt-5 space-y-4">
        {credentials.map((credential, index) => (
          <div key={index} style={{ animationDelay: `${index * 0.05}s` }}>
            <CredentialCard
              credential={credential}
              address={address}
              loading={loading}
              onRevoke={onRevoke}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
