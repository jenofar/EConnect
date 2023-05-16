import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
// import "../components/LogSignup.css";
import {useFormik} from 'formik'
import axios from 'axios';
import userContext from '../context';
import {useContext} from "react"

export default function AddqueryForm() {
    var head=useContext(userContext)

    async function addquery(){
        await axios.post('http://localhost:3002/api/v1/query/add',{
            query:formik.values.query,
            department:formik.values.department
        },{headers:{
            'Content-Type':'application/json',
            'x-auth-token':head.auth
           }}).then(res=>{
           console.log(res.data);
          })
    }

  const formik=useFormik({
    initialValues:{
      query:"",
      department:"",
      
    },
    onSubmit:(values)=>{
      console.log(values);
      addquery();
      
    },
    validate:(values)=>{
      let errors = {};
        if (!values.query) {
        errors.query = 'Required';
        } 
        if(!values.department) errors.department="Required";
        return errors;
    }
  })
  return (
    
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Query</label>
            <input id="email_lower" name="query"  type="text" className="form-control" placeholder="Enter Query" onChange={formik.handleChange} value={formik.values.query}  />
                    {formik.errors.query ? <div style={{ color: "red" }} >{formik.errors.query}</div> : 
        null}
          </div>

          <div className="form-group">
            <label>Department</label>
            <input id="department" placeholder='enter department' className="form-control" name="department" type="text"
        onChange={formik.handleChange} value={formik.values.department} /><br></br>
        {formik.errors.department ? <div style={{ color: "red" }} 
        >{formik.errors.department}</div> : null}
          </div>

         

          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block"
          >
            Submit
          </button>
         
        </form>
     
  );
}