import {useState} from 'react'
import './StarRating.css'

function StarRating () {

    const [rating,setRating] = useState(0)
    const [hover,setHover] = useState(0)

    return (
        
        <div className="star-rating">
            {[...Array(5)].map((star,index) => {
                index +=1
                return (
                    <button
                        type="button"
                        key={index}
                        
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className={index <= (hover ||rating) ? "star-on" : "star-off"}>&#9733;</span>

                    </button>
                )
            })}

            <div className="rate-text"> Valorar este hackathon con un<div className="rate-number">{hover}</div></div>
            <button id="send-rate" type="button">Valorar</button>
        
        </div>
    )


}

export default StarRating