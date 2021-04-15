import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'hooks/useAuth'

interface UserAvatarProps {
  name?: string
  avatar_url?: string
}

export function UserAvatar({
  name,
  avatar_url
}: UserAvatarProps): ReactElement {
  const { signed, showForm } = useAuth()
  const router = useRouter()

  function showProfile() {
    router.push('/profile')
  }

  return (
    <button
      onClick={signed ? showProfile : showForm}
      className="block h-8 w-8 rounded-full overflow-hidden border-2 hover:border-gray-900 border-gray-600 focus:outline-none focus:border-gray-600"
    >
      {signed ? (
        <img
          src={avatar_url}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          className="h-full w-full object-cover"
          style={{
            backgroundImage:
              'linear-gradient(140deg,rgb(50, 145, 255), rgb(121, 255, 225) 100%)'
          }}
        />
      )}
    </button>
  )
}
