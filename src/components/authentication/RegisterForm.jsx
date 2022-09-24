import { useEffect } from "react"
import { useState } from "react"
import Style from "../../assets/css/ModalForm.module.css"
import { get_roles } from "../../services/AppService"
import catchError from "../../services/ErrorCatcher"
import { RegisterUser } from "../../services/UserService"
import { convertDate } from "../../utils/Convertions"

const genders=["UNDEFINED","MALE","FEMALE","OTHER"]

export function RegisterForm({user_edit,on_success}){
    const [roleList,setRoleList]=useState([])

    const [values,setValues]=useState({
        id:user_edit?.id?user_edit?.id:'',
        name:user_edit?.name?user_edit?.name:'',
        ign:user_edit?.ign?user_edit?.ign:'',
        lastName:user_edit?.lastName?user_edit?.lastName:'',
        email:user_edit?.email?user_edit?.email:'',
        password:'',
        gender:user_edit?.gender?user_edit?.gender:genders[0],
        role:user_edit?.role?user_edit?.role:roleList[0],
        birthday:user_edit?.birthday? convertDate(user_edit?.birthday):convertDate(new Date())
    })

    const [error,setError] = useState('Error')
    
    const get_rol_list=async ()=>{
        console.log('getting roles')
        let value= await get_roles()
        setRoleList(value.data)
    }
    useEffect(()=>{
        get_rol_list()
    },[])

    const handleInputChange=(event)=>{
        console.log(event.target)
        const {name,value}=event.target
        setValues({
            ...values,
            [name]:value,
        })
    }

    const handleRegister=async (e) =>{
		e.preventDefault();
        if(
            values.name===user_edit?.name &&
            values.lastName===user_edit?.lastName &&
            values.email===user_edit?.email &&
            values.birthday===convertDate(user_edit?.birthday)&&
            values.role===user_edit?.role &&
            values.ign===user_edit?.ign &&
            values.gender===user_edit?.gender
        ){
            setError({success:true,text:"Nothing to change"})
            return;
        }
        console.log(values)
		try{
            const response=await RegisterUser(values)
            if(response?.status===200){
                if(on_success){
                    on_success()
                }
            }
            setError({success:response?.status===200,text:response.data})
		}catch(er){
			setError({success:false,text:catchError(er)})
		}
	}

    return (
    <section className={Style.container}>
        <form className={Style.form} onSubmit={(e)=>handleRegister(e)}>
            <input 
                type="hidden"
                name='id'
                value={values.id}/>
            <input className={Style.input_form} 
                type="text" 
                name='name'
                placeholder="Name" 
                onChange={handleInputChange}
                value={values.name}/>
            <input className={Style.input_form} 
                type="text"
                name='lastName'
                placeholder="Last Name" 
                onChange={handleInputChange}
                value={values.lastName}/>
            <input className={Style.input_form} 
                type="email"
                name='email'
                placeholder="Email" 
                onChange={handleInputChange}
                value={values.email}/>
            <input className={Style.input_form} 
                type={`${user_edit?'hidden':'password'}`} 
                name='password'
                placeholder="Password"
                onChange={handleInputChange}
                value={values.password}/>
            <div className={Style.input_container}>
                <i className={`${Style.icon} fa fa-birthday-cake`} aria-hidden="true"></i>
                <input className={Style.input_small} 
                    type="date"
                    name='birthday'
                    onChange={handleInputChange}
                    value={values.birthday}/>
                <select className={Style.input_small} 
                    type={`${user_edit&&'hidden'}`} 
                    onChange={handleInputChange}
                    name='gender'
                    value={values.gender}>
                        <option disabled>Select a gender</option>
                        {genders.map((item)=>{
                            return(
                                <option value={item} key={item}>
                                 {item}</option>
                            )
                        })
                    }
                </select>
            </div>
            <input className={Style.input_form} 
                type="text" 
                name="ign" 
                placeholder="Nick" 
                onChange={handleInputChange}
                value={values.ign}/>
            {user_edit?.role.level>100?
                <input className={Style.input_form} type='text' value={"Can't change this role"} disabled/>
                :
                <select className={Style.input_form} 
                    type={`${user_edit&&'hidden'}`} 
                    name='role'
                    onChange={(e)=>handleInputChange({target:{
                        name:'role',
                        value:roleList[e.target.value]
                    }})}
                    value={values?.role?.level}>
                        <option disabled>Select a role</option>
                        {roleList.map((item,count)=>{
                            return(
                                <option value={count} key={item.id}>
                                 {item.name}</option>
                            )
                        })
                        }
                </select>
            }
            <div className={Style.error_panel}>
                <h6 className={!error.success&Style.error_text}>{error.text}</h6>
            </div>
            <button type="submit" className={Style.btn_form}
                >{user_edit?'Update':'Register'}
            </button>
        </form>
        </section>
    )
}