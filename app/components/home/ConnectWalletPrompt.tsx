export function ConnectWalletPrompt() {
  return (
    <div className="rounded-2xl border border-dashed border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-8 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 animate-fade-in-scale">
      <h3 className="text-lg font-semibold text-white">Connect wallet to continue</h3>
      <p className="mt-2 text-sm text-slate-300">
        Once connected, you can issue and revoke credentials exactly as before.
      </p>
    </div>
  )
}
