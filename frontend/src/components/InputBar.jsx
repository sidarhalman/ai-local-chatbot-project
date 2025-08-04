import { useEffect, useRef, useState } from 'react'

export default function InputBar({ disabled, onSend }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    // Focus on mount (desktop); on mobile it is ignored until user interaction
    inputRef.current?.focus()
  }, [])

  const submit = (e) => {
    e?.preventDefault()
    const v = value.trim()
    if (!v || disabled) return
    onSend(v)
    setValue('')
  }

  return (
    <form className="inputbar" onSubmit={submit}>
      <input
        ref={inputRef}
        className="input"
        placeholder="Type a message…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputMode="text"
        autoComplete="off"
        autoCorrect="on"
        spellCheck="true"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) submit(e)
        }}
      />
      <button className="btn" disabled={disabled || !value.trim()}>
        {disabled ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
