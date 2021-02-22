import { useState } from "react";
import './Acordeon.css'


function Acordeon (props) {
    
     const [on,setOn] = useState(false)

    return (

        <div className="acordeon">
            <button type="button" onClick={() => setOn(!on)} >{props.button_text}</button>
            {on? props.children : null}
        </div>
            
    )

}

export default Acordeon