import { useContext, useState } from "react"
import { AuthForm } from "../components/authentication/AuthForm"
import UserContext from "../context/UserProvider"
import { Modal as DisplayImageModal } from "../components/Modal"
import { Dropzone } from "../components/Dropzone"
import { saveUserImage as update_image_func} from "../services/UserService"
import RoleColor from "../components/RoleColor"

export function ProfilePage(){
    const {sessionUser,image,setImage} = useContext(UserContext)
    const [displayModal,setDisplayModal]=useState(false);

    const handleUpload=async (FormData)=>{
        await update_image_func(null,FormData)
    }

    if(!sessionUser){
        return(
            <AuthForm/>
        )
    }
    return (
        <div>{sessionUser&&
            <div>{
                displayModal&&
                <DisplayImageModal setClose={()=>setDisplayModal(false)}>
                        <img src={image}/>
                </DisplayImageModal>
                }
                <h1>Wellcome {sessionUser?.name} {sessionUser?.lastName}</h1>
                <h1>Role <RoleColor role={sessionUser.role} bold={true} upperCase={true}/></h1>
                <img src={image} onClick={()=>setDisplayModal(true)}
                alt={sessionUser.name} style={{height: "300px"}}/>
                <div className="col-3">
                    <Dropzone  onChange={setImage} change_funct={handleUpload} drop_text={'image'} />
                </div>
                
            </div>
        }</div>
    )
}