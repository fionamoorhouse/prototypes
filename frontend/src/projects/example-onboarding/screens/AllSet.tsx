import { usePrototype } from '@/hooks/usePrototype'
import { Button } from '@/components/ui/button'

export default function AllSet() {
  const { goTo } = usePrototype()

  return (
    <div className="flex flex-col flex-1 px-6 pt-14 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">You're all set!</h1>
        <p className="text-gray-500 mt-3 leading-relaxed max-w-[280px]">
          Your account has been created. You're ready to start exploring.
        </p>
      </div>

      <div className="pb-2">
        <Button onClick={() => goTo('Welcome')} className="w-full" size="lg">
          Go to Home
        </Button>
      </div>
    </div>
  )
}
