import { useEffect,useState, useContext } from 'react';
import cardStyle from '../../assets/css/cards/GameCard.module.css'
import { getGameList } from '../../services/GameService';
import { GameCard } from '../cards/GameCard';
import ListContext from '../../context/ListProvider';
import ListModeChanger from './ListModeChanger';
import { Modal } from '../Modal';
import { AddGameForm } from '../games/AddGameForm';
import {AiOutlineAppstoreAdd as AddIcon } from 'react-icons/ai'

export function GameList() {        
    const {setPagination} = useContext(ListContext)
    const [showModalForm,setShowModalForm] = useState(false)
    const [games,setGames]=useState(null)

    const handleClose=()=>{
        setShowModalForm(false)
    }
    const loadGames=async (page) =>{
        try{
			const response= await getGameList(page)
			if(response){
                const page_info={
                    "current":response.number+1,
                    "total_pages":response.totalPages,
                    "total_items":response.totalElements,
                    "showing":response.numberOfElements,
                    "last":response.last,
                    "first":response.first
                }
                console.log(response.content)
                setPagination(page_info)
                setGames(response.content)
			}
		}catch(er){
		}
    }
    useEffect(()=>{
        loadGames()
    },[])

    return ( 
        <section>
            <div className={cardStyle.container_card}>
            <ListModeChanger leftOption={{icon:<AddIcon size={30}/>,
                text:'Add game', action:()=>setShowModalForm(true)}}/>
            {games?.length>0?
            (
                games?.map((game) =>(
                    <div key={game.id}>
                        <GameCard parameter={game}/>
                    </div>
                ))
            ):
            <div>Nothing to show</div>
            }
            </div>
            {showModalForm&&
                <Modal title={"Register a game"} setClose={()=>handleClose()}>
                    <AddGameForm game_edit={null} on_success={null}/>
                </Modal>
            }
        </section>
    )
}