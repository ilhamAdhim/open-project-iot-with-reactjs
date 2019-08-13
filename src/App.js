import React from 'react';

import './App.css';
import TableMenu from './Table'

function App() {
  return (
    <div className="App" style={{ marginTop: "80px" }}>
      <TableMenu timer1={5} timer2={6} timer3={7}></TableMenu>

    </div>
  );
}

export default App;
