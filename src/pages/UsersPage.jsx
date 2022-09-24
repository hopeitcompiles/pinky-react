import { useContext, useState } from "react"
import UserContext from "../context/UserProvider"
import { RegisterForm } from "../components/authentication/RegisterForm"
import { Modal as ModalForm } from "../components/Modal"
import { ListProvider } from "../context/ListProvider"
import { useEffect } from "react"
import { UserList } from "../components/list/UserList"

export default function UsersPage() {
    const [showModalForm,setShowModalForm] = useState(false)
    //get the logged in user from the Context
   // const {user} = useContext(UserContext)

    useEffect(()=>{
        console.log("rendered on UsersPage")   
    })
    const handleAddUser=()=>{
        setShowModalForm(true)
    }
    const handleClose=()=>{
        setShowModalForm(false)
    }

  return (
    <section >
        <ListProvider>
            <UserList add_user_func={handleAddUser} />
            {showModalForm&&
                <ModalForm title={"Register"} setClose={()=>handleClose()}>
                    <RegisterForm on_success={null}/>
                </ModalForm>
            }
        </ListProvider>
    </section>
  )
}
