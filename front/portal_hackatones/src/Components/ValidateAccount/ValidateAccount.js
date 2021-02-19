import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {Link} from "react-router-dom";
import UserStats from "../UserStats/UserStats";

function ValidateAccount() {


    const {id, code} = useParams();

    const [state, setState] = useState(0);


    let res = false;

    useEffect(async () => {
        res = await activeAccount(id, code);
        setState(res);
    }, [])

    if (state === 0) 
        return 'loading...';;
    ;
    return (
        <div className="validateAccount">
            <ShowValideMsg state={state}/>
        </div>

    )
}


function ShowValideMsg({state}) {

    return (

        <div> {
            state === 500 && <p>Upss algo a fallado</p>
        }

            {
            state === 406 && <p>Su cuanta ya estaba activada</p>
        }

            {
            state === 200 && <p>Su cuenta ha sido activada satisfactoriamente</p>
        } </div>

    )
}

const activeAccount = async (id, code) => {

    let urlValidateAccount = `http://localhost:3001/user/validate/${id}/${code}`

    let ret = await fetch(urlValidateAccount, {method: 'POST'})

    console.log('ret :>> ', ret);

    console.log(ret.status);


    return ret.status;

}


export default ValidateAccount;
