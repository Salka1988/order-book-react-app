import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { setDec } from '../../redux/actions/defaultDataActions';

export const BasicSelect = () => {
  const [deci, setDeci] = React.useState('2');

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setDec(event.target.value));
    setDeci(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> Dec </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={deci}
          label="Dec"
          onChange={handleChange}
        >
          {[...Array(8).keys()].map((e) => (
            <MenuItem value={e} key={e}>
              {e.toString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
