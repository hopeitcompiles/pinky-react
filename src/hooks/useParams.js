import { useState } from "react";
import { useLocation } from "react-router-dom";

function useParams() {
    const {search}=useLocation()
    const [params,setParams]=useState([])

    const addParam=({name,value})=>{

    }
    const getParams=()=>{
      
    }
}
