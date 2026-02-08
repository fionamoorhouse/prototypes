import { usePrototype } from '@/hooks/usePrototype'
import { Button } from '@/components/ui/button'

export default function Welcome() {
  const { goTo } = usePrototype()

  return (
    <div className="flex flex-col flex-1 px-6 pt-14 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-3xl">✦</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Acme</h1>
        <p className="text-gray-500 mt-3 leading-relaxed max-w-[280px]">
          The simplest way to manage your projects and collaborate with your
          team.
        </p>
      </div>

      <div className="pb-2 space-y-3">
        <Button
          onClick={() => goTo('CreateAccount')}
          className="w-full"
          size="lg"
        >
          Get Started
        </Button>
        <Button
          onClick={() => goTo('CreateAccount')}
          variant="ghost"
          className="w-full"
        >
          I already have an account
        </Button>
      </div>
    </div>
  )
}
