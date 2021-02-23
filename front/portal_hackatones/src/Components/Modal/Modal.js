import './Modal.css'

function Modal (props) {

    if(!props.show) {return null}

    return (

        <div className="modal">
            <div className="modalContent">
                <div className="modal-header">
                    <h3 className="modalTitle">{props.title}</h3>
                </div>
                <div className="modalBody">{props.children}</div>
                <button className="close-modal-button" onClick={props.onClose}>Cerrar</button>
            </div>
        </div>


    )
    
}

export default Modal