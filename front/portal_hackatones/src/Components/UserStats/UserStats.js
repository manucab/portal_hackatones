import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import './UserStats.css'


function showStats (data) {

    return(

        <div className='stats-section'>
            <div className="stats">
                <div className='stat'>{data[3][0].participations}</div>
                <div>Participaciones</div> 
            </div>
            <div className="stats">
                <div className='stat' >{data[3][0].best_position+'º'}</div>
                <div>Mejor Puesto</div> 
            </div>
            <div className="stats">
                <div className='stat' >{data[3][0].avg_position+'º'}</div>
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

    return(

        <div className="profile" >
             <h1>Consulta tus estadísticas</h1>
            {showStats(data)}
        </div>

    )

}

export default UserStats