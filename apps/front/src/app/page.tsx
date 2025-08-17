import { ModeToggle } from '@/components/shared/mode-toggle'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'

export default function Home() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tight">
            Mohamed Tahiri
          </CardTitle>
          <CardDescription className="flex flex-col items-center gap-2 text-lg">
            Work in progress...
            <ModeToggle />
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
