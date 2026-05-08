import { useThemeContext } from '../../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { toggleTheme, isDark } = useThemeContext()

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md p-2 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <div className="flex items-center gap-2 animate-in fade-in-50">
          <Moon className="h-5 w-5 text-blue-400" />
          <span className="text-xs font-medium text-foreground">Dark</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 animate-in fade-in-50">
          <Sun className="h-5 w-5 text-yellow-500" />
          <span className="text-xs font-medium text-foreground">Light</span>
        </div>
      )}
    </button>
  )
}
