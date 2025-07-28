"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Send, AlertCircle } from "lucide-react"
import { MarkdownMessage } from "@/components/markdown-message"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function HormoziGPT() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [input])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage.content,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "No response received",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Error calling API:", err)
      setError("Failed to connect to HormoziGPT. Make sure Python and Ollama are properly installed and running.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-center">HormoziGPT – Get Real Advice</h1>
          <p className="text-gray-400 text-center mt-2">
            Business mindset from Alex Hormozi, powered by Python integration with Ollama.
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <div className="text-6xl mb-4">💼</div>
            <h2 className="text-xl font-semibold mb-2">Welcome to HormoziGPT</h2>
            <p>Ask me anything about business, entrepreneurship, or mindset.</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`mb-6 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : "order-1"}`}>
              {message.role === "user" ? (
                <Card className="p-4 bg-blue-600 text-white ml-auto">
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                  <div className="text-xs mt-2 text-blue-200">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </Card>
              ) : (
                <MarkdownMessage 
                  content={message.content} 
                  timestamp={message.timestamp} 
                />
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-6">
            <Card className="bg-gray-800 text-gray-100 p-4 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400">HormoziGPT is thinking...</span>
              </div>
            </Card>
          </div>
        )}

        {error && (
          <div className="flex justify-center mb-6">
            <Card className="bg-red-900/50 border-red-700 text-red-200 p-4 max-w-md">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask HormoziGPT about business, mindset, or entrepreneurship..."
                className="min-h-[50px] max-h-[200px] resize-none bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 pr-12"
                disabled={isLoading}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                Enter to send, Shift+Enter for new line
              </div>
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed h-[50px] px-4"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
