import { createSignal, Show, splitProps } from 'solid-js'
import styles from '../../../index.css?inline'
import { Bot, BotProps } from '../../bot/components/Bot'
import { BubbleParams } from '../types'
import { BubbleButton } from './BubbleButton'

const defaultButtonColor = '#3B81F6'
const defaultIconColor = 'white'

export type BubbleProps = BotProps & BubbleParams

export const Bubble = (props: BubbleProps) => {
  const [bubbleProps] = splitProps(props, ['theme'])

  const [isBotOpened, setIsBotOpened] = createSignal(false)
  const [isBotStarted, setIsBotStarted] = createSignal(false)

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true)
    setIsBotOpened(true)
  }

  const closeBot = () => {
    setIsBotOpened(false)
  }

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot()
  }

  return (
    <>
      <style>{styles}</style>
      <BubbleButton
        {...bubbleProps.theme?.button}
        toggleBot={toggleBot}
        isBotOpened={isBotOpened()}
      />
      <div
        style={{
          height: props.theme?.chatWindow?.height
            ? `${props.theme?.chatWindow?.height.toString()}px`
            : '100vh',
          width: props.theme?.chatWindow?.width
            ? `${props.theme?.chatWindow?.width.toString()}px`
            : '100%',
          margin: '0px',
          transition: 'transform 250ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
          'transform-origin': 'bottom right',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
          'z-index': 42424242,
        }}
        class={isBotOpened() ? ' opacity-1' : ' opacity-0 pointer-events-none'}
        // part='bot'
        // style={{
        //   height: bubbleProps.theme?.chatWindow?.height
        //     ? `${bubbleProps.theme?.chatWindow?.height.toString()}px`
        //     : 'calc(100% - 100px)',
        //   transition: 'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
        //   'transform-origin': 'bottom right',
        //   transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
        //   'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
        //   'background-color': bubbleProps.theme?.chatWindow?.backgroundColor || '#ffffff',
        //   'z-index': 42424242,
        // }}
      >
        <Show when={isBotStarted()}>
          <Bot
            initialPrompts={props.initialPrompts}
            themeId={props.themeId}
            navPromptsTitle={props.navPromptsTitle}
            promptPlaceholder={props.promptPlaceholder}
            suggestedPromptsTitle={props.suggestedPromptsTitle}
            badgeBackgroundColor={bubbleProps.theme?.chatWindow?.backgroundColor}
            bubbleBackgroundColor={bubbleProps.theme?.button?.backgroundColor ?? defaultButtonColor}
            bubbleTextColor={bubbleProps.theme?.button?.iconColor ?? defaultIconColor}
            title={bubbleProps.theme?.chatWindow?.title}
            titleAvatarSrc={bubbleProps.theme?.chatWindow?.titleAvatarSrc}
            welcomeMessage={bubbleProps.theme?.chatWindow?.welcomeMessage}
            poweredByTextColor={bubbleProps.theme?.chatWindow?.poweredByTextColor}
            botMessage={bubbleProps.theme?.chatWindow?.botMessage}
            userMessage={bubbleProps.theme?.chatWindow?.userMessage}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
          />
        </Show>
      </div>
    </>
  )
}
