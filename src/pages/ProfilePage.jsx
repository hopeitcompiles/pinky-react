import { useContext, useEffect, useState } from "react"
import { AuthForm } from "../components/authentication/AuthForm"
import UserContext from "../context/UserProvider"
import { Modal as DisplayImageModal } from "../components/Modal"
import { Dropzone } from "../components/Dropzone"
import { getUserInfo, saveUserImage as update_image_func} from "../services/UserService"
import RoleColor from "../components/RoleColor"
import Style from '../assets/css/Profile.module.css'
import { useLocation, useParams } from "react-router-dom"
import About from "./Profile/About"
import Activity from "./Profile/Activity"
import { get_default_user_image, set_dom_title } from "../utils/GlobalElements"

const user_image_default=get_default_user_image()

export function ProfilePage(){
    const {userid} = useParams();
    const [profile,setProfile]=useState(null)
    const [image,setImage]=useState(user_image_default)
    const {sessionUser} = useContext(UserContext)
    const [displayModal,setDisplayModal]=useState(false);
    const [body,setBody]=useState(<Activity profile={profile} image={image}/>)
    const location=useLocation().pathname

    const handleUpload=async (FormData)=>{
        await update_image_func(null,FormData)
    }
    const handleAbout =async ()=>{
        setBody(<About profile={profile}/>)
    }
    const handleActivity =async ()=>{
        setBody(<Activity profile={profile} image={image}/>)
    }
    const loadUser=async (id)=>{
       const response= await getUserInfo(id)
        if(response.status===200){
            setProfile(response.data)
        }            console.log(response)

    }
    useEffect(()=>{
        if(profile?.image){
            setImage(profile.image)
        }else{
            setImage(user_image_default)
        }
        set_dom_title(`${profile?.name}'s profile`)
        return ()=>{
            set_dom_title()
        }
    },[profile])
    
    useEffect(()=>{
        if(location==='/profile' && sessionUser){
            setProfile(sessionUser)
            return;
        }
        if(!userid){
            return;
        }
        loadUser(userid)
    },[location,sessionUser])

    if(location==='/profile' && !sessionUser){
        return(
            <AuthForm/>
        )
    }
    return (
        <div >{sessionUser&&
            <div className={`${Style.body}`}>{
                displayModal&&
                <DisplayImageModal setClose={()=>setDisplayModal(false)}>
                        <img src={image}/>
                </DisplayImageModal>
                }
                <div className={`container`}>
                <div className={`row`}>
                    <div className={`col-md-12`}>
                        <div id="content" className={`${Style.content} ${Style.content_full_width}`}>
                            {/* <!-- begin profile --> */}
                            <div className={`${Style.profile}`}>
                            <div className={`${Style.profile_header}`}>
                                {/* <!-- BEGIN profile-header-cover --> */}
                                <div className={`${Style.profile_header_cover}`}></div>
                                {/* <!-- END profile-header-cover --> */}
                                {/* <!-- BEGIN profile-header-content --> */}
                                <div className={`${Style.profile_header_content}`}>
                                    {/* <!-- BEGIN profile-header-img --> */}
                                    <div className={`${Style.profile_header_img}`}>
                                        <img src={image} alt={profile?.name} onClick={()=>setDisplayModal(true)}/>
                                    </div>
                                    {/* <!-- END profile-header-img --> */}
                                    {/* <!-- BEGIN profile-header-info --> */}
                                    <div className={`${Style.profile_header_info}`}>
                                        <h4 className="m-t-10 m-b-5">{profile?.name} {profile?.lastName}</h4>
                                        <p className="m-b-10"><RoleColor role={profile?.role} bold={true}
                                        upperCase={true}/></p>
                                        <a href="#" className="btn btn-sm btn-info mb-2">Edit Profile</a>
                                    </div>
                                    {/* <!-- END profile-header-info --> */}
                                </div>
                                {/* <!-- END profile-header-content --> */}
                                {/* <!-- BEGIN profile-header-tab --> */}
                                <ul className={`${Style.profile_header_tab} nav nav-tabs`}>
                                    <li onClick={()=>handleActivity()} className="nav-item"><a  target="__blank" className="nav-link">Activity</a></li>
                                    <li onClick={()=>handleAbout()} className="nav-item"><a className="nav-link">ABOUT</a></li>
                                    <li className="nav-item"><a target="__blank" className="nav-link">PHOTOS</a></li>
                                    <li className="nav-item"><a  target="__blank" className="nav-link">VIDEOS</a></li>
                                    <li className="nav-item"><a  target="__blank" className={`nav-link ${Style.active} ${Style.show}`}>FRIENDS</a></li>
                                </ul>
                                {/* <!-- END profile-header-tab --> */}
                            </div>
                            </div>
                            {/* <!-- end profile --> */}
                            <div className={`${Style.profile_content}`}>
                            <div className={`${Style.tab_content} p-0`}>
                                {body}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        }</div>
    )
}