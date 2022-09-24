import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { delete_by_email, get_short_users } from '../services/AdminService'
import { changeUserPassword } from '../services/UserService'

export default function AdminPage() {
    const [email,setEmail]=useState('')
    const [error,setError]=useState('')
    const [users,setUsers]=useState([])

    const getUsersShort=async()=>{
        try{
            const response=await get_short_users()
            if(response.status===200){
                setUsers(response.data)
            }else{
                setError(response.data)
            }
        }catch{
            setError("Couldn't get data")
        }
    }
    useEffect(()=>{
        getUsersShort()
    },[])
    const handleChangePassword=async (e)=>{
        e.preventDefault()
        const password=e.target.elements.password.value
        const id=e.target.elements.id.value
        console.log(password,id)
        const response=await changeUserPassword(id,password)
        setError(response.data)
        
    }
    const handleDelete=async (e)=>{
        e.preventDefault()
        try{
            const response=await delete_by_email(email)
            if(response.status===200){
                setError("Deleted user with email "+email)
                setEmail("")
            }else{
                setError(response.data)
            }
        }catch{
            setError("Couldn't delete")
        }
    }
  return (
    <div>Admin operations
        <br/>
        <form onSubmit={(e)=>handleDelete(e)}>
            <label>Delete by email</label>
            <input type="email" value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <button type='submit'>Delete</button>
                <label>{error}</label>
        </form>
        <br/>
        {
            users&&
            users?.content?.map((user) =>(
                <div key={user.id}>
                    {user.name} {user.lastName} {user.email} 
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <form onSubmit={(e)=>handleChangePassword(e)}>
                        <input name="id" value={user.id} type="hidden" placeholder='New Password'/>
                        <input name="password" type="password" placeholder='New Password'/>
                        <button type='submit'>Change Password</button><br/><br/>
                    </form>
                </div>
            ))
        }
    </div>
  )
}
