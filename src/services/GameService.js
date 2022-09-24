import axios from "axios"
import { getElementsAsPageableList } from "../utils/ApiClient"
import { baseImgUrl, baseUrl } from "../utils/BaseUrls"
const base_url=baseUrl()
const default_path='games'
const gameImageUrl=baseImgUrl()+'game/'
 
const getGameList=(page)=> {
  return getElementsAsPageableList(page,'','public/'+default_path)
}
const RegisterGame = async (game) => { 
  let url= base_url+'games/register'    
  const response = await axios.post(url,game).then(result => result)
  return response
}

const saveGameFile  = async (gameId,formData)  => { 
  console.log(formData)
  let url= base_url+`games/${gameId}/files/upload`
  const response =axios.post(url,formData,{
      headers:{
          "Content-Type":"multipart/from-data",
      }            
      ,withCredentials:true

  }).then(response => response)
  return response;
}
const getGameInfoById=async (gameId)=>{
  let url= base_url+'public/games/info/'+gameId    
  const response = await axios.get(url).then(result => result)
  return response
}
const getGameFilesById=async (gameId)=>{
  let url= base_url+'public/games/files/'+gameId    
  const response = await axios.get(url).then(result => result)
  return response
}

const getGameImage= async (game_id)=>{
  const response =await axios.get(`${gameImageUrl}${game_id}`).then(response=>response)
    const img = "data:image/png;base64,"+response.data
    return img
}
export {getGameList,
  gameImageUrl,
  RegisterGame,
  saveGameFile,
  getGameInfoById,
  getGameFilesById,
  getGameImage}
