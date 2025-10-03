import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FaceMatch() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Face Match Preview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <div className="aspect-square rounded-xl bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
          {"ID Photo Placeholder"}
        </div>
        <div className="aspect-square rounded-xl bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
          {"Live Selfie Placeholder (webcam)"}
        </div>
      </CardContent>
    </Card>
  )
}
