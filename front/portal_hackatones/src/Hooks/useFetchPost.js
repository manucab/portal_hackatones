import {useEffect, useState} from "react";

function useFetchPost(params, registerOk, url) {

    const [data, setData] = useState();

    useEffect(() => {

        const headers = {
            'Content-Type': 'application/json'
        }

        registerOk === 1 && fetch(url, {
            headers,
            body: JSON.stringify(params),
            method: 'POST'
        }).then(res => setData(res))
            

    }, [registerOk])
    return data;

}


export default useFetchPost;
