import HeaderHack from './HeaderHack/HeaderHack';
import HackathonBody from './HackathonBody/HackathonBody';
import useFetch from '../../Hooks/useFetch';
import {useParams} from 'react-router-dom';
import './Hackathon.css';
function Hackathon() {


    const {id} = useParams();

    const hackathon = useFetch(`http://localhost:3001/hackathon/${id}`);

    if (! hackathon) 
        return 'Loadin ...';
    
        console.log('hackathon :>> ', hackathon);

    return (
        <div className="hackathonId">

            <HeaderHack h={
                hackathon[0]
            }/>

            <HackathonBody h={
                hackathon[0]
            }/>


        </div>
    )
}

export default Hackathon;
