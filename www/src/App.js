import React, { createContext } from 'react';
import './App.css';

import { IkonateContext, Activity } from '../../';

const App = () => {
  
    return (
      <IkonateContext.Provider value={{size: '50px'}}>
        <div className="main">
          <Activity/>
        </div>
      </IkonateContext.Provider>
    );
}

export default App;
