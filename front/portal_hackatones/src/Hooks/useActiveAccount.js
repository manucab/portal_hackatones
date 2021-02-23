import {useEffect, useState} from "react";

function useActiveAccount(url) {

    const [data, setData] = useState();

    useEffect(() => {

        const headers = {
            'Content-Type': 'application/json'
        }

     fetch(url, {
            headers,
            method: 'POST'
        }).then(res => setData(res))
            

    }, [])
    return data;

}


export default useActiveAccount;
