import styleCard from '../../assets/css/cards/UserDetails.module.css'
import RoleColor from '../RoleColor'

export default function UserDetails({user,image}) {
  return (
    <div className={`${styleCard.container}`}>
        <figure className={`${styleCard.card} ${styleCard.red} ${styleCard.hover}`}>
            <figcaption>

                    <br/>
                    <p>Role <RoleColor role={user.role} bold={false}/></p>
                    <p>Gender {user?.gender}</p>
                    <p>State {user?.enabled?"Enabled":"Disabled"}</p>
                    <p>Account {user?.confirmed?"Confirmed":"No confirmed"}</p>
                    <p>Registered on {user?.created.split("T")[0]}</p>
                    <p>Birthdate {user?.birthday?.split("T")[0]}</p>
                    <p>ID {user?.id}</p>
                    <p>{user?.email}</p>
                    <h2>{user?.name} <span>{user?.lastName}</span></h2>
            </figcaption>
            <div className={`${styleCard.image}`}><img src={image} alt="sample4"/></div>
            </figure>
    </div>
  )
}
