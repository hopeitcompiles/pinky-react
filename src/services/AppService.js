import axios from "axios"
import { baseAppUrl } from "../utils/BaseUrls"

const base_url=baseAppUrl()

const get_roles=async ()=>{
    let url= base_url+'roles'   
    const response = await axios.get(`${url}`).then(result => result)
    return response
}

export{
    get_roles
}