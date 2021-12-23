import React, { useState, useContext, useEffect } from "react";
import {Link} from 'react-router-dom';
import { BookingContext } from '../Contexts/BookingContext';
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import "rsuite/dist/rsuite.min.css";
import ChoachPickerComponent from "./CoachPickerComponent";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const tempSilentCoachPriceFactor:number = 0.5;

const AdditionalChoicesPage = () => {
  const [context, updateContext] = useContext(BookingContext);
  const [basePrice, setBasePrice] = useState(context.price);
  const [price, setPrice] = useState(basePrice)
  let options = [
    {
      id: "0",
      name: "Vanlig vagn",
      price: context.price,
    },
    {
      id: "1",
      name: "Tyst vagn",
      price: (context.price + context.price * tempSilentCoachPriceFactor),
    },
  ];

  function coachHandler(toggledCoachId:string){
    const coach = options.find(({id})=>id==toggledCoachId);
    if(coach)setPrice(coach.price);
  };

  useEffect(() => {
    updateContext({
      additionalCosts:price
    });
  }, [price]);
/*
  New choices should be added to stack *element*
*/
  return (
    <div>
      <Link to="/">
      <button id="back-to-results-btn" className="btn btn-secondary" >
        Tillbaka
      </button>
      </Link>
      <div>
        <Stack spacing={2}>
          <Item>
            <ChoachPickerComponent
              options={options}
              handler={coachHandler}
              />
          </Item>
        </Stack>
      </div>
      
      <div className="col">
      <Link to="/payment">
        <button
          id="continue-to-payment-btn"
          className="btn btn-success float-right"
        >
          Fortsätt
        </button>
        </Link>
      </div>
    </div>
  );
};
export default AdditionalChoicesPage;
