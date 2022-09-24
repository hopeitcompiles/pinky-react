import { useContext, useEffect, useState} from 'react';
import { Loading } from '../Loading';
import {Modal, Modal as ModalForForm} from '../Modal';
import catchError from '../../services/ErrorCatcher';
import UserContext from '../../context/UserProvider';
import { UserCard } from "../cards/UserCard"
import ListModeChanger from '../list/ListModeChanger';
import { RegisterForm } from '../authentication/RegisterForm';
import {  useSearchParams } from "react-router-dom";
import ListContext from '../../context/ListProvider';
import FootersList from './FooterList';
import { getUserList } from '../../services/UserService';
import {AiOutlineUserAdd as AddIcon } from 'react-icons/ai'
import cardStyle from '../../assets/css/list/UserList.module.css'

export function UserList({add_user_func}){
    let multipleSelect=[]
    //update the pagination for the navigation buttons
    const {setPagination,selecting} = useContext(ListContext)
    const {sessionUser} = useContext(UserContext)

    //loading state to show the loading screen or not
    const [isLoading, setIsLoading ]=useState(false)
        
    //the users list itself
    const [ usersList, setUsersList ] = useState(null)
    //error to display in screen
    const [ error, setError ] = useState("")

    const [pagePath, setPagePath] = useSearchParams()

    const page_in_path=pagePath.get("page")
    const search_in_path=pagePath.get("search")
    useEffect(()=>{
        console.log('rendered')
    })

    const handleCheck= (e)=>{
        if(e.target.checked){
            multipleSelect.push(e.target.value)
            
        }else{
            multipleSelect= multipleSelect.filter((value)=>{
                return value!==e.target.value
            })
        }
        console.log(multipleSelect)
    }
    

    const loadUsers=async () =>{
        setIsLoading(true)
        try{
            const search_param=search_in_path ? search_in_path:"";
            const pagenumber=page_in_path? page_in_path:1;
			const response= await getUserList(pagenumber,search_param)
			if(response){
                const page_info={
                    "current":response.number+1,
                    "total_pages":response.totalPages,
                    "total_items":response.totalElements,
                    "showing":response.numberOfElements,
                    "last":response.last,
                    "first":response.first
                }
                setPagination(page_info)
                setUsersList(response.content)
			}
		}catch(er){
            setUsersList(null)
			setError(catchError(er))
		}
        setIsLoading(false);
    }

    useEffect(()=>{
        setError("")
        if(!sessionUser){
            setUsersList([])
            setError("You must be logged in")
            return;
        }
        loadUsers()
    },[page_in_path,search_in_path,sessionUser])

    if(isLoading){
        return <Loading/>
    }
    
    if(error!==""){
        return <div>
             <br/><br/>
            <center><h1>{error}</h1></center>
        </div>
    }

    return (
        <section>
            <div className={`${cardStyle.container_card}`}>
                <ListModeChanger leftOption={{icon:(<AddIcon size={30}/>)
                ,text:'Add user',action:add_user_func}} displayMode={true} multipleSelection={true}/>
            {
                usersList?.map((user) =>(
                    <div key={user.id} className={cardStyle.multiple_select} >
                        {selecting&& <input type='checkbox' 
                        onChange={(e)=>handleCheck(e)} value={user.id}/>}
                        <UserCard current_user={user} 
                        editable={(sessionUser?.role?.level<=user?.role?.level && sessionUser.id!==user.id)}/>
                    </div>
                ))
            }
           </div>
           <FootersList/>
        </section>
    );
}