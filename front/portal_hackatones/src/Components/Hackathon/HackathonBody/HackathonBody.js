import Links from '../../Links/Links';
import './HackathonBody.css';

function HackathonBody({h}) {

    const {organizer, hackathon_info, commnet, cover_picture} = h;
    const orgz = organizer[0].organizer;

    let url = `http://localhost:3001/static` + cover_picture || 'default.png' || '';


    return (
        <div className="hackathonBody">
            <div className="hackathonInfo">
                <h2>Decripcion del evento</h2>
                <p className="description-p">
                    {hackathon_info} </p>

                {
                (commnet) ? <p>Comentarios</p> : <p className="noCommentP">Este hackathon no tiene comentarios</p>
            } </div>
            <div className="hackathonAside">
                <h4>Organizado por</h4>
                <div className="organizerAsideData">
                    <img id="logoCompany"
                        src={url}
                        alt="logo-company"/>
                    <p>{
                        orgz.name
                    }</p>
                </div>

                <Links h={h}/>
            </div>
        </div>
    )
}


export default HackathonBody;
