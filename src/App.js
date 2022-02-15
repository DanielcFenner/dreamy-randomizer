import React from "react";
import Header from "./components/Header";

function App() {
  const [dreamies, setDreamies] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [reset, setReset] = React.useState(false);

  function randomVillager() {
    return Math.floor(Math.random() * 391 + 1);
  }

  React.useEffect(
    function () {
      console.log("use effect");
      for (let i = 0; i < 10; i++) {
        fetch("https://acnhapi.com/v1/villagers/" + randomVillager())
          .then((res) => res.json())
          .then((data) =>
            setDreamies((oldDreamies) => {
              return [
                ...oldDreamies,
                {
                  key: data.id,
                  name: data.name["name-USen"],
                  img: data.image_uri,
                },
              ];
            })
          );
      }
    },
    [reset]
  );

  console.log(dreamies);

  const grid = [];
  for (let i = 0; i < 10; i++) {
    grid.push(
      <div key={i} className="main--gridElement">
        ?
      </div>
    );
  }

  const gridDreamies = [];
  if (dreamies.length === 10) {
    for (let i = 0; i < 10; i++) {
      let dreamy = dreamies[i];
      let displayBoy = "none";
      if (i < count) {
        displayBoy = "flex";
      }

      gridDreamies.push(
        <div
          key={i}
          className="main--gridElementDreamies"
          style={{ display: displayBoy }}
        >
          <img src={dreamy.img} className="dreamiesImg"></img>
          <div className="dreamiesText">{dreamy.name}</div>
        </div>
      );
    }
  }

  function countUp() {
    if (dreamies.length === 10) {
      setCount((oldCount) => (oldCount < 10 ? oldCount + 1 : oldCount));
    }
  }

  function resetButton() {
    setDreamies([]);
    setCount(0);
    setReset((oldReset) => !oldReset);
  }

  return (
    <div className="wrapper">
      <div className="wrapperCenter">
        <Header />
        <main>
          {count < 10 && (
            <button className="main--button" onClick={countUp}>
              ✨ get random dreamy ✨
            </button>
          )}
          {count === 10 && (
            <button className="main--reset" onClick={resetButton}>
              😞 reset dreamies 😞
            </button>
          )}
          <div className="main--grid">
            {grid}
            <div className="main--gridDreamies">{gridDreamies}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
