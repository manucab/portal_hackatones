import {Redirect, useParams} from "react-router";
import useActiveAccount from "../../Hooks/useActiveAccount";

function ValidateAccount() {

    const {id, code} = useParams();
    let urlValidateAccount = `http://localhost:3001/user/validate/${id}/${code}`


    const ret = useActiveAccount(urlValidateAccount);

    if (! ret) 
        return 'loading...';
    
    return (
        <div className="validateAccount">
            {
            ret.status === 500 && alert('Upss algo a fallado')
        }

            {
            ret.status === 406 && alert('Su cuanta ya estaba activada')
        }

            {
            ret.status === 200 && alert('Su cuenta ha sido activada satisfactoriamente')
        }

            <Redirect to="/"/>
        </div>
    )
}


export default ValidateAccount;
