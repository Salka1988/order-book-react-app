import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { BasicCard } from './MUIComponents/BasicCard';
import { CustomToggleButtonGroup } from './MUIComponents/CustomToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllPairs,
  selectCoinValuesAsks,
  selectCoinValuesBids,
  selectToggleTable,
} from '../redux/selectors/defaultSelectors';
import { useParams } from 'react-router-dom';
import { setPair } from '../redux/actions/defaultDataActions';
import { VirtualizeAutocomplete } from './MUIComponents/AutocompleteSearch';
import { BasicSelect } from './MUIComponents/BasicSelect';

export const ShowDataComponent = () => {
  let tableMode = useSelector(selectToggleTable);

  const dispatch = useDispatch();
  let { pair } = useParams();
  let pairs = useSelector(selectAllPairs);

  const once = useRef(true);

  useEffect(() => {
    if (once.current) {
      let a = pairs.find((p) => p.title === pair);
      if (a) {
        dispatch(setPair(a.title));
        once.current = false;
      }
    }
  });

  let bids = useSelector(selectCoinValuesBids);
  let asks = useSelector(selectCoinValuesAsks);

  return (
    <Box sx={{ flexGrow: 2 }} marginTop={5}>
      <Grid container spacing={2} columns={16} alignItems="center" justifyContent="center">
        <CustomToggleButtonGroup />
      </Grid>
      <Grid container mt={4} spacing={2} columns={16} alignItems="center" justifyContent="center">
        <VirtualizeAutocomplete />
      </Grid>
      <Grid
        container
        spacing={2}
        columns={16}
        alignItems="center"
        justifyContent="center"
        marginTop={2}
      >
        {(tableMode === 'B' || tableMode === 'BS') && (
          <Grid item xs={6}>
            <BasicCard title={'Buy'} values={bids} />
          </Grid>
        )}
        {(tableMode === 'S' || tableMode === 'BS') && (
          <Grid item xs={6}>
            <BasicCard title={'Sell'} values={asks} />
          </Grid>
        )}
      </Grid>

      <Grid container mt={14} spacing={2} columns={16} alignItems="center" justifyContent="center">
        <BasicSelect />
      </Grid>
    </Box>
  );
};

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
