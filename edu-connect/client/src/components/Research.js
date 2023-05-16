import "../components/style.css";
import axios from "axios";
import userContext from "../context";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
import avtr from "../images/avtr.jpg";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import plus from "../images/plus.png";
import { useFormik } from "formik";

export default function Research(){
    const [modalShow, setModalShow] = useState(false);
    const [addqyeryModel, setAddqyeryModel] = useState(false);
    const [data,setData]=useState()
    const [query,setQuery]=useState()
    const [researchPart,setResearchPart]=useState()
    var head=useContext(userContext)
    
    async function addStudent(){
        await axios.post('http://localhost:3002/api/v1/research/join',{
            research_id:query.research_id
        },{
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": head.auth
              }
        }).then(res=>{
            getResearch()
            setModalShow(false)
        })
    }

    
    // console.log(head.user);
    const MyVerticallyCenteredModal = useCallback(({ show, onHide }) => {
       
       
        return (
          <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            {/* {query&&setResearchPart(query.students.find(item=>item.student_id==head.user._id))} */}
            
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Students</Modal.Title>
            </Modal.Header>
            {query &&
              query.students.map((item, i) => (
                <>
                  <Modal.Body key={i}>
                    <h4>{item.student_id.name}</h4>
                    <p>{item.student_id.course}</p>
                  </Modal.Body>
                  
                </>
              ))}
            {query && query.students.length > 0 ? null : <h1 className="h5 ms-3 mt-3">No Students</h1>}
            {/* {query&&console.log(query.created_by._id,head.user._id)} */}
                {/* {researchPart?<p>researchPart</p>:<p>not</p>} */}
               
            {/* {head.user.isProf?null:researchPart?null:<button onClick={addStudent}>Send Request</button>} */}
            {head.user.isProf?null:<button onClick={addStudent} className="btn btn-dark border-0 ms-3 mt-2 mb-3" style={{backgroundColor:'#6A1B76', width:'20%'}}>Join Research</button>}
            
          </Modal>
        );
      });
      const Addqueries = useCallback(({ show, onHide }) => {
        return (
          <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
                Add Research
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddqueryForm />
            </Modal.Body>
          </Modal>
        );
      }, []);
      function AddqueryForm() {
        async function addquery() {
          await axios
            .post(
              "http://localhost:3002/api/v1/research/add",
              {
                topic: formik.values.topic,
                description: formik.values.description,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": head.auth,
                },
              }
            )
            .then((res) => {
              setAddqyeryModel(false);
              getResearch()
            });
        }
    
        const formik = useFormik({
          initialValues: {
            topic: "",
            description: "",
          },
          onSubmit: (values) => {
            console.log(values);
            addquery();
          },
          validate: (values) => {
            let errors = {};
            if (!values.topic) {
              errors.topic = "Required";
            }
            if (!values.description) errors.description = "Required";
            return errors;
          },
        });
        return (
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label className="fw-semibold mb-2">Topic</label>
              <input
                name="topic"
                type="text"
                className="form-control"
                placeholder="Enter Your topic"
                onChange={formik.handleChange}
                value={formik.values.topic}
              />
              {formik.errors.topic ? (
                <div style={{ color: "red" }}>{formik.errors.topic}</div>
              ) : null}
            </div>
    
            <div className="form-group">
              <label className="fw-semibold mb-2">Description</label>
              <input
                id="description"
                placeholder="Enter Your Department"
                className="form-control"
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              <br></br>
              {formik.errors.description ? (
                <div style={{ color: "red" }}>{formik.errors.description}</div>
              ) : null}
            </div>
    
            <button type="submit" className="btn btn-dark border-0 btn-block fw-bold"
            style={{backgroundColor:'#6A1B76'}}>
              Submit
            </button>
          </form>
        );
      }

    async function getResearch(){
        await axios.get('http://localhost:3002/api/v1/research')
        .then(res=>setData(res.data))
    }

    useEffect(()=>{
        getResearch()
    },[])

    return(
        <>
        <div className="head_query align-items-center">
            
            <h1 className="ms-4 mt-3 mb-3 fs-5 me-4 fw-bold">Research</h1>
            <img
            src={plus}
            alt="mdo"
            width="25"
            height="25"
            className="me-3"
            // className="rounded-circle"
            onClick={() =>{
                if(head.user.isProf) setAddqyeryModel(true)
                else return alert("Only Professors can add Research")
                }}
          />
          </div>
            {data&&data.map((item,i)=>(
                <>
                <Card style={{ width: '98%', margin: 'auto' }} className="mb-3">
                <Card.Header className="fw-semibold">{item.topic}</Card.Header>
               
                <Card.Body>
                  <Card.Title className="fs-6">Professor Name: {item.professor_id.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                    
                  <Button
                    onClick={() => {
                      setModalShow(true);
                      setQuery(item);
                    }}
                    className="fw-semibold border-0"
                      style={{ fontSize: '0.8rem', backgroundColor:'#6A1B76', color:'FFFFFF ' }}
                  >
                    View students
                  </Button>
                </Card.Body>
              </Card>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <Addqueries
          show={addqyeryModel}
          onHide={() => setAddqyeryModel(false)}
        />
              </>
            ))}
            
        
        </>
    )
}