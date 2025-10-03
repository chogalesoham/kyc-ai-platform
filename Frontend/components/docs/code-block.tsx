"use client"

import React, { useEffect, useRef } from "react"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-css"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface CodeBlockProps {
  children: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  className?: string
}

export default function CodeBlock({
  children,
  language = "javascript",
  title,
  showLineNumbers = false,
  className = "",
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [children, language])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const lines = children.split("\n")

  return (
    <div className={`relative group ${className}`}>
      {title && (
        <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-t-lg border border-b-0">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
      
      <div className="relative">
        {!title && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
        
        <pre className={`${title ? "rounded-t-none" : "rounded-lg"} bg-gray-900 dark:bg-gray-950 overflow-x-auto p-4 text-sm`}>
          {showLineNumbers && (
            <div className="select-none float-left pr-4 text-gray-500 text-right">
              {lines.map((_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>
          )}
          <code
            ref={codeRef}
            className={`language-${language} text-gray-100`}
            style={{ background: "transparent" }}
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  )
}

// Specialized components for specific languages
export function JavaScriptCode({ children, title, ...props }: Omit<CodeBlockProps, "language">) {
  return <CodeBlock language="javascript" title={title} {...props}>{children}</CodeBlock>
}

export function TypeScriptCode({ children, title, ...props }: Omit<CodeBlockProps, "language">) {
  return <CodeBlock language="typescript" title={title} {...props}>{children}</CodeBlock>
}

export function BashCode({ children, title, ...props }: Omit<CodeBlockProps, "language">) {
  return <CodeBlock language="bash" title={title} {...props}>{children}</CodeBlock>
}

export function JSONCode({ children, title, ...props }: Omit<CodeBlockProps, "language">) {
  return <CodeBlock language="json" title={title} {...props}>{children}</CodeBlock>
}

export function HTMLCode({ children, title, ...props }: Omit<CodeBlockProps, "language">) {
  return <CodeBlock language="markup" title={title} {...props}>{children}</CodeBlock>
}

export function CSSCode({ children, title, ...props }: Omit<CodeBlockProps, "language">) {
  return <CodeBlock language="css" title={title} {...props}>{children}</CodeBlock>
}