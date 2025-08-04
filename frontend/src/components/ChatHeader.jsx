export default function ChatHeader({ title, subtitle }) {
  return (
    <header className="header">
      <div className="header-title">{title}</div>
      {subtitle && <div className="header-subtitle">{subtitle}</div>}
    </header>
  )
}