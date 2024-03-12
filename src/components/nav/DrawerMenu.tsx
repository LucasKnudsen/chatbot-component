import { botStore } from '@/features/bot'
import { configStore } from '@/features/portal-init'
import { Channel } from '@/graphql'
import { Divider } from '../Divider'

export const DrawerMenu = () => {
  return (
    <div class=' h-full flex flex-col items-stretch justify-between '>
      {/* NEW BUTTON  */}

      <div class='flex flex-col items-center'>
        <Divider />

        <button
          class={`relative rounded-full font-semibold text-sm leading-[17px] active:scale-95
           
            bg-[var(--primaryColor)] text-[var(--onPrimary)] h-[32px] my-1.5
            transition-all hover:brightness-110 flex justify-between items-center
            overflow-hidden
            `}
          style={{
            width: configStore.isDrawerOpened ? '100%' : '32px',
            padding: configStore.isDrawerOpened ? '0 16px' : '0',
          }}
        >
          {/* PLUS svg  */}
          <svg
            class='transition-all'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            style={{
              width: configStore.isDrawerOpened ? '24px' : '32px',
              height: configStore.isDrawerOpened ? '24px' : '32px',
            }}
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.2'
              d='M12 7v10m-5-5h10'
            ></path>
          </svg>

          <span
            class='transition-all font-normal whitespace-nowrap'
            style={{
              opacity: configStore.isDrawerOpened ? 1 : 0,
              display: configStore.isDrawerOpened ? 'block' : 'none',
            }}
          >
            New chat
          </span>
        </button>

        <Divider />
      </div>

      <div>
        <Divider />

        {/* AVATAR BUTTON */}
        <div
          overflow-hidden
          class='flex items-center gap-4 cursor-pointer hover:bg-[var(--surfaceHoveredBackground)] rounded-3xl px-4 py-1 '
          style={{
            padding: configStore.isDrawerOpened ? '4px 16px' : '4px 0',
          }}
        >
          <div
            class={`w-9 h-9 rounded-full  border-white border
        hover:outline-4 outline outline-transparent hover:outline-[var(--surfaceHoveredBackground)] transition`}
            style={{
              'background-image':
                (botStore.activeChannel as Channel)?.avatar ||
                'linear-gradient(to right, #ed4264, #ffedbc)',
            }}
          ></div>

          <span
            class='transition-all text-[var(--primaryColor)] whitespace-nowrap'
            style={{
              opacity: configStore.isDrawerOpened ? 1 : 0,
              display: configStore.isDrawerOpened ? 'block' : 'none',
            }}
          >
            AI Profile
          </span>
        </div>
      </div>
    </div>
  )
}
