import { useState,useEffect,useContext } from 'react';
import { GrFormNext as Next, GrFormPrevious as Previous,GrUndo as Back } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import Style from '../../assets/css/list/Pagination.module.css'
import ListContext from '../../context/ListProvider';

const MAX_BUTTONS=5
const FootersList=()=>{
    const {pagination}=useContext(ListContext)
    const navigate = useNavigate();    
    const [buttons,setButtons]=useState([])

    const page_numbers=()=>{
        if(pagination.total_pages<=MAX_BUTTONS || pagination.current<(MAX_BUTTONS/2).toFixed() ){
            return [...Array(pagination.total_pages<MAX_BUTTONS?pagination.total_pages:MAX_BUTTONS).keys()]
        } if(pagination.current>pagination.total_pages-MAX_BUTTONS+MAX_BUTTONS/2){
            return Array.from({length: MAX_BUTTONS}, (_, index) => index + pagination.total_pages-MAX_BUTTONS);
        }
        return Array.from({length: MAX_BUTTONS}, (_, index) => index + pagination.current-(MAX_BUTTONS/2).toFixed());
    }

    useEffect(()=>{
        if(pagination){
            setButtons(page_numbers())
        }
    },[pagination])

    const handleclick=(value)=>{
        if(value === pagination?.current || value < 1 ||value >pagination?.total_pages){
            return;
        }
        navigate("?page="+value)
    }
    const handlelastpage=()=>{
        console.log("to last page")
        navigate("?page="+pagination.total_pages)
    }
    const handleClearParams=()=>{
        navigate("?page=1")
    }
    if(pagination.total_pages==0){
        return(
            <div className={Style.information}>
                <div>
                    <p>Nothing no show</p>
                    <p className={Style.back} onClick={handleClearParams}><Back size={30}/>&nbsp; Go back</p>
                </div>
        </div>
        )
    }
    return (
        <section>
            {pagination?.total_pages>1&&
            <div className={Style.foot_list}>
                <div className={Style.pagination}>
                    <a 
                    onClick={()=>handleclick(pagination.current-1)} className={`${pagination.first&& Style.disabled}`}>
                        <Previous size={20} />
                    </a>
                    {
                        buttons?.map((number) =>(
                            <a onClick={()=>handleclick(number+1)} key={number} className={`${pagination.current===(number+1)&&Style.active}`}
                            >{number+1}</a>
                        ))
                    }
                    <a onClick={()=>handleclick(pagination.current+1)}
                    className={`${pagination?.last&&Style.disabled}`}><Next size={20}/></a>
                </div>
            </div>
            }
            <div className={Style.information}>
                {(pagination?.current>pagination?.total_pages && pagination.total_pages>0)&&
                    <div>
                        <p>There's no page {pagination.current}</p>
                        <p className={Style.back} onClick={handlelastpage}><Back size={30}/>&nbsp; Go back to page {pagination.total_pages>0?pagination.total_pages:1}</p>
                    </div>
                }
                <a>Displaying {pagination?.showing} of {pagination?.total_items} elements</a>
            </div>
        </section>
    )
}
export default FootersList;