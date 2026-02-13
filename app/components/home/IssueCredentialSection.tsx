export function IssueCredentialSection({
  name,
  type,
  year,
  loading,
  onNameChange,
  onTypeChange,
  onYearChange,
  onIssue,
}: {
  name: string
  type: string
  year: string
  loading: boolean
  onNameChange: (value: string) => void
  onTypeChange: (value: string) => void
  onYearChange: (value: string) => void
  onIssue: () => void
}) {
  return (
    <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 shadow-sm sm:p-6 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/20 animate-fade-in-up">
      <h3 className="text-lg font-semibold text-white">Issue Credential</h3>
      <p className="mt-1 text-sm text-slate-300">
        Create a new verifiable credential and anchor it with IPFS + blockchain hash.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm group">
          <span className="font-medium text-slate-200">Name</span>
          <input
            className="w-full rounded-xl border border-blue-500/30 bg-slate-800/50 px-3 py-2 text-white placeholder-slate-500 outline-none ring-blue-500 transition duration-200 focus:ring-2 focus:border-blue-400 hover:border-blue-400 group-hover:bg-slate-800"
            placeholder="Alice Doe"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </label>

        <label className="space-y-2 text-sm group">
          <span className="font-medium text-slate-200">Type</span>
          <input
            className="w-full rounded-xl border border-blue-500/30 bg-slate-800/50 px-3 py-2 text-white placeholder-slate-500 outline-none ring-blue-500 transition duration-200 focus:ring-2 focus:border-blue-400 hover:border-blue-400 group-hover:bg-slate-800"
            placeholder="Refugee ID / Degree / License"
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
          />
        </label>

        <label className="space-y-2 text-sm group">
          <span className="font-medium text-slate-200">Year</span>
          <input
            className="w-full rounded-xl border border-blue-500/30 bg-slate-800/50 px-3 py-2 text-white placeholder-slate-500 outline-none ring-blue-500 transition duration-200 focus:ring-2 focus:border-blue-400 hover:border-blue-400 group-hover:bg-slate-800"
            placeholder="2026"
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
          />
        </label>
      </div>

      <button
        className="mt-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:from-blue-600 disabled:hover:to-blue-500"
        onClick={onIssue}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Issue Credential'}
      </button>
    </section>
  )
}
