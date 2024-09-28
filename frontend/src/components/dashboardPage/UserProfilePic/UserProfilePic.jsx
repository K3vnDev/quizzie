export function UserProfilePic({ username, profileColor, isLoading }) {
  if (isLoading) return <div className='user-profile-pic loading' />

  const background = profileColor.substring(1)
  const url = `https://ui-avatars.com/api/?name=${username}&length=1&font-size=0.65&background=${background}&color=ffffff`

  return <img src={url} className='user-profile-pic' style={{ borderRadius: '50%' }} />
}
