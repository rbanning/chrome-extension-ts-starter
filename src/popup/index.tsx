//ref: popup/index.tsx

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Tabs } from "../shared/tabs";
import { StorageService } from "../shared/storage.service";

import './styles.scss';

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();
  const [color, setColor] = useState('???');


  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);
  
  useEffect(() => {
    Tabs.getCurrentTab()
      .then((tab) => {
        setCurrentURL(tab?.url);    
      });

    StorageService.get('color', (result) => {
      if (result) {
        setColor(result)
      }
    });    
  }, []);

  const changeBackground = () => {
    Tabs.getCurrentTab()
      .then((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            { color },
            (msg) => {
              console.log("Response after sending change background color message:", msg);
            }
          );
        }
      });
  };


  return (
    <>
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Color: {color}</li>
      </ul>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
