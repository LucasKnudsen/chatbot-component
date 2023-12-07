import linkIcon from '@/assets/link-icon.svg'
import { useTheme } from '@/features/theme/hooks'
import { ContextualElement } from '..'

type Props = {
  link: ContextualElement
}

export const LinkInline = (props: Props) => {
  if (Array.isArray(props.link.value)) return null

  const { theme } = useTheme()

  return (
    <a
      data-testid='link-resource'
      class='flex hover:no-underline border rounded-xl max-w-[80%]'
      href={props.link.value}
      target='_blank'
      rel='noreferrer'
      style={{
        color: theme().textColor,
        'border-color': theme().borderColor,
      }}
    >
      <div class='p-2 w-[50%] '>
        <div class='relative rounded-md overflow-hidden h-12'>
          <img class='absolute top-2 right-2' src={linkIcon} />
          <img
            src={props.link.thumbnail || 'https://picsum.photos/290/140'}
            class='w-full h-full object-cover'
          />
        </div>
      </div>

      <div class='p-2 w-[50%] justify-between'>
        <div class='flex flex-col justify-between h-12'>
          <div class='font-light text-xs line-clamp-2 break-words'>{props.link.description}</div>
          <div class='text-xs line-clamp-1 break-words'>{props.link.value}</div>
        </div>
      </div>
    </a>
  )
}
