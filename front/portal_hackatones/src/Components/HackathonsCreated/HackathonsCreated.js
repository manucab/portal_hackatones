import { useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import useFetch from "../../Hooks/useFetch"
import CarouselHackathons from "../CarouselHackathons/CarouselHackathons"



function HackathonsCreated () {

    const login = useSelector(s => s.login)
    const {id} = useParams()
    const data = useFetch(`http://localhost:3001/user/${id}`)
    
    if(!data) return 'Loading...'
    const hackathonsCreated = data[2]
    if(!login) return <Redirect to='/'/>
    if(login.user.rol !== 'organizer') return <div></div>
   
    return(

        hackathonsCreated.length === 0 ? <div>No has creado ningún hackathon</div> :
        <div className="hackathonsCreated">
            <h1>Hackathons creados</h1>
            {hackathonsCreated.lenght !== 0 ?
                <CarouselHackathons hackathons={hackathonsCreated} organizer={true} />:
                <p>No has reado ningún hackathon</p>}

        </div>

    )

}

export default HackathonsCreated