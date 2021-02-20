import Header from '../Hackathon/Header/Header';
import useFetch from '../../Hooks/useFetch';
function Hackathon() {


    let hackathon = useFetch('http://localhost:3001/hackathon/search/filters/');

console.log('hackathon :>> ', hackathon);

    return (
        <div className="hackathon">

        <Header />

        </div>
    )
}

export default Hackathon;
