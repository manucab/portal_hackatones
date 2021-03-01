import './Comments.css';

function Comments({comment}) {


    let avatar = `http://localhost:3001/static` + comment.user.avatar || 'default.png' || '';

    return (
        <div className="comments">
            <fieldset className="legend">
                <legend >
                <div className="userComment">
                <img src={avatar} alt="avatar"/>
                <span>{comment.user.name}</span>
            </div>
                </legend>

            <div className="comment">
                <p>{comment.comment}</p>
            </div>
            </fieldset>
        </div>
    )
}


export default Comments;
