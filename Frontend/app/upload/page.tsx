import UploadCard from "@/components/kyc/upload-card"
import FaceMatch from "@/components/kyc/face-match"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl md:text-4xl font-heading text-pretty">Upload your document</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <UploadCard />
          <FaceMatch />
        </div>
      </div>
    </ProtectedRoute>
  )
}
