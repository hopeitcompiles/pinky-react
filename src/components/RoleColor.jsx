import React from 'react'

export default function RoleColor({role,bold,upperCase}) {
    const name=upperCase?role?.name?.toUpperCase():role?.name
    const style={
        'color':`${role?.color}`,
        'fontWeight':`${bold?'bold':'normal'}`
    }
  return (
    <span style={style}>{name}</span>
  )
}
