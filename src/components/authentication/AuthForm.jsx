import { useRef,useState, useEffect, useContext } from "react"
import Style from "../../assets/css/Form.module.css"
import catchError from "../../services/ErrorCatcher"
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from "../../context/UserProvider"
import { LoginUser, RegisterUser } from "../../services/UserService";

export function AuthForm(){
    const location=useLocation().pathname
    const [registerPanelActive,setRegisterPanelActive] = useState(
        location==='/register'?true:false)
    const [values,setValues]=useState({
        name:'',
        ign:'',
        lastName:'',
        email:'',
        password:'',
    })

    const handleInputChange=(event)=>{
        const {name,value}=event.target
        setValues({
            ...values,
            [name]:value,
        })
    }
    
    const [error, setError] =useState('')
    const [isSigning, setIsSigning] = useState(false)

    const {login,sessionUser} = useContext(UserContext)

    const navigate=useNavigate()
    const emailRef=useRef()
    const nameRef=useRef()
    let timer

    const handleLogin=async (e) =>{
        setIsSigning(true)
        setError("")
		e?.preventDefault();
		try{
            const response=await LoginUser(values.email, values.password)
            const newToken=response.headers['authorization']
            if(newToken.startsWith('Bearer ')){
                login(newToken)
                setError('Correct!')
            }else{
                setError('Wrong email or password')
            }
            setValues({
                ...values,
                'password':''
            })
		}catch(er){
			setError(catchError(er))
		}
        setIsSigning(false)
	}

    const handleRegister=async (e) =>{
		e.preventDefault();
		setIsSigning(true)
		try{
            const response=await RegisterUser(values)
            if(response?.status===200){
                handleLogin()
            }
            setError(response.data)
		}catch(er){
			setError(catchError(er))
		}
		setIsSigning(false)
	}

    useEffect(()=>{
        if(error!==''){
            clearTimeout(timer)
            timer = setTimeout(function() {
                setError('')
            }, 5000);
        }
	},[error])

    const handleRightPanel=(state)=>{
        if(location==='/register' || location==='/login'){
            navigate(state?'/register':'/login')
            return;
        }
        setRegisterPanelActive(state)
    }

    useEffect(()=>{
        setIsSigning(false)
        setError("")
        if(!(location==='/register' || location==='/login')){
            return;
        }
        if(location==='/register'){
            nameRef.current.focus()
            setRegisterPanelActive(true)
            return;
        }
        if(location==='/login'){
            emailRef.current.focus()
            setRegisterPanelActive(false)
            return;
        }
    },[location])

    useEffect(()=>{
        if(sessionUser!==null && (location==='/login' ||location==='/register')){
            navigate('/profile')
        }
    },[sessionUser])

    return (
        <div className={Style.body}>
            <div className={`${Style.container_all} ${registerPanelActive?Style.right_panel_active:''}`} id="container">
                <div className={`${Style.form_container} ${Style.sign_up_container}`}>
                    <form className={Style.form} onSubmit={handleRegister} noValidate>
                        <h1 className={Style.title}>Register</h1>
                        <span className={Style.span}>use your email to create an account</span>
                        <input className={Style.input_form} 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            ref={nameRef}
                            onChange={handleInputChange}
                            value={values.name} required/>
                        <input className={Style.input_form} 
                            type="text" 
                            name="lastName"
                            placeholder="Last Name" 
                            onChange={handleInputChange}
                            value={values.lastName} required/>
                        <input className={Style.input_form} 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            ref={emailRef}
                            onChange={handleInputChange}
                            value={values.email} required/>
                        <input className={Style.input_form} 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            onChange={handleInputChange}
                            value={values.password} required/>
                        <input className={Style.input_form} 
                            type="text" 
                            name="ign"
                            placeholder="Nick" 
                            onChange={handleInputChange}
                            value={values.ign} required/>
                        <button type="submit" className={Style.btn_form}
                            disabled={isSigning}>Sign Up
                        </button>
                        <a className={Style.show_on_small} onClick={()=>handleRightPanel(false)}>Have already an account?</a>
                        <h6 className={Style.error} >{error}</h6>
                    </form>
                </div>
                <div className={`${Style.form_container} ${Style.sign_in_container}`}>
                    <form className={Style.form} onSubmit={handleLogin} noValidate>
                        <h1 className={Style.title}>Sign in</h1>
                        <span className={Style.span}>with your email</span>
                        <input className={Style.input_form} 
                            type="email"
                            name="email"
                            placeholder="Email or nick" 
                            ref={emailRef}
                            onChange={handleInputChange}
                            value={values.email} required/>
                        <input className={Style.input_form} 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            onChange={handleInputChange}
                            value={values.password} required/>
                        <a className={Style.link} >Forgot your password?</a>
                        <button type="submit" className={Style.btn_form}
                            disabled={isSigning}>Sign In
                        </button>
                        <a className={Style.show_on_small} onClick={()=>handleRightPanel(true)}>Don't have an account?</a>
                        <div className={Style.m2}></div>
                        <h6 className={Style.error} >{error}</h6>
                    </form>
                </div>
                <div className={Style.overlay_container}>
                    <div className={Style.overlay_form}>
                        <div className={`${Style.overlay_panel} ${Style.overlay_left}`}>
                            <h1 className={Style.title}>Have already an account?</h1>
                            <p className={Style.paragraph}>To keep connected with us please login with your personal info that Facebook has sold</p>
                            <button className={`${Style.btn_form} ${Style.ghost}`}  
                                onClick={()=>handleRightPanel(false)} >Sign In</button>
                        </div>
                        <div className={`${Style.overlay_panel} ${Style.overlay_right}`}>
                            <h1 className={Style.title}>Don't have an account?</h1>
                            <p className={Style.paragraph}>Enter your personal details and the embarrassing email you had created when you were a child</p>
                            <button className={`${Style.btn_form} ${Style.ghost}`} 
                            onClick={()=>handleRightPanel(true)} >Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}