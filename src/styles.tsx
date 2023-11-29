import font from '@/assets/AlbertSans-VariableFont_wght.ttf'
import styles from './index.css?inline'

import { useTheme } from './features/theme/hooks'

const StyleSheet = () => {
  const { theme } = useTheme()

  const primaryColor = theme().primaryColor

  return (
    <style>
      {`
        @font-face {
          font-family: 'Albert Sans';
          src: url(${font});
        }

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
