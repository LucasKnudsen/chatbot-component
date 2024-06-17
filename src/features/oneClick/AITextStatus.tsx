import { SpeakerIcon } from "@/components"
import { useTheme } from "../theme"

export const AITextStatus = () => {
  const { theme } = useTheme()

  return (
    <div class={`flex items-center justify-between w-full mb-5 py-3 border-b border-${theme().borderColor} `}>
      <div>
        <div class="text-lg font-bold">Hello There!</div>
        <div class="text-lg text-secondary">How can i help you today? ...</div>
      </div>
      <SpeakerIcon />
    </div>
  )
}
