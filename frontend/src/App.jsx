import { useEffect, useRef, useState } from 'react'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import InputBar from './components/InputBar'
import './styles.css'

const API_BASE = import.meta.env.VITE_API_BASE || ''

export default function App() {
  const [messages, setMessages] = useState([
    { id: 'sys-1', role: 'assistant', text: 'Hi! Ask me anything.' }
  ])
  const [sending, setSending] = useState(false)
  const scrollerRef = useRef(null)

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (raw) => {
    const text = raw.trim()
    if (!text || sending) return

    const userMsg = { id: crypto.randomUUID(), role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setSending(true)

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })

      if (!res.ok) {
        const errTxt = await res.text()
        setMessages((p) => [
          ...p,
          { id: crypto.randomUUID(), role: 'assistant', text: `Error ${res.status}: ${errTxt || 'request failed'}` }
        ])
      } else {
        const data = await res.json() // { reply: '...' }
        setMessages((p) => [
          ...p,
          { id: crypto.randomUUID(), role: 'assistant', text: data?.reply || '(empty response)' }
        ])
      }
    } catch (e) {
      setMessages((p) => [
        ...p,
        { id: crypto.randomUUID(), role: 'assistant', text: `Network error: ${String(e)}` }
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="app">
      <div className="shell">
        <ChatHeader title="AI Local Chat" subtitle="Mobile-first demo" />
        <main ref={scrollerRef} className="messages">
          <MessageList items={messages} />
          {sending && (
            <div className="row row-assistant">
              <div className="bubble bubble-assistant typing">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )}
          <div className="safe-bottom-spacer" />
        </main>
        <InputBar disabled={sending} onSend={handleSend} />
      </div>
    </div>
  )
}