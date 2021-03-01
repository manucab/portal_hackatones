import {useState} from 'react'
import { useSelector } from 'react-redux'
import './StarRating.css'

function StarRating (props) {

    const [rate,setRate] = useState(0)
    const [hover,setHover] = useState(0)

    const login = useSelector(s => s.login)

    const handleClose = props.handleClose
    const id = login.user.id
    const idHackathon = props.idHackathon

    const handleClick = async e => {

        e.preventDefault()
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization':login.token
        }
    
    
        const ret = await fetch(`http://localhost:3001/user/${id}/${idHackathon}/rate`, {
            headers,
            body: JSON.stringify(
                {
                    rate
                }
            ),
            method: 'PUT'
        })
        
        if(ret.status === 200){
    
            alert('¡Gracias por valorar el hackathon!');
            handleClose()
            window.location.reload();
        }

    }

    return (
        
        <div className="star-rating">
            <div className="star-rating-buttons">
                {[...Array(5)].map((star,index) => {
                    index +=1
                    return (
                    
                        <button
                            type="button"
                            key={index}
                            onClick={() => setRate(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rate)}
                        >
                            <span className={index <= (hover ||rate) ? "star-on" : "star-off"}>&#9733;</span>
                        </button>

                    )
                })}
            </div>

            <div className="rate-text"> Valorar este hackathon con un<div className="rate-number">{hover}</div></div>
            <button id="send-rate" type="button" onClick={handleClick} >Valorar</button>
        
        </div>
    )


}

export default StarRating