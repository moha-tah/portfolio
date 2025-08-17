import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tight">
            Mohamed Tahiri
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Work in progress...
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
