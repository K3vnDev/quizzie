import { useEffect, useState } from 'react'

export function UserProfilePic ({ username, profileColor }) {
  const [imgUrl, setImgUrl] = useState(null)
  const background = profileColor.substring(1)
  const url = `https://ui-avatars.com/api/?name=${username}&length=1&font-size=0.65&background=${background}&color=ffffff`

  useEffect(() => {
    fetch(url).then(() => { setImgUrl(url) })
  }, [])

  if (!imgUrl) return

  return (
    <img
      src={imgUrl}
      className='user-profile-pic'
      style={{ borderRadius: '50%' }}
    />
  )
}
