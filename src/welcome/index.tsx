//ref: welcome/index.tsx

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import './styles.scss';

const Welcome = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const el = document.getElementById("count");
    if (el) {
      el.innerText = `Count: ${count}`;
    }

  }, [count]);

  const updateCount = () => {
    setCount(count + 1);
  }

  const imgUrl = chrome.runtime.getURL('icons/icon-48.png');

  return (
    <>
      <h1>
        <img src={imgUrl} alt="ext cord icon"/>
        Welcome!
      </h1>
      <h2 id="count">The Count is {count}</h2>
      <p>
        <button onClick={updateCount}>Increment</button>
      </p>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>,
  document.getElementById("root")
);
