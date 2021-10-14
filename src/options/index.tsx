//ref: options/index.tsx

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { SelectColor } from "./select-color.component";

import { IUser, UserService, User } from '../shared/users'


import './styles.scss';

const Options = () => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    //runs every time page/component is rendered (initially and as state changes)
    // see dependency array (second arg to useEffect)
    console.log("getting current user (Options - user)", {user});

    UserService.me()
      .then((_user) => {
        setUser(_user);
      })
      .catch(reason => console.warn("Could not get user", reason));

  }, [/* empty array === only run after initial render */]);



  return (
    <>
      <User user={user}/>
      <hr/>
      <h2>Select a Color</h2>
      <SelectColor />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
