import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
const Home = () => {
    const [token,settoken] =useState(null);
    const [email,setemail] =useState('');
    
    const history = useHistory();
    const logOut = () =>{
        localStorage.removeItem("jwt");
        history.push('/login');
    }

    useEffect(() =>{
        settoken(JSON.parse(localStorage.getItem('jwt')));
    },[])
    const getCurrentUser=()=> {
        axios.post('http://localhost:8080/getuser',{token},{
            'Content-Type': 'application/json',
        })
        .then((res)=>{console.log(res)
                        setemail(res.data.email)})
        .catch((err)=>{console.log(err)})
    }
    return ( <>
    <h1>HOme</h1>
    {token ? <h5>you are logged in</h5>:<h5>please login first</h5>}
    <button onClick={logOut}>Log Out</button>
    <button onClick={getCurrentUser}>See User</button>
    {token ? (<><h5>{token.jwt}</h5><br/><h5>{email}</h5></>):<h5>please login first</h5>}

    </> );
}
 
export default Home;