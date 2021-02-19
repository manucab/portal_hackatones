import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import useFetch from '../../Hooks/useFetch'
import './Posts.css'

function Posts () {

    const [search, setSearch] = useState()
    const [result, setResult] = useState()
    const history = useHistory()


    const posts = useFetch('http://localhost:3001/blog')
    if(!posts) return 'Loading ...'

    

    const handleSubmit = async (e) => {

        e.preventDefault()


        const url = `http://localhost:3001/blog/filter/?filter=${search}`
        const res = await fetch(url)
        const data = await res.json()

        setResult(data)
   
    }

    return(
        
        <div className="posts-component">
             <Helmet>
                <meta charSet="utf-8"/>
                <title>Blog</title>
            </Helmet>

            <form className="posts-form" onSubmit={handleSubmit}>
                <label>Busca un artículo</label>
                <input className="posts-input" placeholder="Palabra(s) clave" value={search} onChange={e => setSearch(e.target.value)}></input>
                <div className='serch-result-text'>{result? `Se han encontrado ${result.length} articulos` : null}</div>
            </form>

            
                {!result?
                    posts.map(p => {

                    return(
                        <div className="post" key={p.id} onClick={() => {return history.push(`/blog/post/${p.id}`)} }>
                            <div className="post-title"><h1>{p.title}</h1></div>
                            <div className="post-date"><h6>{p.publication_date.split('T')[0]}</h6></div>
                            {/* <div className="post-title"><h1>{p.title}</h1></div> */}
                            <div className="post-content"><p>{p.content}</p></div>
                            <div className="see-more"><h3>Leer más</h3></div>
                        </div>
                    )
                    
                    }):
                    result.map(p => {

                        return(
                            <div className="post" key={p.id}>
                                <div className="post-title"><h1>{p.title}</h1></div>
                                <div className="post-date"><h6>{p.publication_date.split('T')[0]}</h6></div>
                                {/* <div className="post-title"><h1>{p.title}</h1></div> */}
                                <div className="post-content"><p>{p.content}</p></div>
                                <div className="see-more"><h3>Leer más</h3></div>
                            </div>
                        )
                    })
                }
                
          


        </div>


    )

}

export default Posts
