import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { GameFrame } from './GameFrame';
import cardStyle from '../../assets/css/GamePage.module.css'
import { getGameFilesById, getGameInfoById } from "../../services/GameService";
import { getUserImage } from "../../services/UserService";
import { get_default_user_image } from "../../utils/GlobalElements";

const user_defaul_image=get_default_user_image()

export function GamePage() {
    const {gameid} = useParams();
    const [game,setGame]=useState(null)
    const [files,setFiles]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    const [authorImage,setAuthorImage]=useState(user_defaul_image)

    const loadGame=async (gameid)=>{
        const response=await getGameInfoById(gameid)
        setGame(response.data)
        setIsLoading(false)
    }

    const loadFiles=async ()=>{
        const game_files=await getGameFilesById(game?.id)
        console.log(game_files.data)
        setFiles(game_files.data)
    }
    const updateAuthorImage=async ()=>{
        // const img=await getUserImage(game?.author?.id)
        if(game?.author?.image){
            setAuthorImage(game?.author?.image)
        }
          
    }
    useEffect(()=>{
        if(!gameid){
            return;
        }
        loadGame(gameid)
    },[gameid])

    useEffect(()=>{
        if(!game){
            return;
        }
        if(game?.author?.image){
            updateAuthorImage()
        }
        loadFiles()
    },[game])
    
    if(isLoading){
        return <Loading/>
    }
    return (      
        <section>        
            <div className={cardStyle.container_game}>
                <div className={cardStyle.frame}>
                    {files?
                        <GameFrame files={files} className={cardStyle.game}/>
                    :
                        <Loading/>
                    }
                </div>
                <div className={cardStyle.info}>
                    <h1 className={cardStyle.title}>{game?.title}</h1>
                    <p>{game?.description}</p>
                    <h6>{game?.views&& `${game.views} views`}</h6>
                    <img src={authorImage} className={cardStyle.author_thumb}/>
                    <br/>
                    <h5>by {game?.author?.name} {game?.author?.lastName}</h5>
                    {/* <img src={`/assets/images/${game.name}_controls.png`} className={"img-fluid rounded"} alt={game.name}/>                             */}
                </div>
            </div>
        </section>  
    );
}