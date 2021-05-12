import {useRef} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import jwt from 'jsonwebtoken'
const Login = () => {
    const history = useHistory();
    const emailref = useRef();
    const passwordref = useRef();
    const requireAuth = ()=> {
        const token = localStorage.getItem('jwt');
        
    }
    const onsubmit= async (e)=>{
        e.preventDefault();
        const email = emailref.current.value;
        const password = passwordref.current.value;
        axios.post('http://localhost:8080/login',{email,password},{
            'Content-Type': 'application/json',
        })
        .then((res)=>{
            // console.log(res.data.jwt)
            if (res.data.jwt){
            localStorage.setItem('jwt',JSON.stringify(res.data));
            }
            history.push('/home');
            return res.data
            
        })
        .catch((err)=>{console.log('req failed')})


    }
    return ( <>
    <form onSubmit={onsubmit}>
            <h1>login</h1>
            <input type="text" placeholder="email" ref={emailref}/><br/><br/>
            <input type="password" placeholder="password" ref={passwordref}/><br/><br/>
            <button type="submit">Submit</button><br/>

        </form>
    </> );
}
 
export default Login;