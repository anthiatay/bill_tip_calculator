import { useState, useEffect } from 'react'
import Calculator from './components/Calculator'
import Header from './components/Header'
import './App.css'

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved ? JSON.parse(saved) : false
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
        if (isDarkMode) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }
    }, [isDarkMode])

    return (
        <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
            <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
            <main className="main-content">
                <Calculator />
            </main>
        </div>
    )
}

export default App
