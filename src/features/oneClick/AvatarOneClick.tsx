import avatarOneClick from '@/assets/avatarOneClick.png'

export const AvatarOneClick = () => {
  return (
    <div class='w-full h-full overflow-hidden rounded-xl z-10'>
      <img class='object-cover h-full w-full' src={avatarOneClick} alt='avatarOneClick' />
    </div>
  )
}
