import React, { useState, useEffect } from 'react';
import { getData, postData } from '../FetchData';
import { baseURL, toGamePath } from '../Constants';
import { GameList, GameListLoading } from '../components/GameList';
import './Home.css';

const Home = (props) => {
  const Loading = GameListLoading(GameList);
  const [homeState, setHomeState] = useState({
    loading: false,
    games: null,
  });

  useEffect(() => {
    setHomeState({ loading: true });
    getData(baseURL)
      .then((games) => {
        setHomeState({ loading: false, games: games });
      });
    }, [setHomeState]);

  return (
    <div className="overview">
    
      <Loading isLoading={homeState.loading} games={homeState.games} />

      <div className='button-new-game'>
        <button
        onClick={(e) => {
          e.preventDefault();
          postData(baseURL, {})
            .then(id => props.history.push(toGamePath(id.id)))
        }}>
          Create a new game
        </button> 
      </div>

    </div>
  );
}

export default Home;