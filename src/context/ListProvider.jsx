import { createContext, useState } from "react";
const ListContext=createContext();

const ListProvider=({children})=>{
    const [listMode,setListMode] = useState(false)
    const [selecting,setSelecting] = useState(false)
    const [pagination,setPagination]=useState([])
    const [editingItem,setEditingItem]=useState(null)
    const data = {listMode,setListMode,
        editingItem,setEditingItem,
        pagination,setPagination,selecting,setSelecting}

    return (
        <ListContext.Provider value={data}>
            {children}
        </ListContext.Provider>
    )
}
export {ListProvider}
export default ListContext;