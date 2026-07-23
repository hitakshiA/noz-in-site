import { useState } from 'react'
import { Link } from 'react-router-dom'

const REPO = 'https://github.com/mansiverma897993/noz-in'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () =>
    setMenuOpen((open) => {
      const next = !open
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <nav>
      <Link to="/" className="nav-logo" onClick={closeMenu} viewTransition>noz<b>-in</b></Link>
      <button
        className={`menu-toggle${menuOpen ? ' active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
        aria-expanded={menuOpen}
      >
        <span /><span />
      </button>
      <div className={`nav-menu${menuOpen ? ' active' : ''}`}>
        <ul className="nav-links">
          <li><Link to="/method" onClick={closeMenu} viewTransition>Method</Link></li>
          <li><a href={`${REPO}#readme`} onClick={closeMenu}>Docs</a></li>
        </ul>
        <div className="nav-actions">
          <a className="btn-signup" href={REPO}>GitHub</a>
        </div>
      </div>
    </nav>
  )
}
