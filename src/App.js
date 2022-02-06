import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainAppBar } from './components/MUIComponents/MainAppBar';
import { ShowDataComponent } from './components/ShowDataComponent';
import { fetchAllPairs } from './redux/actions/defaultDataActions';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPairs());
    //dispatch(fetchAllPair());
    //dispatch(fetchAllPairTwo());
    //dispatch(testWorker('Daj mi Tabelu'));
  });

  return (
    <BrowserRouter>
      <MainAppBar />
      <Switch>
        <Route exact path="/orderBook" component={ShowDataComponent} />
        <Route path="/orderBook/:pair" component={ShowDataComponent} />
      </Switch>
      <Button onClick={() => dispatch(fetchAllPairs())}>BUTTON</Button>
    </BrowserRouter>
  );
};

export default App;
