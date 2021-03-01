import {useEffect, useState} from "react";

function useFetchPostEnrrol(params, registerOk, url, login) {

    const [data, setData] = useState();

    if(!login){
        login = null;
    }



    useEffect(() => {


        const headers = {
            'Content-Type': 'application/json',
      Authorization: (login) ? login.token : ''
        }

        registerOk === 1 && fetch(url, {
            headers,
            body: JSON.stringify(params),
            method: 'POST'
        }).then(res => setData(res))
            

    }, [registerOk])
    return data;

}


export default useFetchPostEnrrol;