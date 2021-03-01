import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


function useFetchExpiredJwt() {
    const [data, setData] = useState(undefined)
    const login = useSelector(s => s.login)

    useEffect(() => {
      
      const opts = {}
      if (login) {
          let url = `http://localhost:3001/user/${
            login.user.id
        }`
        opts.headers = { 'Authorization':login.token }
        fetch(url,opts)
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
      }

    }, [])
    return data
}

export default useFetchExpiredJwt;
