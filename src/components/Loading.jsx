import { VscLoading   as Spinner } from 'react-icons/vsc';
import style from './../assets/css/Loading.module.css'
export function Loading() {
  return (
    <div className={style.spinner}>
      <Spinner className={style.spinning} size={50}/>
      <a>Loading...</a>
    </div>
  )
}

