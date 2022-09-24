import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { get_root_roles, update_rol } from '../services/RootService'
import catchError from '../services/ErrorCatcher'

export default function RootConfigPage() {
    const [roleList,setRoleList]=useState([])
    const [error,setError]=useState('')

    const handleChange=async (event,count)=>{
        event.preventDefault();
        const selected=roleList[count]
        let role={
            id:selected.id,
            name:event.target.elements.name.value,
            color:event.target.elements.color.value
        }
        const response=await update_rol(role)
        if(response.status===20){
            setError("Done!")
        }else{
            setError(response.data)
        }
    }
    const getRoleList=async()=>{
        const list=await get_root_roles()
        setRoleList(list.data)
    }
    useEffect(()=>{
        getRoleList()
    },[])
  return (
    <section>
    <div>Role List</div><br/>
    {roleList.map((item,count)=>{
        return(
                <form key={count} onSubmit={(event)=>handleChange(event,count)}>
                    <a>&nbsp;{count+1} <span style={{color:item.color,fontWeight:'bolder'}}>
                        {item.name}</span>
                        <br/>Name <input name='name' defaultValue={item.name}/>
                        <br/>Color <input name='color' type="color" defaultValue={item.color}/></a><br/>
                    <button type='submit'>Save</button>
                    <br/> <br/> 
                </form>
        )
    })
    }
    </section>
  )
}
