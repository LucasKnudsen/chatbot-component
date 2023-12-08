import { Divider } from '@/components/Divider'
import { CircleDocumentIcon } from '@/components/icons/CircleDocumentIcon'
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
    <a
      data-testid='link-resource'
      class='hover:no-underline border rounded-xl '
      href={props.link.value}
      target='_blank'
      rel='noreferrer'
      style={{
        color: theme().textColor,
        'border-color': theme().borderColor,
      }}
    >
      <div class='p-2'>
        <div class='relative rounded-md overflow-hidden mb-2'>
          <CircleDocumentIcon class='absolute top-2 right-2' color={theme().primaryColor} />

          <img
            src={props.link.thumbnail || 'https://picsum.photos/290/140'}
            class='max-h-[100px] w-full object-cover'
          />
        </div>
        <p class='break-words line-clamp-2 font-light'>{props.link.description}</p>
      </div>

      <Divider margin={0} />

      <div class='p-2'>
        <p class='break-words line-clamp-1 font-medium text-sm'>{props.link.value}</p>
      </div>
    </a>
  )
}
