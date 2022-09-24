import { useState } from "react"
import Style from "../../assets/css/Form.module.css"
import catchError from "../../services/ErrorCatcher"
import { register } from "../../utils/ApiClient"
import { convertDate } from "../../utils/Convertions"

export function RegisterForm(){
    const [name,setName] = useState('')
	const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] =useState('')
    const [birthday,setBirthday] = useState(convertDate(new Date()))
    const [error,setError] = useState('')

    const handleRegister=async (e) =>{
		e.preventDefault();
		let user={
			'name':name,
			'lastName':lastName,
			'email':email,
			'password':password,
			'birthday':birthday
		}
		try{
           
            const response=await register(user)
            if(response?.status===200){
                setError('Registered!')
            }else if(response?.status===208){
                setError('This email is already registered')
            }
		}catch(er){
			setError(catchError(er))
		}
	}
    return (<form className={Style.form} onSubmit={handleRegister}>
                        <h1 className={Style.title}>Register</h1>
                        <span className={Style.span}>create an account</span>
                        <input className={Style.input_form} 
                            type="text" 
                            placeholder="Name" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}/>
                        <input className={Style.input_form} 
                            type="text" 
                            placeholder="Last Name" 
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}/>
                        <input className={Style.input_form} 
                            type="email" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}/>
                        <input className={Style.input_form} 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                        <input className={Style.input_form} 
                            type="date" 
                            onChange={(e) => setBirthday(e.target.value)}
                            value={birthday}/>
                        <button type="submit" className={Style.btn_form}
                            >Sign Up
                        </button>
                    </form>
    )
}