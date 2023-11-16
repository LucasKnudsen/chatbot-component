import { Bot, BotProps } from '@/features/bot/components/Bot'
import { BubbleParams } from '@/features/bubble/types'
import { Show, createSignal, onCleanup, onMount } from 'solid-js'
import styles from '../../../index.css?inline'

const defaultButtonColor = '#3B81F6'
const defaultIconColor = 'white'

export type FullProps = BotProps & BubbleParams

export const Full = (props: FullProps, options?: { element: HTMLElement }) => {
  const isWebComponent = !!options

  const [isBotDisplayed, setIsBotDisplayed] = createSignal(!isWebComponent)

  const launchBot = () => {
    setIsBotDisplayed(true)
  }

  const botLauncherObserver = new IntersectionObserver((intersections) => {
    if (intersections.some((intersection) => intersection.isIntersecting)) launchBot()
  })

  onMount(() => {
    if (isWebComponent) {
      botLauncherObserver.observe(options.element)
    }
  })

  onCleanup(() => {
    if (isWebComponent) {
      botLauncherObserver.disconnect()
    }
  })

  return (
    <>
      {isWebComponent && <style>{styles}</style>}
      <Show when={isBotDisplayed()}>
        <div
          style={{
            height: props.theme?.chatWindow?.height
              ? `${props.theme?.chatWindow?.height.toString()}px`
              : '100vh',
            width: props.theme?.chatWindow?.width
              ? `${props.theme?.chatWindow?.width.toString()}px`
              : '100%',
            margin: '0px',
          }}
        >
          <Bot
            initialPrompts={props.initialPrompts}
            themeId={props.themeId}
            badgeBackgroundColor={props.theme?.chatWindow?.backgroundColor}
            bubbleBackgroundColor={props.theme?.button?.backgroundColor ?? defaultButtonColor}
            bubbleTextColor={props.theme?.button?.iconColor ?? defaultIconColor}
            title={props.theme?.chatWindow?.title}
            titleAvatarSrc={props.theme?.chatWindow?.titleAvatarSrc}
            welcomeMessage={props.theme?.chatWindow?.welcomeMessage}
            poweredByTextColor={props.theme?.chatWindow?.poweredByTextColor}
            botMessage={props.theme?.chatWindow?.botMessage}
            userMessage={props.theme?.chatWindow?.userMessage}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            isFullPage={true}
          />
        </div>
      </Show>
    </>
  )
}
