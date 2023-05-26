import React from "react";
import "./App.scss";
import NumberDisplay from "../NumberDispaly";

const App = () => {
  return (
    <div className="app style-pop-out">
      <div className="header style-pop-in">
        <NumberDisplay value={0} />
        <div className="face style-pop-out">
          <span role="img" aria-label="face">
            😃
          </span>
        </div>
        <NumberDisplay value={50} />
      </div>
      <div className="body style-pop-in">Body</div>
    </div>
  );
};

export default App;
