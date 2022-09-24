import axios from "axios"
import { baseUrl } from "../utils/BaseUrls"
const base_url=baseUrl()+"admin/"

const delete_by_email=async (email)=>{
    let url= base_url+'deletebyemail/'   
    console.log("deleting "+email+" on "+url) 
    const response = await axios.delete(`${url}${email}`).then(result => result)
    return response
}
const get_short_users=async ()=>{
    let url= base_url+'short_list/'   
    console.log("gettin users on "+url) 
    const response = await axios.get(`${url}`).then(result => result)
    return response
}
export {delete_by_email,get_short_users}
