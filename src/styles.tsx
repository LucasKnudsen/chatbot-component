import styles from './index.css?inline'

import { onMount } from 'solid-js'
import { useTheme } from './features/theme/hooks'

const StyleSheet = () => {
  const { theme } = useTheme()

  const primaryColor = theme().primaryColor

  onMount(() => {
    // Apparently the only thing that worked for me..
    const font = document.createElement('link')
    font.href = 'https://fonts.googleapis.com/css2?family=Albert+Sans:wght@200..900&display=swap'
    font.rel = 'stylesheet'
    document.head.appendChild(font)
  })

  return (
    <style>
      {`
        .custom-scrollbar::-webkit-scrollbar {
            width: 2px;
            height: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: ${primaryColor};
            border-radius: 20px;
        } 
        `}

      {styles}
    </style>
  )
}

export default StyleSheet
