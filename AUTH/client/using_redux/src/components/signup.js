import {useRef, useState} from 'react'
import axios from 'axios';
import { useFormik } from 'formik';


const validate = values => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'password must be more than 6 letters';
    }

  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  }; 
const Signup = () => {
    const emailref = useRef();
    const passwordref = useRef();
    const onsubmit= async (e)=>{
        e.preventDefault();
        const email = emailref.current.value;
        const password = passwordref.current.value;
        axios.post('http://localhost:8080/signup',{email,password})
        .then(()=>{console.log('req success')})
        .catch(()=>{console.log('req failed')})

    }
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validate,
        onSubmit: values => {
            // e.preventDefault();
            const email = values.email;
            const password = values.password
            axios.post('http://localhost:8080/signup',{email,password})
            .then(()=>{console.log('req success')})
            .catch(()=>{console.log('req failed')})
        },
      });
      return (
        <form onSubmit={formik.handleSubmit}>
    
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
    
          <button type="submit">Submit</button>
        </form>
      );
}
 
export default Signup;