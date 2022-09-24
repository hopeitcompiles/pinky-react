import cardStyle from '../../assets/css/cards/GameCard.module.css'
import {GoAlert as Bad,GoCheck as Good} from 'react-icons/go'


export function GameFilesCard({gameFiles,type}) {
    if(type==="UNITY"){
        return (
            <section>
                {type==="UNITY"&&
                <div className={cardStyle.container_file}>
                    <i>{gameFiles?.data?<Good color='darkgreen'/>:<Bad color='darkred'/>}Data</i>&nbsp;
                    <i>{gameFiles?.framework?<Good color='darkgreen'/>:<Bad color='darkred'/>}Framework</i>&nbsp;
                    <i>{gameFiles?.loader?<Good color='darkgreen'/>:<Bad color='darkred'/>}Loader</i>&nbsp;
                    <i>{gameFiles?.wasm?<Good color='darkgreen'/>:<Bad color='darkred'/>}Wasm</i>
                </div>
                }
            </section>
        )
    }
}