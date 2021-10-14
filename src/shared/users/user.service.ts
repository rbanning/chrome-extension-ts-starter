import { IUser } from "./user.model";
import { StorageService } from "../storage.service";

export namespace UserService {
  const ENDPOINT = 'https://my.api.mockaroo.com/users.json?key=099bff30';


  export const get = (): Promise<IUser[]> => {
    return fetch(ENDPOINT)
      .then((response) => {        
        if (response.status === 200) {
          return response.json();
        }
        //else
        console.warn("Fetch Users Error", {response});
      });
  }

  export const me = (): Promise<IUser | undefined> => {
    return new Promise((resolve, reject) => {
      get()
        .then((users: IUser[]) => {
          if (users?.length > 0) {
            StorageService.get('userId', (id) => {
              id ??= users[0].id;   //use the first id if none is saved
              console.log("searching users", {id, users});
              resolve(users.find(m => m.id === id));
            });
          }
          else 
          {
            //no users? 
            resolve(undefined);
          }
        })
        .catch(reject);
    });
  }
}