import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import './Post.css'

function Post () {

    const history=useHistory()
    const {id} = useParams()
        
    const posts = useFetch('http://localhost:3001/blog')
    
   
    const p = useFetch(`http://localhost:3001/blog/post/${id}`)
    if(!p) return 'Loading ...'

    const ids = posts.map(p => parseInt(p.id)).sort((a,b) => a - b)
    const idIndex = ids.indexOf(parseInt(id))
    const nextId = idIndex + 1
    const previousId = idIndex -1

    const isFirst = ids[previousId] === undefined 
    const isLast = ids[nextId] === undefined
    console.log(isLast)
    const nextPost = `/blog/post/${ids[nextId]}`
    const previousPost = `/blog/post/${ids[previousId]}`


    return(
         
        <div className="full-post-page">
            <div className="full-post">

                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>{p[0].title}</title>
                </Helmet>

                <div className="post-title"><h1>{p[0].title}</h1></div>
                <div className="post-date"><h6>{p[0].publication_date.split('T')[0]}</h6></div>
                {/* <div className="post-title"><h1>{p.title}</h1></div> */}
                <div className="full-post-content"><p>{p[0].content}</p></div>
            </div>
            <div className='post-buttons'>
                <button className={isFirst? 'off': 'on'} onClick={() => isFirst ? null : history.push(previousPost)}>Anterior</button>
                <button className={isLast? 'off': 'on'} onClick={() => isLast ? null : history.push(nextPost)}>Siguiente</button>
            </div>
        </div>    
    )

}

export default Post
