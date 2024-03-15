import { onMount } from 'solid-js'
import styles from './index.css?inline'

const StyleSheet = () => {
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
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(147, 147, 147, 0.25);
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 3px;
        height: 3px;

      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(147, 147, 147, 0.25);
          width: 10px; 
          height: 10px; 
        border-radius: 10px;

      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background-color: transparent;
      }
      `}

      {styles}
    </style>
  )
}

export default StyleSheet
