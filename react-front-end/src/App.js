import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { homePath, gamePath } from './Constants';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Game = lazy(() => import('./pages/Game'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Chess</h1>
      </header>

      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path={homePath} component={Home} />
            <Route path={gamePath} component={Game} />
          </Switch>
        </Suspense>
      </Router>

    </div>
  );
}

export default App;
