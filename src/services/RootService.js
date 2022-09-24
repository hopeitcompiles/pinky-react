import axios from "axios"
import { baseUrl } from "../utils/BaseUrls"

const base_url=baseUrl()+"super/"

const get_root_roles=async ()=>{
    let url= base_url+'roles'   
    const response = await axios.get(`${url}`).then(result => result)
    return response
}
const update_rol=async (role)=>{
    let url= base_url+'role/update'   
    const response = await axios.post(`${url}`,role)
    return response
}
export{
    get_root_roles,update_rol
}