import Link from 'next/link'

export function ViewToggle({
  active,
  className = '',
}: {
  active: 'issuer' | 'verifier'
  className?: string
}) {
  return (
    <div className={`inline-flex rounded-2xl border border-blue-500/30 bg-slate-900/50 p-1 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 ${className}`}>
      <Link
        href="/"
        className={`rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 ${
          active === 'issuer'
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
            : 'text-slate-300 hover:text-white hover:bg-blue-500/10'
        }`}
      >
        Issuer Dashboard
      </Link>
      <Link
        href="/verify"
        className={`rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 ${
          active === 'verifier'
            ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white'
            : 'text-slate-300 hover:text-white hover:bg-cyan-500/10'
        }`}
      >
        Verifier Portal
      </Link>
    </div>
  )
}
