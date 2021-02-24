import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import useFetch from "../../Hooks/useFetch"
import CarouselHackathons from "../CarouselHackathons/CarouselHackathons"



function HackathonsJoined () {

    const login = useSelector(s => s.login)
    const {id} = useParams()
    const data = useFetch(`http://localhost:3001/user/${id}`)
    
    if(!data) return 'Loading...'
    const hackathonsJoined = data[1]
   
    return(

        <div className="hackathonsJoined">
             <h1>Participaciones en hackathones</h1>

            {hackathonsJoined.length !== 0 ?
                <CarouselHackathons hackathons={hackathonsJoined} organizer={false} />:
                <p>No te has inscrito en ningún hackathon</p>}

        </div>

    )

}

export default HackathonsJoined