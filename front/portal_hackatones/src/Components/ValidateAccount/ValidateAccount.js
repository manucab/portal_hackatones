import {useEffect, useState} from "react";
import {useParams} from "react-router";
import useActiveAccount from "../../Hooks/useActiveAccount";

function ValidateAccount() {

    const {id, code} = useParams();
    let urlValidateAccount = `http://localhost:3001/user/validate/${id}/${code}`

    const ret = useActiveAccount(urlValidateAccount);

    if (! ret) 
        return 'loading...';
    

    return (
        <div className="validateAccount">
            <ShowValideMsg state={
                ret.status
            }/>
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


export default ValidateAccount;
