'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface RoleSelectorProps {
  isOpen: boolean
  onSelect: (role: 'user' | 'issuer') => void
}

export function RoleSelector({ isOpen, onSelect }: RoleSelectorProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isOpen) return null

  const handleRoleSelect = (role: 'user' | 'issuer') => {
    onSelect(role)
    if (role === 'user') {
      router.push('/user/dashboard')
    } else {
      router.push('/issuer/dashboard')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-scale">
      <div className="w-full max-w-md rounded-2xl border border-blue-500/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white mb-2">NeuralHash</h1>
          <p className="text-sm font-medium text-blue-400">Choose Your Role</p>
          <p className="mt-3 text-sm text-slate-400">
            Select whether you want to issue credentials or verify them
          </p>
        </div>

        {/* Role Options */}
        <div className="space-y-4">
          {/* Issuer Option */}
          <button
            onClick={() => handleRoleSelect('issuer')}
            className="group w-full rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-blue-800/20 p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 group-hover:bg-blue-500/40 transition-colors">
                <svg
                  className="h-6 w-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Issuer</h3>
                <p className="text-xs text-slate-400">Create & manage credentials</p>
              </div>
            </div>
          </button>

          {/* User/Verifier Option */}
          <button
            onClick={() => handleRoleSelect('user')}
            className="group w-full rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-cyan-800/20 p-6 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/40 transition-colors">
                <svg
                  className="h-6 w-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Verifier</h3>
                <p className="text-xs text-slate-400">Verify credentials with QR codes</p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          You can switch roles at any time
        </p>
      </div>
    </div>
  )
}
