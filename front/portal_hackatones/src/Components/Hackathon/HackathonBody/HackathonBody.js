import Links from '../../Links/Links';
import './HackathonBody.css';

function HackathonBody({h}){

    const { organizer,hackathon_info, commnet
        }= h;
    const orgz = organizer[0].organizer;

    return(
        <div className="hackathonBody">
            <div className="hackathonInfo">
                <h2>Decripcion del evento</h2>
                <p>
                    {hackathon_info}
                </p>

              {(commnet) ?  <p>Comentarios</p> : <p>No hay Comentarios en este hackathon</p>}

            </div>
            <div className="hackathonAside">
            <h4>Organizado por</h4>
            <p>{orgz.name}</p>
            <Links h={h}/>
            </div>
        </div>
    )
}



export default HackathonBody;