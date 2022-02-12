import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainAppBar } from './components/MUIComponents/MainAppBar';
import { ShowDataComponent } from './components/ShowDataComponent';
import { fetchAllPairs } from './redux/actions/defaultDataActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPairs } from './redux/selectors/defaultSelectors';
import { useMountEffect } from './util/hooks/useMountEffect';

const App = () => {
  const dispatch = useDispatch();

  let pairs = useSelector(selectAllPairs);

  useMountEffect(() => {
    dispatch(fetchAllPairs());
  });

  return (
    pairs.length > 0 && (
      <BrowserRouter>
        <MainAppBar />
        <Switch>
          <Route exact path="/" component={ShowDataComponent} />
          <Route path="/:pair" component={ShowDataComponent} />
        </Switch>
      </BrowserRouter>
    )
  );
};

export default App;
