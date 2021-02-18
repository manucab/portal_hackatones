import useFetch from '../../Hooks/useFetch'
import './Posts.css'

function Posts () {

    let posts = useFetch(`http://localhost:3001/blog`)
    if(!posts) return 'Loading ...'

    console.log(posts)

    return(
        
        <div className="posts-component">

            <form className="posts-form">
                <label>Busca un artículo</label>
                <input className="posts-input" placeholder="Palabra(s) clave"></input>
            </form>

            
                {posts.map(p => {

                    return(
                        <div className="post">
                            <div className="post-title"><h1>{p.title}</h1></div>
                            <div className="post-date"><h6>{p.publication_date.split('T')[0]}</h6></div>
                            {/* <div className="post-title"><h1>{p.title}</h1></div> */}
                            <div className="post-content"><p>{p.content}</p></div>
                            <div className="see-more"><h3>Leer más</h3></div>
                        </div>
                    )
                    
                })}
          


        </div>


    )

}

export default Posts
