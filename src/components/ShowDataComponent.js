import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { BasicCard } from './MUIComponents/BasicCard';
import { CustomToggleButtonGroup } from './MUIComponents/CustomToggleButtonGroup';
import { useSelector } from 'react-redux';
import {
  selectCoinValuesAsks,
  selectCoinValuesBids,
  selectToggleTable,
} from '../redux/selectors/defaultSelectors';
import { useParams } from 'react-router-dom';
import { CryptocurrencyDropdown } from './MUIComponents/AutocompleteSearch';
import { BasicSelect } from './MUIComponents/BasicSelect';

export const ShowDataComponent = () => {
  let tableMode = useSelector(selectToggleTable);

  let { pair } = useParams();

  const isPairPresent = pair !== undefined && pair !== null;

  let asks = useSelector(selectCoinValuesBids);
  let bids = useSelector(selectCoinValuesAsks);

  return (
    <Box sx={{ flexGrow: 2 }} marginTop={5}>
      <Grid container spacing={2} columns={16} alignItems="center" justifyContent="center">
        <CustomToggleButtonGroup />
      </Grid>

      <Grid container mt={4} spacing={2} columns={16} alignItems="center" justifyContent="center">
        <CryptocurrencyDropdown value={pair || null} />
      </Grid>

      {isPairPresent && (
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
      )}

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
