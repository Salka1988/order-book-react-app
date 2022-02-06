import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch } from 'react-redux';
import { toggleTables } from '../../redux/actions/defaultDataActions';

export const CustomToggleButtonGroup = () => {
  const [alignment, setAlignment] = React.useState('B');
  const dispatch = useDispatch();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    dispatch(toggleTables(event.target.value));
  };

  return (
    <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange}>
      <ToggleButton value="B">Buy</ToggleButton>
      <ToggleButton value="BS">Buy/Sell</ToggleButton>
      <ToggleButton value="S">Sell</ToggleButton>
    </ToggleButtonGroup>
  );
};
