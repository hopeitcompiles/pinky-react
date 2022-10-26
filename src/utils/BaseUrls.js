const API_VERSION=''
const HOST=`http://localhost:5000/`
const BASE_URL=`${HOST}${API_VERSION}`
const BASE_APP_URL=`${BASE_URL}app/`
const BASE_IMAGE_URL=`${BASE_APP_URL}image/`

const loginUrl=()=> {
  return `${HOST}login`;
}
const baseUrl=()=> {
    return BASE_URL;
  }
const baseImgUrl=()=> {
  return BASE_IMAGE_URL;
}
const baseAppUrl=()=> {
  return BASE_APP_URL;
}
export {baseUrl,baseImgUrl,baseAppUrl,loginUrl}