import React from "react";
import { IUser } from './user.model';

const DEFAULT_AVATAR = '';

export const User = ({user} : {user: IUser | undefined}) => {
  
  return (    
    <>
      <div className="user">
        {
          user && (
            <>
            <img className="avatar" src={user.avatar ?? DEFAULT_AVATAR} alt={user.first_name + "'s avatar"} />
            <div className="content">
              <div className="name">{user.first_name} {user.last_name}</div>
              <div className="email">{user.email}</div>
              <div className="mobile">{user.mobile}</div>
            </div>
            </>
          )
        }
      </div>
    </>
  );
}
