import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
//import React, { useState } from "react";

import "rsuite/dist/rsuite.min.css";
const AdditionalChoicesPage = () => {

    const [alignment, setAlignment] = React.useState('left');
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
          setAlignment(newAlignment);
        }
      };
    return (
    <div>
     <ToggleButtonGroup
     color='success'
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="left" aria-label="left aligned">
            Tyst vagn <br />
            4212 SEK
        </ToggleButton>

        <ToggleButton value="right" aria-label="right aligned">
        Vanlig vagn <br />
            134 SEK
        </ToggleButton>
      </ToggleButtonGroup>
      <div className="col">
        <button id="continueToPaymentButton" className="btn btn-success float-right">
          Fortsätt
        </button>
      </div>
    </div>
        );
    };
    export default AdditionalChoicesPage

