import { Link } from 'react-router-dom'
import axios from 'axios'
const Main = () => {
    const getdata =()=>{
        axios.get('http://localhost:8080/home')
        .then((res)=>{console.log(res.data)})
        .catch((err)=>{console.log(err)})
    }

    return ( <>
    <Link to={"/home"}><button onClick={getdata}>home</button></Link>
    <Link to={"/signup"}><button>sign up</button></Link>
    <Link to={"/login"}><button>login</button></Link>

    
    </> );
}
 
export default Main;