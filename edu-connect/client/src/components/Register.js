// import React, { Component } from "react";
// import "../components/LogSignup.css";
// import {useFormik} from 'formik'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";

// export default function SignUp() {

//   const navigate = useNavigate();
//   async function postreg(){
//     axios.post('http://localhost:3002/api/v1/student/register',{
//         name:formik.values.name,
//         rollno:formik.values.rollno,
//         department:formik.values.department,
//         course:formik.values.course,
//         password:formik.values.password,
//     }).then(res=>{
//         if(res.data==="Roll no already registered") return alert("Roll no already registered")
//         alert(res.data)
//         navigate('/')
//     })
// }

//   const formik=useFormik({
//     initialValues:{
//       name:"",
//       rollno:"",
//       department:"",
//       course:"",
//       password:"",
      
//     },
//     onSubmit:(values)=>{
//       console.log(values);
//       postreg()
//     },
//     validate:(values)=>{
//       let errors = {};
//         if (!values.name) {
//         errors.name = 'Required';
//         } 
//         if (!values.rollno) {
//             errors.rollno = 'Required';
//             } 
//             if (!values.department) {
//                 errors.department = 'Required';
//                 } 
//                 if(!values.course){
//                     errors.course='Required'
//                 }
//         if(!values.password) errors.password="Required";
//         return errors;
//     }
//   })
//   return (
//     <>
//       <div className="outer">
//         <div className="inner">
//           <form onSubmit={formik.handleSubmit}>
//             <h3>Register</h3>

//             <div className="form-group">
//               <label>Name</label>
//               <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} type="text" className="form-control" placeholder="Name" />
//             </div>

//             <div className="form-group">
//               <label>Roll No</label>
//               <input id="rollno" name="rollno" onChange={formik.handleChange} value={formik.values.rollno} type="text" className="form-control" placeholder="Roll No" />
//             </div>

//             <div className="form-group">
//               <label>Department</label>
//               <input  id="department" name="department" onChange={formik.handleChange} value={formik.values.department} type="text" className="form-control" placeholder="Enter department" />
//             </div>
//             <div className="form-group">
//               <label>Course</label>
//               <input  id="course" name="course" onChange={formik.handleChange} value={formik.values.course} type="text" className="form-control" placeholder="Enter course" />
//             </div>

//             <div className="form-group">
//               <label>Password</label>
//               <input  id="password" name="password" onChange={formik.handleChange} value={formik.values.password} type="password" className="form-control" placeholder="Enter password" />
//             </div>

//             <button type="submit" className="btn btn-dark btn-lg btn-block">
//               Register
//             </button>
//             <p className="forgot-password text-right">
//               Already registered <a href="/">log in?</a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { Component } from "react";
import "../components/LogSignup.css";
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const navigate = useNavigate();
  async function postreg() {
    axios.post('http://localhost:3002/api/v1/student/register', {
      name: formik.values.name,
      rollno: formik.values.rollno,
      department: formik.values.department,
      course: formik.values.course,
      password: formik.values.password,
    }).then(res => {
      if (res.data === "Roll no already registered") return alert("Roll no already registered")
      alert(res.data)
      navigate('/')
    })
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      rollno: "",
      department: "",
      course: "",
      password: "",

    },
    onSubmit: (values) => {
      console.log(values);
      postreg()
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = 'Required';
      }
      if (!values.rollno) {
        errors.rollno = 'Required';
      }
      if (!values.department) {
        errors.department = 'Required';
      }
      if (!values.course) {
        errors.course = 'Required'
      }
      if (!values.password) errors.password = "Required";
      return errors;
    }
  })
  return (
    <>
      <div className="outer">
        <div className="inner">
          <form onSubmit={formik.handleSubmit}>
            <h3 className="fw-bold">Register</h3>

            <div className="form-group">
              <label className="fw-semibold">Name</label>
              <input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} type="text" className="form-control" placeholder="Name" />
            </div>

            <div className="form-group">
              <label className="fw-semibold">Roll No</label>
              <input id="rollno" name="rollno" onChange={formik.handleChange} value={formik.values.rollno} type="text" className="form-control" placeholder="Roll No" />
            </div>

            <div className="form-group">
              <label className="fw-semibold">Department</label>
              <input id="department" name="department" onChange={formik.handleChange} value={formik.values.department} type="text" className="form-control" placeholder="Enter department" />
            </div>
            <div className="form-group">
              <label className="fw-semibold">Course</label>
              <input id="course" name="course" onChange={formik.handleChange} value={formik.values.course} type="text" className="form-control" placeholder="Enter course" />
            </div>

            <div className="form-group">
              <label className="fw-semibold">Password</label>
              <input id="password" name="password" onChange={formik.handleChange} value={formik.values.password} type="password" className="form-control" placeholder="Enter password" />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-dark fw-bold mt-3">
                Register
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <p className="forgot-password text-right">
                Already registered?   <a href="/">login</a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}