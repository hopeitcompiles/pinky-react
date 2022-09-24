import React from 'react'
import Style from '../../assets/css/Profile.module.css'

export default function About({profile}) {
  return (
    <div>{profile?.name}'s info</div>
  )
}
