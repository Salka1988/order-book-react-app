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
//import { setCoinValue } from '../redux/actions/defaultDataActions';

export const ShowDataComponent = () => {
  let tableMode = useSelector(selectToggleTable);
  //const selectedPair = useSelector(selectSetPair);
  //const webSocket = useRef(null);

  //const dispatch = useDispatch();
  //const prevCount = usePrevious(selectedPair);

  let bids = useSelector(selectCoinValuesBids);
  let asks = useSelector(selectCoinValuesAsks);

  //useEffect(() => {
  //  if (prevCount !== selectedPair) {
  //    console.warn(prevCount);
  //    console.warn(selectedPair);
  //
  //    let closeMsg = {
  //      method: 'UNSUBSCRIBE',
  //      params: [prevCount?.toLowerCase() + '@depth20'],
  //      id: 312,
  //    };
  //    webSocket.current.onclose = () => {
  //      webSocket.current.send(JSON.stringify(closeMsg));
  //    };
  //
  //    webSocket.current.terminate();
  //  }
  //
  //  webSocket.current = new WebSocket('wss://stream.binance.com:9443/ws');
  //  let params = selectedPair ? [selectedPair?.toLowerCase() + '@depth20'] : ['btcusdt@depth20'];
  //  let msg = {
  //    method: 'SUBSCRIBE',
  //    params: params,
  //    id: 1,
  //  };
  //
  //  webSocket.current.onopen = () => {
  //    webSocket.current.send(JSON.stringify(msg));
  //  };
  //
  //  webSocket.current.onmessage = (message) => {
  //    const value = message.data;
  //    dispatch(setCoinValue(value));
  //  };
  //});

  return (
    <Box sx={{ flexGrow: 2 }} marginTop={5}>
      <Grid container spacing={2} columns={16} alignItems="center" justifyContent="center">
        <CustomToggleButtonGroup />
      </Grid>
      <Grid
        container
        spacing={2}
        columns={16}
        alignItems="center"
        justifyContent="center"
        marginTop={5}
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
