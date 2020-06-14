import React from 'react'

export default function Avatar({ src }) {
  return (
    <img id='profile-avatar' src={src? src: 'https://ombud.alaska.gov/wp-content/uploads/2018/01/no-user.jpg'} alt='avatar' />
  )
}