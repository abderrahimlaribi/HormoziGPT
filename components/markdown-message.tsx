"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Card } from "@/components/ui/card"

// Note: In a real implementation, you would install and import react-markdown:
// import ReactMarkdown from 'react-markdown'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownMessageProps {
  content: string
  timestamp: Date
  className?: string
}

export function MarkdownMessage({ content, timestamp, className = "" }: MarkdownMessageProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset state when content changes
    setDisplayedText("")
    setIsComplete(false)
    
    let currentIndex = 0
    const textLength = content.length
    
    // Function to add the next character
    const addNextChar = () => {
      if (currentIndex < textLength) {
        setDisplayedText(prev => prev + content[currentIndex])
        currentIndex++
        
        // Schedule the next character addition
        // Adjust the timing for a natural typing effect (faster for spaces and punctuation)
        const nextChar = content[currentIndex]
        const delay = nextChar === ' ' || nextChar === '\n' || nextChar === '.' || nextChar === ',' ? 10 : 20
        setTimeout(addNextChar, delay)
      } else {
        setIsComplete(true)
      }
    }
    
    // Start the animation
    setTimeout(addNextChar, 10)
    
    // Cleanup function
    return () => {
      currentIndex = textLength // Stop the animation if component unmounts
    }
  }, [content])

  // Function to render markdown-like formatting
  const renderMarkdown = (text: string) => {
    // This is a simple implementation - in a real app, you would use react-markdown
    
    // Handle code blocks
    let formattedText = text.replace(
      /```([\s\S]*?)```/g, 
      '<pre class="bg-gray-700 p-2 rounded my-2 overflow-x-auto"><code>$1</code></pre>'
    )
    
    // Handle inline code
    formattedText = formattedText.replace(
      /`([^`]+)`/g, 
      '<code class="bg-gray-700 px-1 rounded">$1</code>'
    )
    
    // Handle bold text
    formattedText = formattedText.replace(
      /\*\*([^*]+)\*\*/g, 
      '<strong>$1</strong>'
    )
    
    // Handle headers
    formattedText = formattedText.replace(
      /^### (.*$)/gm, 
      '<h3 class="text-lg font-bold mt-3 mb-1">$1</h3>'
    )
    formattedText = formattedText.replace(
      /^## (.*$)/gm, 
      '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>'
    )
    formattedText = formattedText.replace(
      /^# (.*$)/gm, 
      '<h1 class="text-2xl font-bold mt-5 mb-3">$1</h1>'
    )
    
    // Handle links
    formattedText = formattedText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    
    // Handle line breaks
    formattedText = formattedText.replace(/\n/g, '<br />')
    
    return formattedText
  }

  // In a real implementation with react-markdown, you would use:
  /*
  return (
    <Card className={`p-4 bg-gray-800 text-gray-100 ${className}`}>
      <div className="whitespace-pre-wrap break-words">
        <ReactMarkdown
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-700 px-1 rounded" {...props}>
                  {children}
                </code>
              )
            },
            // Add more component customizations as needed
          }}
        >
          {displayedText}
        </ReactMarkdown>
      </div>
      <div className="text-xs mt-2 text-gray-500">
        {timestamp.toLocaleTimeString()}
      </div>
    </Card>
  )
  */

  return (
    <Card className={`p-4 bg-gray-800 text-gray-100 ${className}`}>
      <div 
        ref={contentRef}
        className="whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(displayedText) }}
      />
      <div className="text-xs mt-2 text-gray-500">
        {timestamp.toLocaleTimeString()}
      </div>
    </Card>
  )
}