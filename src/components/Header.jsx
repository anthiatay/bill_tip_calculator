import './Header.css'

function Header({ isDarkMode, onToggleDarkMode }) {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">
                    Bill <span className="pizza-emoji">🍕</span> Tip Calculator
                </h1>
                <button
                    className="theme-toggle"
                    onClick={onToggleDarkMode}
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    )
}

export default Header
