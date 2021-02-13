import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import useFetch from "../../Hooks/useFetch"
import CarouselHackathons from "../CarouselHackathons/CarouselHackathons"



function HackathonsCreated () {

    const login = useSelector(s => s.login)
    const {id} = useParams()
    const data = useFetch(`http://localhost:3001/user/${id}`)
    
    if(!data) return 'Loading...'
    const hackathonsCreated = data[2]
   
    return(


        hackathonsCreated.length === 0 ? <div>No has creado ningún hackathon</div> :
        <div className="hackathonsCreated">

            <div>Carrusel de hackathones</div>
            <CarouselHackathons hackathons={hackathonsCreated} />

        </div>

    )

}

export default HackathonsCreated