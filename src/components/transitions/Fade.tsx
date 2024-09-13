import { JSX } from 'solid-js'
import { Transition } from 'solid-transition-group'

export const Fade = (props: { children: JSX.Element; duration?: number }) => {
  return (
    <Transition
      onEnter={(el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: props.duration || 600,
        })
        a.finished.then(done)
      }}
      onExit={(el, done) => {
        const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: props.duration || 600,
        })
        a.finished.then(done)
      }}
    >
      {props.children}
    </Transition>
  )
}
