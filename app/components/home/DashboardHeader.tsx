import { ConnectButton } from '@rainbow-me/rainbowkit'

export function DashboardHeader() {
  return (
    <div className="paper-grid-soft rounded-3xl border border-blue-500/30 bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-4 shadow-sm sm:p-6 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="animate-fade-in-up">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Credential Dashboard
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Manage issuance, revocation, and verification QR flows.
          </p>
        </div>
        <div className="self-start sm:self-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <ConnectButton />
        </div>
      </div>
    </div>
  )
}
