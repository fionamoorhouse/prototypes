import { usePrototype } from '@/hooks/usePrototype'
import { Button } from '@/components/ui/button'

export default function CreateAccount() {
  const { goTo } = usePrototype()

  return (
    <div className="flex flex-col flex-1 px-6 pt-14 pb-10">
      <div className="pt-2">
        <button
          onClick={() => goTo('Welcome')}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="pt-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create your account
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Enter your details to get started.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full name
          </label>
          <input
            type="text"
            placeholder="Jane Smith"
            className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="jane@example.com"
            className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="At least 8 characters"
            className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-auto pb-2">
        <Button onClick={() => goTo('AllSet')} className="w-full" size="lg">
          Create Account
        </Button>
        <p className="text-xs text-gray-400 text-center mt-3">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
