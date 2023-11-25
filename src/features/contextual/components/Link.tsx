import linkIcon from '@/assets/link-icon.svg'
import { Divider } from '@/components/Divider'
import { useTheme } from '@/features/theme/hooks'
import { ContextualElement } from '..'

type Props = {
  link: ContextualElement
}

export const Link = (props: Props) => {
  if (Array.isArray(props.link.value)) return null

  const { theme } = useTheme()

  // TODO: Add onClick to open link in new tab
  // TODO: Add onHover to show description and link indication

  return (
    <div
      class='flex flex-col justify-between border mb-2 rounded-xl '
      style={{
        'border-color': theme().borderColor,
      }}
    >
      <a
        class='hover:no-underline'
        href={props.link.value}
        target='_blank'
        rel='noreferrer'
        style={{
          color: theme().textColor,
        }}
      >
        <div class='p-2'>
          <div class='relative rounded-md overflow-hidden mb-2'>
            <img class='absolute top-2 right-2' src={linkIcon} />

            <img
              src={props.link.thumbnail || 'https://picsum.photos/290/140'}
              class='max-h-[124px] w-full object-cover'
            />
          </div>
          <p class='break-words line-clamp-2 font-light'>{props.link.description}</p>
        </div>

        <Divider margin={0} />
        <div class='p-2'>
          <p class='break-words line-clamp-1 font-medium text-xs'>{props.link.value}</p>
        </div>
      </a>
    </div>
  )
}
