import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type CallbackFunction = (string) => void;

interface CoachType {
  id: string;
  name: string;
  price: number;
}

interface CoachOptions {
  options: CoachType[];
  handler: CallbackFunction;
}

const ChoachPickerComponent = ({ options, handler }: CoachOptions) => {
  const [alignment, setAlignment] = useState();
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      handler(event.target.value);
    }
  };
  return (
    <div>
      <ToggleButtonGroup
        color='success'
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label='text alignment'>
        {options.map((coach) => {
          return (
            <ToggleButton
              key={coach.id}
              value={coach.id}
              aria-label={coach.name}>
              {coach.name} <br />
              {coach.price} SEK
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};
export default ChoachPickerComponent;
