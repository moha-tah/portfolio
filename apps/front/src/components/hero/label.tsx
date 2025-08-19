import { Button } from '@/components/ui/button'

export function Label() {
  return (
    <div>
      <Button variant="secondary" size="sm" className="gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          Ouvert aux propositions
        </div>
      </Button>
    </div>
  )
}
