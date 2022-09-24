import axios  from "axios"
import { baseUrl } from "./BaseUrls"
const base_url=baseUrl()
const PAGINATION_SIZE=20

const updateToken = (token) =>{
    axios.defaults.headers.common["Authorization"] = `${token}`;
}

const getElementsAsPageableList = async (page,search,path) => { 
    let parameter='?'
    parameter+=page!=='' && page?`page=${page}`:''
    
    parameter+=parameter!==''?'&':''
    parameter+=search!=='' && search?`search=${search}`:''

    parameter+=parameter!=='' && !parameter.endsWith("&")?'&':''

    parameter+=PAGINATION_SIZE?`size=${PAGINATION_SIZE}`:''
    const data = axios.get(`${base_url}${path}${parameter!=='?'?parameter:''}`).then(result => result.data)
    return data
}


const whoAmI = async () => { 
    const response = axios.get(`${base_url}users/whoami`).then(result => result)
    return response
}

export {getElementsAsPageableList,
    updateToken,
    whoAmI}