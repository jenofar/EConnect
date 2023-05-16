import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import userContext from '../context';
import {useContext} from "react"
const Rate = ({_id,reply_id}) => {
  const [rate, setRate] = useState(0);
  var head=useContext(userContext)
    async function addrating(){
        await axios.post('http://localhost:3002/api/v1/query/addrating',{
            _id,
            rating:rate,
            reply_id
        },{headers:{
            'Content-Type':'application/json',
            'x-auth-token':head.auth
          }}).then(res=>{
            if(res.data.acknowledged) return alert('rating added')
          })
    }
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "#6A1B76"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
            
          </label>
          
        );
      })}
      <button onClick={addrating} className="btn btn-dark ms-3 border-0" style={{height:'10%', backgroundColor:'#6A1B76'}}>Post</button>
    </Container>
  );
};
  
export default Rate;