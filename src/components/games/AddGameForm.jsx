import { useEffect, useState } from "react"
import Style from "../../assets/css/Form.module.css"
import catchError from "../../services/ErrorCatcher"
import { RegisterGame } from "../../services/GameService"

const gamesTypes=[
    {'value':'UNITY','name':'Unity'},
    {'value':'UNREALENGINE','name':'Unreal Engine'},
    {'value':'JAVASCRIPT','name':'JavaScript'}
]

export function AddGameForm({game_edit,on_success}){

    const [values,setValues]=useState({
        id:game_edit?game_edit?.id:'',
        title:game_edit?game_edit?.title:'',
        type:game_edit?game_edit?.type:'UNDEFINED',
        description:game_edit?game_edit?.description:'',
        about:game_edit?game_edit?.about:'',
    })

    const [error,setError] = useState('')

    const handleRegister=async (e) =>{
        setError("")
		e.preventDefault();
        if(
            values.title===game_edit?.title &&
            values.type===game_edit?.type &&
            values.about===game_edit?.about &&
            values.description===game_edit?.description
        ){
            setError("Nothing to change")
            return;
        }
		try{
            const response=await RegisterGame(values)
            if(response?.status===200){
                setError(response.data)
            }else{
                setError(response.data)
            }
		}catch(er){
			setError(catchError(er))
		}
	}
    const handleInputChange=(event)=>{
        const {name,value}=event.target
        setValues({
            ...values,
            [name]:value,
        })
    }
    useEffect(()=>{
        return ()=>{
            if(on_success){
                on_success()
            }
        }
    },[])

    return (<form className={Style.form} onSubmit={handleRegister}>
                <input type="hidden"
                    name="id"
                    value={values.id}/>
                <input className={Style.input_form} 
                    type="text"
                    name="title"
                    placeholder="Title" 
                    onChange={handleInputChange}
                    value={values.title} required/>
                <input className={Style.input_form} 
                    type="text" 
                    name="about"
                    placeholder="Short description" 
                    onChange={handleInputChange}
                    value={values.about} required/>
                <textarea className={Style.input_form} 
                    type="area"
                    name="description"
                    placeholder="Detailed description" 
                    onChange={handleInputChange}
                    value={values.description} required/>
                {!game_edit&&
                    <select className={Style.input_form} 
                        type={`${game_edit?'text':'hidden'}`} 
                        name="type"
                        onChange={handleInputChange} 
                        value={values.type}>
                            <option  value="UNDEFINED" disabled>Choose the platform</option>
                            {gamesTypes.map((item)=>{
                                return <option key={item.value} value={item.value}>
                                {item.name}</option>
                            })
                            }
                    </select>
                }
                <h6 style={{'color':'red',
                'fontSize':'x-small','fontWeight':'700'}}>{game_edit?
                "Game type can't be changed":
                "This option is permanent"}
                </h6>

                <h6 className={Style.error} >{error}</h6>
                <button type="submit" className={Style.btn_form}
                    >{game_edit?'Update':'Register'}
                </button>
            </form>
    )
}