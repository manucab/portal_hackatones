import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import './UserStats.css'


function showStats (data) {

    return(

        <div className='userStats'>
            <div className="stats">
                <div className='stat'>{data[3][0].participaciones}</div>
                <div>Participaciones</div> 
            </div>
            <div className="stats">
                <div className='stat' >{data[3][0].mejor_puesto+'º'}</div>
                <div>Mejor Puesto</div> 
            </div>
            <div className="stats">
                <div className='stat' >{data[3][0].puesto_medio+'º'}</div>
                <div>Puesto Medio</div> 
            </div>
            
        </div>

    )
}


function UserStats() {

    const login = useSelector(s => s.login)
    const {id} = useParams()
    const data = useFetch(`http://localhost:3001/user/${id}`)
        
    if(!data) return 'Loading...' 
    if (!login) return <Redirect to="/" />

    console.log(data)


    return(

        <div className="profile" >
            {showStats(data)}
        </div>

    )

}

export default UserStats