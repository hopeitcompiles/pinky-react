import { getElementsAsPageableList } from "../utils/ApiClient"
import axios from "axios"
import { baseImgUrl, baseUrl,loginUrl } from "../utils/BaseUrls"
const login_url=loginUrl()
const base_url=baseUrl()
const image_url=baseImgUrl()
const default_path='users'

const userImageUrl=()=>{
    return baseImgUrl()+'user/'
}

const toggleEnableUser = async (userId) => { 
    const response = axios.get(`${base_url}users/enable/${userId}`).then(result => result)
    return response
}
const deleteUser = async (userId) => { 
    const response = axios.delete(`${base_url}users/delete/${userId}`).then(result => result)
    return response
}

const getUserList=(page,search)=> {
  return getElementsAsPageableList(page,search,default_path+'/list')
}

const RegisterUser = async (user) => { 
    let url= base_url+'public/register'    
    const response = await axios.post(url,user).then(result => result)
    return response
}
const LoginUser = async (username,password) => { 
    const data = await axios.post(login_url,JSON.stringify({username,password}),
        {
            headers:
            {'Content-Type':'application/json',
            },
            withCredentials:true}
    ).then(result => result)
    return data
}

const getUserImage= async (user_id)=>{
    const response =await axios.get(`${image_url}user/${user_id}`).then(response=>response)
    const img = "data:image/png;base64,"+response.data
    return img
}
const getUserInfo= async (user_id)=>{
    const response =await axios.get(`${base_url}public/user/${user_id}`).then(response=>response)
    return response
}
const changeUserPassword= async (user_id,password)=>{
    const response = axios.post(`${base_url}users/password/${user_id}`,password).then(result => result)
    return response
}
const saveUserImage  = async (userId,formData)  => { 
    console.log(formData)

    let url=userId?`${base_url}${default_path}/${userId}/image/upload`:
        `${base_url}private/image/update`
    const response =axios.post(url,formData,{
        headers:{
            "Content-Type":"multipart/from-data",
        }            
        ,withCredentials:true

    }).then(response => response)
    return response;
}

export {getUserList,
    RegisterUser,
    LoginUser,
    userImageUrl,
    saveUserImage,
    getUserImage,
    toggleEnableUser,
    deleteUser,
    changeUserPassword,
    getUserInfo}