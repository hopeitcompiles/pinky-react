import {getTestList}from '../../services/TestService';
import cardStyle from '../../assets/css/cards/UserCard.module.css'
import { GameCard } from '../cards/GameCard';

export function TestList() {
    const games = getTestList();

    if(games.length === 0){
        return <div>
             <br/><br/>
            <center><h1>Nothing to show</h1></center>
        </div>
    }

    return ( 
        <section>
            <div className={cardStyle.container_card}>
                {/* <ListModeChanger/> */}
                {
                    games.map((game) =>(
                        <div key={game.id}>
                            <GameCard parameter={game}/>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}