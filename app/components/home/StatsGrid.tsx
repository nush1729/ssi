function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: string
}) {
  return (
    <div className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 cursor-default ${accent}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
    </div>
  )
}

export function StatsGrid({
  walletConnected,
  totalCredentials,
  activeCredentials,
  revokedCredentials,
}: {
  walletConnected: boolean
  totalCredentials: number
  activeCredentials: number
  revokedCredentials: number
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Wallet"
        value={walletConnected ? 'Connected' : 'Disconnected'}
        accent="border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/10"
      />
      <StatCard
        label="Total Credentials"
        value={String(totalCredentials)}
        accent="border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10"
      />
      <StatCard
        label="Active"
        value={String(activeCredentials)}
        accent="border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/10"
      />
      <StatCard
        label="Revoked"
        value={String(revokedCredentials)}
        accent="border-red-500/30 bg-gradient-to-br from-red-500/20 to-red-600/10"
      />
    </div>
  )
}
