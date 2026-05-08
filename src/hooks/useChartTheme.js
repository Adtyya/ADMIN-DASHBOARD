import { useThemeContext } from '../context/ThemeContext'

export function useChartTheme() {
  const { isDark } = useThemeContext()

  const chartTheme = {
    colors: isDark ? {
      text: '#f5f5f5',
      grid: '#404040',
      line: '#60a5fa',
      tooltip: '#1f2937',
      tooltipText: '#f5f5f5',
      stroke: '#90caf9',
    } : {
      text: '#333333',
      grid: '#e5e7eb',
      line: '#3b82f6',
      tooltip: '#ffffff',
      tooltipText: '#1f2937',
      stroke: '#60a5fa',
    }
  }

  return {
    isDark,
    chartTheme,
    cartesianGridStroke: chartTheme.colors.grid,
    textColor: chartTheme.colors.text,
    tooltipColor: chartTheme.colors.tooltip,
    lineColor: chartTheme.colors.line,
  }
}
