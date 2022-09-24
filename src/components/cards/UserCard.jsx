import cardStyle from '../../assets/css/cards/UserCard.module.css'
import {Dropzone} from '../Dropzone';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBinFill   as DeleteBtn, RiEdit2Fill as EditBtn, RiSearchEyeLine as InspectBtn } from 'react-icons/ri';
import { toggleEnableUser,deleteUser, getUserImage, getUserInfo } from '../../services/UserService';
import ListContext from '../../context/ListProvider';
import { saveUserImage as update_image_func, userImageUrl } from '../../services/UserService';
import { Modal as ModalForImage  } from '../Modal';
import { useReducer } from 'react';
import { RegisterForm } from '../authentication/RegisterForm';
import UserDetails from './UserDetails';
import RoleColor from '../RoleColor';
import { Link } from 'react-router-dom';
import { get_default_user_image } from '../../utils/GlobalElements';

const user_default_img=get_default_user_image()

export function UserCard({current_user,editable}) {
    const {listMode} = useContext(ListContext)
    const [cardUser,setCardUser]=useState( current_user)
    const [image,setImage]=useState(user_default_img)
    const [enabled,setEnable] = useState(cardUser.enabled)
    const [displayModal,setDisplayModal]=useState(false);

    const handleUpdateUser=async ()=>{
        const response=await getUserInfo(cardUser.id)
        if(response.status===200){
            setCardUser(response.data)
        }
    }
    const actionReducer=(state,action)=>{
        switch (action.type){
            case 'image':
                return { title:'',display:(
                    <img src={image}/>)}
            case 'delete':
                return { title:'Delete',display:(
                    <div>
                        <div>Are you sure you want to delete {cardUser.name}</div>
                        <button onClick={()=>setDisplayModal(false)}>No</button>
                        <button onClick={()=>handleDelete()}>Yes</button>
                    </div>
                )}
            case 'edit':
                return { title:'Edit',display:(
                    <RegisterForm user_edit={cardUser} on_success={()=>handleUpdateUser()}/>
                )}
            case 'inspect':
                return { title:`Details`,display:(
                    <UserDetails user={cardUser} image={image}/>
                )}
            default:
                return state
        }
    }
    const [action,dispatch]=useReducer(actionReducer,null)
    const handleReducer=(type)=>{
        dispatch({type:`${type}`})
        setDisplayModal(true)
    }

    useEffect(()=>{
        if(cardUser?.image){
            updateUserImage(cardUser.id)
        }else{
            setImage(user_default_img)
        }
    },[cardUser])

    const updateUserImage=async (id)=>{
        //const img=await getUserImage(id)
        setImage(cardUser.image)
    }

    const handleUploadImage=async (FormData)=>{
      await update_image_func(cardUser.id,FormData)
    }

    const handleToggle=async ()=>{
        try{
			const response=await toggleEnableUser(cardUser.id)
			if(response.status===200){
                setEnable(!enabled)
                console.log('toggled')
            }
		}catch(er){
		}
    }
    
    const handleDelete=async ()=>{
        try{
			const response=await deleteUser(cardUser.id)
			if(response.status===200){
                console.log('deleted')
            }
		}catch(er){
            console.log('something wrong')
		}
    }

  return (
    <div >
        {displayModal&&
        <ModalForImage setClose={()=>setDisplayModal(false)} 
            title={action.title}>
            {
            action.display
            }
        </ModalForImage>}
       
        <div className={`${listMode?cardStyle.list:cardStyle.card}`} id={cardUser.id}>
            <div className={cardStyle.top}>
                <div className={cardStyle.image_container}>
                    <img src={image} 
                        alt={cardUser.name} onClick={()=>handleReducer('image')}/>  
                </div>  
                <div className={`${cardStyle.information_display}`}>
                    <Link className={`${cardStyle.link}`} to={`/user/${cardUser.ign?cardUser.ign:cardUser.id}`}><h4 >{cardUser.name} {cardUser.lastName}</h4></Link>
                    <p >{cardUser.email} <br/>
                        <RoleColor role={cardUser.role} bold={true}/>
                    </p>
                </div>
            </div>
            <div className={`${cardStyle.bottom}`}>
                <div className={`${cardStyle.admin_area}`}>
                    <div className={`${cardStyle.checkbox} form-check form-switch`}>
                        <input disabled={editable} type="checkbox" className="form-check-input" checked={enabled} onChange={handleToggle}/>
                    </div>
                    <div className={cardStyle.container_btn}>
                        <button className={`${cardStyle.delete} ${cardStyle.admin_btn} 
                                ${editable&&cardStyle.disabled_btn}`} onClick={()=>handleReducer('delete')}  disabled={editable}>
                            <DeleteBtn size={20}/>
                        </button>
                        <button className={`${cardStyle.edit} ${cardStyle.admin_btn} 
                                ${editable&&cardStyle.disabled_btn}`} onClick={()=>handleReducer('edit')}  disabled={editable}>
                            <EditBtn size={20}/>
                        </button>
                        <button className={`${cardStyle.inspect} ${cardStyle.admin_btn} `} 
                                onClick={()=>handleReducer('inspect')}>
                            <InspectBtn size={20}/>
                        </button>
                    </div>
                </div>
                <div className={cardStyle.drop}>
                    <Dropzone editable={editable} onChange={setImage} change_funct={handleUploadImage} drop_text={'image'}/>
                </div>
            </div>
        </div>
    </div>
  )
}