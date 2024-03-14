// import { CircleCloseIcon } from '@/components/icons'
// import { SidebarTabIcon } from '@/components/icons/SidebarTabIcon'
// import { useTheme } from '@/features/theme/hooks'
// import { JSX } from 'solid-js'
// import { botStore } from '..'
// import { sidebarInnerWidthNum, sidebarPaddingNum } from '../constants'

// type SidebarProps = {
//   children: JSX.Element
//   class?: string
// }

// const botPaddingNum = 64
// const innerWidth = sidebarInnerWidthNum + 'px'
// const openWidth = sidebarInnerWidthNum + botPaddingNum + sidebarPaddingNum + 'px'
// // 1px instead of 0px stops weird safari z-index issue
// const closedWidth = '1px'

// export const Sidebar = (props: SidebarProps) => {
//   const { theme } = useTheme()
//   return (
//     <div
//       class={
//         'absolute z-10 bg-white/75 h-full top-0 right-0 transition-all backdrop-blur-md shadow-md ' +
//         props.class
//       }
//       style={{
//         width: botStore.isSidebarOpen ? openWidth : closedWidth,
//         background: theme().drawerBackground,
//       }}
//     >
//       {/* Sidebar drawer button  */}
//       <div
//         data-testid='drawer-button'
//         class='hidden md:block absolute cursor-pointer transition-all'
//         style={{ top: '25px', left: '-25px', opacity: botStore.isSidebarOpen ? '0' : '1' }}
//         onClick={botStore.toggleSidebar}
//       >
//         <SidebarTabIcon width={25} color={theme().primaryColor} />
//       </div>

//       {/* Sidebar close button  */}
//       <div
//         class='hidden md:block absolute cursor-pointer transition-all'
//         style={{ top: '25px', left: '-10px', opacity: botStore.isSidebarOpen ? '1' : '0' }}
//         onClick={botStore.toggleSidebar}
//       >
//         <CircleCloseIcon width={25} color={theme().primaryColor} />
//       </div>

//       {/* Sidebar container  */}
//       <div
//         class='opacity-0 hover:opacity-100 transition-opacity py-6 h-full '
//         style={{
//           width: innerWidth,
//           opacity: botStore.isSidebarOpen ? '1' : '0',
//           'margin-left': sidebarPaddingNum + 'px',
//           'margin-right': botPaddingNum + 'px',
//         }}
//       >
//         {props.children}
//       </div>
//     </div>
//   )
// }
