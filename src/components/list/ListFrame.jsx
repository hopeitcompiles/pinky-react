import { ListProvider } from "../../context/ListProvider";
import cardStyle from '../../assets/css/list/ListMode.module.css'
 



export function ListFrame({children}) {

    return (
        <section className={cardStyle.container_list}>
             <ListProvider>
                {children}
            </ListProvider>
        </section>
    )
}