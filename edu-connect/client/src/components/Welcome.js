import "../components/style.css";
import axios from "axios";
import userContext from "../context";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
// import whyte from "../fonts/Whyte-Regular.ttf"
import avtr from "../images/avtr.jpg";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CDBRating, CDBContainer } from "cdbreact";
import Rating from "./Rating";
import plus from "../images/plus.png";
import { useFormik } from "formik";
// import AddqueryForm from "./AddQueryForm";
// import userContext from '../context';
import Research from "./Research";

export default function App() {
  const [modalShow, setModalShow] = useState(false);
  const [addqyeryModel, setAddqyeryModel] = useState(false);
  const [data, setData] = useState();
  const [query, setQuery] = useState();
  const [replyInput, setReplyInput] = useState(false);
  const [userDetail, setUserDetail] = useState()
  const [content,setContent]=useState('Query')

  var head = useContext(userContext);
  const navigate = useNavigate();

  async function getprof() {
    await axios
      .get("http://localhost:3002/api/v1/getprof", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": head.auth
        }
      })
      .then((res) => setUserDetail(res.data));
  }

  async function getqueries() {
    await axios.get("http://localhost:3002/api/v1/query").then((res) => {
      setData(res.data);
      // console.log(res.data);
    });
  }

  function AddqueryForm() {
    async function addquery() {
      await axios
        .post(
          "http://localhost:3002/api/v1/query/add",
          {
            query: formik.values.query,
            department: formik.values.department,
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
          getqueries();
        });
    }

    const formik = useFormik({
      initialValues: {
        query: "",
        department: "",
      },
      onSubmit: (values) => {
        // console.log(values);
        addquery();
      },
      validate: (values) => {
        let errors = {};
        if (!values.query) {
          errors.query = "Required";
        }
        if (!values.department) errors.department = "Required";
        return errors;
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label className="fw-semibold mb-2">Query</label>
          <input
            name="query"
            type="text"
            className="form-control"
            placeholder="Enter Your Query"
            onChange={formik.handleChange}
            value={formik.values.query}
          />
          {formik.errors.query ? (
            <div style={{ color: "red" }}>{formik.errors.query}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label className="fw-semibold mb-2">Department</label>
          <input
            id="department"
            placeholder="Enter Your Department"
            className="form-control"
            name="department"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.department}
          />
          <br></br>
          {formik.errors.department ? (
            <div style={{ color: "red" }}>{formik.errors.department}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-dark border-0 btn-block fw-bold"
        style={{backgroundColor:'#6A1B76'}}>
          Submit
        </button>
      </form>
    );
  }
  function Addanswer({ _id }) {
    // e.preventDefault()

    const [answer, setAnswer] = useState("");

    async function addreply() {
      console.log(_id);
      await axios
        .post(
          "http://localhost:3002/api/v1/query/addreply",
          {
            _id,
            reply: answer,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": head.auth,
            },
          }
        )
        .then((res) => {
          setModalShow(false);
          setReplyInput(false);
          getqueries();
        });
    }

    return (
      <>
        <input
          type="text"
          placeholder="Enter Your Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-3"
          style={{width:'100%'}}
        />
        <br></br>
        <Button
        className="fw-semibold border-0 btnans mt-3"
        style={{ fontSize: '0.8rem', backgroundColor:'#6A1B76', color:'FFFFFF ' }}

          onClick={(e) => {
            // console.log(answer)
            addreply();
          }}
        >
          Post Answer
        </Button>
      </>
    );
  }
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
            Add Query
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddqueryForm />
        </Modal.Body>
      </Modal>
    );
  }, []);

  const MyVerticallyCenteredModal = useCallback(({ show, onHide }) => {
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Answers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {query &&
          query.replies.map((item, i) => (
            <>
              <div key={i}>
                <h4>{item.professor_id.name}</h4>
                <p>{item.reply}</p>
                {query.created_by._id == head.user._id && (
                  <Rating _id={query._id} reply_id={item.reply_id} />
                )}
                {item.rate ? <p>Rating {item.rate} of 5</p> : null}
              </div>
            </>
          ))}
        {query && query.replies.length > 0 ? null : <p className="fw-bold">No Replies</p>}
        {/* {query&&console.log(query.created_by._id,head.user._id)} */}
        {query && query.created_by._id == head.user._id ? null : (
          <Button className="fw-semibold border-0"  
          style={{ fontSize: '0.8rem', backgroundColor:'#6A1B76', color:'FFFFFF ' }}
          onClick={() => setReplyInput(true)}>Add Answer</Button>
          
        )}
        <br></br>
        {replyInput && <Addanswer _id={query._id} />}
        </Modal.Body>
      </Modal>
    );
  });

  const QueryComponent = () => {
    return (
      <>
        <div className="head_query align-items-center">
          <h1 className="ms-4 mt-3 mb-3 fs-5 me-4 fw-bold">All Queries</h1>
          <img
            src={plus}
            alt="mdo"
            width="25"
            height="25"
            className="me-3"
            // className="rounded-circle"
            onClick={() => setAddqyeryModel(true)}
          />
        </div>
        {data && (
          <>
            {data.map((item) => ( 
              <>
                <Card key={item.reply_id} style={{ width: '98%', margin: 'auto' }} className="mb-3">
                  <Card.Header className="fw-semibold">
                    {item.created_by.name} - {head.user.isProf?'Professor':"Student"}</Card.Header>
                  <Card.Body>
                    <Card.Title className="fs-6">{item.department}</Card.Title>
                    <Card.Text>{item.query}</Card.Text>

                    <Button
                      onClick={() => {
                        setModalShow(true);
                        setQuery(item);
                      }}
                      className="fw-semibold border-0"
                      style={{ fontSize: '0.8rem', backgroundColor:'#6A1B76', color:'FFFFFF ' }}
                    >
                      View Replies
                    </Button>
                  </Card.Body>
                </Card>
              </>
            ))}
          </>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <Addqueries
          show={addqyeryModel}
          onHide={() => setAddqyeryModel(false)}
        />
      </>
    )
  }

  useEffect(() => {
    getqueries();
    getprof()
  }, []);
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="bootstrap" viewBox="0 0 118 94">
          <title>Bootstrap</title>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
          ></path>
        </symbol>
        <symbol id="home" viewBox="0 0 16 16">
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"></path>
        </symbol>
        <symbol id="speedometer2" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"></path>
          <path
            fillRule="evenodd"
            d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
          ></path>
        </symbol>
        <symbol id="table" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"></path>
        </symbol>
        <symbol id="people-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          ></path>
        </symbol>
        <symbol id="grid" viewBox="0 0 16 16">
          <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"></path>
        </symbol>
      </svg>
      <main>
        <header className="py-3 mb-3 border-bottom">
          <div
            className="container-fluid d-grid gap-3 align-items-center"
            style={{ gridTemplateColumns: "1fr 2fr" }}
          >
            <div className="dropdown">
              <svg
                className="bi me-2 ms-2"
                width="100"
                height="47"
                viewBox="0 0 273 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="60" height="60" fill="url(#pattern0)" />
                <path
                  d="M61.48 36C61.48 32.8 62.2667 30.24 63.84 28.32C65.4133 26.3733 67.52 25.4 70.16 25.4C71.6 25.4 72.88 25.72 74 26.36C75.1467 26.9733 76.0267 27.7467 76.64 28.68V25.24V18H82.32V46H76.8V43.32C76.2133 44.2 75.32 44.9733 74.12 45.64C72.9467 46.3067 71.6267 46.64 70.16 46.64C67.52 46.64 65.4133 45.6667 63.84 43.72C62.2667 41.7467 61.48 39.1733 61.48 36ZM75.6 40.68C76.4533 39.5867 76.88 38.0267 76.88 36C76.88 33.9733 76.4533 32.4133 75.6 31.32C74.7733 30.2267 73.6267 29.68 72.16 29.68C69.0133 29.68 67.44 31.7867 67.44 36C67.44 40.2133 69.0133 42.32 72.16 42.32C73.6267 42.32 74.7733 41.7733 75.6 40.68ZM87.5981 39.48V26H93.2781V38.16C93.2781 40.6667 94.2781 41.92 96.2781 41.92C97.6115 41.92 98.6115 41.3867 99.2781 40.32C99.9448 39.2267 100.278 37.7467 100.278 35.88V26H105.958V46H100.278V42.8C98.7581 45.36 96.5848 46.64 93.7581 46.64C91.8915 46.64 90.3981 46 89.2781 44.72C88.1581 43.4133 87.5981 41.6667 87.5981 39.48ZM110.351 31.96C110.298 27.8533 111.658 24.3867 114.431 21.56C117.231 18.7067 120.724 17.3067 124.911 17.36C128.138 17.36 130.898 18.16 133.191 19.76C135.511 21.3333 137.058 23.4133 137.831 26L132.351 28.12C131.018 24.3067 128.511 22.4 124.831 22.4C122.298 22.4 120.311 23.24 118.871 24.92C117.431 26.6 116.711 28.9467 116.711 31.96C116.711 35 117.418 37.36 118.831 39.04C120.271 40.72 122.271 41.56 124.831 41.56C128.564 41.56 131.124 39.64 132.511 35.8L137.871 37.96C136.831 40.76 135.204 42.9067 132.991 44.4C130.804 45.8933 128.084 46.64 124.831 46.64C120.511 46.64 117.018 45.2667 114.351 42.52C111.684 39.7733 110.351 36.2533 110.351 31.96ZM140.306 36C140.306 32.8533 141.293 30.3067 143.266 28.36C145.24 26.3867 147.76 25.4 150.826 25.4C153.92 25.4 156.44 26.3867 158.386 28.36C160.36 30.3067 161.346 32.8533 161.346 36C161.346 39.2 160.373 41.7733 158.426 43.72C156.48 45.6667 153.946 46.64 150.826 46.64C147.813 46.64 145.306 45.64 143.306 43.64C141.306 41.6133 140.306 39.0667 140.306 36ZM154.186 40.6C155.013 39.56 155.426 38.0533 155.426 36.08C155.426 34.1067 155.013 32.5867 154.186 31.52C153.386 30.4267 152.266 29.88 150.826 29.88C149.386 29.88 148.253 30.4267 147.426 31.52C146.626 32.5867 146.226 34.1067 146.226 36.08C146.226 38.0533 146.626 39.56 147.426 40.6C148.253 41.6133 149.386 42.12 150.826 42.12C152.266 42.12 153.386 41.6133 154.186 40.6ZM165.494 46V26H171.014V29.08C172.508 26.6267 174.654 25.4 177.454 25.4C179.641 25.4 181.281 26.0267 182.374 27.28C183.494 28.5333 184.054 30.3067 184.054 32.6V46H178.374V33.84C178.374 31.3333 177.308 30.08 175.174 30.08C173.974 30.08 173.081 30.44 172.494 31.16C171.614 32.2267 171.174 34.0133 171.174 36.52V46H165.494ZM189.362 46V26H194.882V29.08C196.375 26.6267 198.522 25.4 201.322 25.4C203.508 25.4 205.148 26.0267 206.242 27.28C207.362 28.5333 207.922 30.3067 207.922 32.6V46H202.242V33.84C202.242 31.3333 201.175 30.08 199.042 30.08C197.842 30.08 196.948 30.44 196.362 31.16C195.482 32.2267 195.042 34.0133 195.042 36.52V46H189.362ZM211.909 35.96C211.909 32.8933 212.869 30.3733 214.789 28.4C216.709 26.4 219.122 25.4 222.029 25.4C225.042 25.4 227.415 26.3867 229.149 28.36C230.882 30.3333 231.749 32.88 231.749 36C231.749 36.6133 231.735 37.0667 231.709 37.36H217.589C217.669 38.9867 218.109 40.2267 218.909 41.08C219.709 41.9067 220.762 42.32 222.069 42.32C224.149 42.32 225.695 41.16 226.709 38.84L231.789 40.8C231.095 42.4 229.975 43.7867 228.429 44.96C226.909 46.08 224.789 46.64 222.069 46.64C219.002 46.64 216.535 45.68 214.669 43.76C212.829 41.8133 211.909 39.2133 211.909 35.96ZM217.789 33.36H226.109C225.815 30.7733 224.455 29.48 222.029 29.48C220.882 29.48 219.935 29.8133 219.189 30.48C218.442 31.1467 217.975 32.1067 217.789 33.36ZM234.681 35.96C234.681 32.84 235.708 30.3067 237.761 28.36C239.815 26.3867 242.375 25.4 245.441 25.4C247.735 25.4 249.721 25.9467 251.401 27.04C253.081 28.1333 254.268 29.5867 254.961 31.4L249.721 33.36C248.895 31.04 247.401 29.88 245.241 29.88C243.828 29.88 242.668 30.4133 241.761 31.48C240.855 32.5467 240.401 34.04 240.401 35.96C240.401 37.88 240.855 39.3867 241.761 40.48C242.695 41.5733 243.868 42.12 245.281 42.12C247.468 42.12 249.015 40.8533 249.921 38.32L255.281 40.24C254.508 42.1867 253.241 43.7467 251.481 44.92C249.721 46.0667 247.695 46.64 245.401 46.64C242.281 46.64 239.708 45.6533 237.681 43.68C235.681 41.7067 234.681 39.1333 234.681 35.96ZM260.894 40.76V30.32H256.694V26H260.894V19.72H266.574V26H271.774V30.32H266.574V39.72C266.574 40.3333 266.707 40.7867 266.974 41.08C267.267 41.3467 267.72 41.48 268.334 41.48H272.654V46H265.974C264.4 46 263.16 45.52 262.254 44.56C261.347 43.6 260.894 42.3333 260.894 40.76Z"
                  fill="black"
                />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use xlinkHref="#image0_0_1" transform="scale(0.005)" />
                  </pattern>
                  <image
                    id="image0_0_1"
                    width="200"
                    height="200"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </div>

            <div className="d-flex align-items-center">
              <form className="w-100 me-3">
                <input
                  type="search"
                  className="form-control mb-0"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </form>

              <div className="flex-shrink-0 dropdown">
                <a
                  href="#"
                  className="d-block link-dark text-decoration-none dropdown-toggle"
                  id="dropdownUser2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={avtr}
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </a>
                <ul
                  className="dropdown-menu text-small shadow"
                  aria-labelledby="dropdownUser2"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <p className="mb-2 fw-bold">Profile</p>
                      {userDetail && <>
                        <p className="mb-0 fw-semibold">Name : {userDetail.name}</p>
                        {userDetail.isProf ? <p className="mb-0 fw-bold">Professor</p> : <p className="mb-0 fw-semibold">Student</p>}
                        <p className="mb-1 fw-semibold">Department : {userDetail.department}</p>
                      </>}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item fw-bold text-danger"
                      onClick={() => {
                        head.auth = null;
                        head.user = null;
                        navigate("/");
                      }}
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <div className="container-fluid pb-3" style={{ minHeight: 87 + "vh",  }}>
          <div
            className="d-grid gap-3"
            style={{ gridTemplateColumns: "1fr 4fr" }}
          >
            <div
              className="border rounded-3 h-100"
              style={{ minHeight: 87 + "vh", backgroundColor:'#6A1B76', color:'#FFFFFF'}}
            >
              <button className="ms-4 btn mt-3 text-light fw-bold" onClick={()=>setContent('Query')}>Queries</button>
              <br></br>
              <button className="ms-4 btn text-light fw-bold" onClick={()=>setContent('Research')}>Research</button>
              <br></br>
              <button className="ms-4 btn text-light fw-bold">Discussions</button>
              <br></br>
              <button className="ms-4 btn text-light fw-bold">Reports</button>
            </div>
            
            <div className="border rounded-3" style={{}}>
              {/* {content=='Query'&&<QueryComponent />} */}
              {/* {content=='Research'&&<Research />} */}
              {content=='Query'?<QueryComponent />:<Research />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
