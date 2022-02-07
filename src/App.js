import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainAppBar } from './components/MUIComponents/MainAppBar';
import { ShowDataComponent } from './components/ShowDataComponent';
import { fetchAllPairs } from './redux/actions/defaultDataActions';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPairs());
  });

  return (
    <BrowserRouter>
      <MainAppBar />
      <Switch>
        <Route exact path="/orderBook" component={ShowDataComponent} />
        <Route path="/orderBook/:pair" component={ShowDataComponent} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
