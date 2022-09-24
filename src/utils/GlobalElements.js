import defaul_user_image from '../assets/images/default_user.png'

const default_title="Pinky Test"
const get_default_user_image=()=>{
    return defaul_user_image;
}
const set_dom_title=(title)=>{
    document.title=title?title:default_title
}

export{
    get_default_user_image,set_dom_title
}