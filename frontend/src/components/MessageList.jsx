function Bubble({ role, text }) {
  const isUser = role === 'user'
  return (
    <div className={`row ${isUser ? 'row-user' : 'row-assistant'}`}>
      <div className={`bubble ${isUser ? 'bubble-user' : 'bubble-assistant'}`}>
        {text}
      </div>
    </div>
  )
}

export default function MessageList({ items }) {
  return (
    <>
      {items.map(m => (
        <Bubble key={m.id} role={m.role} text={m.text} />
      ))}
    </>
  )
}