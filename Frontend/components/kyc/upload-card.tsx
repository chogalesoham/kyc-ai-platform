"use client"

import type React from "react"

import { useCallback, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function UploadCard() {
  const [file, setFile] = useState<File | null>(null)
  const [drag, setDrag] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  const startProcess = () => {
    // Simulate upload + AI processing
    setProgress(0)
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id)
          return 100
        }
        return p + 5
      })
    }, 120)
  }

  const extracted = useMemo(
    () => ({
      name: "Jane Doe",
      dob: "1992-06-12",
      address: "221B Baker Street, London",
      idno: "ABCD1234567",
    }),
    [],
  )

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Drag & Drop Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDrag(true)
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          className="rounded-2xl border-2 border-dashed border-border/60 p-6 text-center transition-colors"
          style={{ borderColor: drag ? "var(--brand-primary)" : undefined }}
        >
          <p className="text-sm text-muted-foreground">Drop a PDF or image here</p>
          <div className="mt-3">
            <input id="file" type="file" accept="image/*,application/pdf" onChange={onChange} className="hidden" />
            <label htmlFor="file" className="inline-flex">
              <Button variant="outline" className="rounded-2xl bg-transparent">
                Choose File
              </Button>
            </label>
          </div>
          {file && <div className="mt-3 text-sm">{file.name}</div>}
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">AI Processing</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <Button onClick={startProcess} className="rounded-2xl btn-gradient w-full">
            Submit for Validation
          </Button>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Extracted Preview</div>
          <div className="rounded-xl bg-muted/40 p-4 text-sm grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Name</div>
            <div>{extracted.name}</div>
            <div className="text-muted-foreground">DOB</div>
            <div>{extracted.dob}</div>
            <div className="text-muted-foreground">Address</div>
            <div>{extracted.address}</div>
            <div className="text-muted-foreground">ID No</div>
            <div>{extracted.idno}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
