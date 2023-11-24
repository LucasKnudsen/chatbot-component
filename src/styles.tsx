import { useTheme } from './features/theme/hooks'

const StyleSheet = () => {
  const { theme } = useTheme()

  const primaryColor = theme().primaryColor

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
    </style>
  )
}

export default StyleSheet
