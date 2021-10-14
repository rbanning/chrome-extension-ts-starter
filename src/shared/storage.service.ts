import { Common } from './common';

type OnChangeListener = (changes: {[key: string]: chrome.storage.StorageChange}, namespace: 'sync' | 'local' | 'managed') => void;
const listeners: OnChangeListener[] = [];
let listener_init: boolean = false;

export namespace StorageService {

  const createStorageValue = (value: any): any => {
    if (value && Common.appId in value) {
      return value;
    }
    //else
    const obj: any = {};
    obj[Common.appId] = value;
    return obj;
  }

  const normalizeStorageValue = (value: any): any => {
    if (value && Common.appId in value) {
      return value[Common.appId] || {};
    }

    return {...value};
  }

  export const get = (key: string, callback: (arg: any) => void) => {
    chrome.storage.sync.get(Common.appId, (result) => {
      const normalized = normalizeStorageValue(result);
      callback(normalized[key]);
    });
  }

  export const set = (key: string, value: any, callback?: () => void) => {
    chrome.storage.sync.get(Common.appId, (result) => {
      result = normalizeStorageValue(result);
      result[key] = value;

      if (typeof(callback) !== 'function') {
        callback =  () => {};
      }

      chrome.storage.sync.set(createStorageValue(result), callback);
    });
  }

  export const reset = (initValue: any = null) => {
    chrome.storage.sync.set(createStorageValue(initValue));
  }

  export const onChanged = (listener: OnChangeListener) => {
    listeners.push(listener);

    if (!listener_init) {
      listener_init = true;

      chrome.storage.onChanged.addListener((changes, namespace) => {

        const storageChanges: any = {};
        for (let [id, { oldValue, newValue }] of Object.entries(changes)) {
          if (id === Common.appId) {
            newValue = !!newValue ? (newValue[id] || {}) : {};
            oldValue = !!oldValue ? (oldValue[id] || {}) : {};
            Object.keys(newValue).forEach((key) => {
              if (newValue[key] !== oldValue[key]) {
                storageChanges[key] = { newValue: newValue[key], oldValue: oldValue[key] };
              }
            });
          }
        }

        if (Object.keys(storageChanges).length > 0) {
          listeners.forEach(fn => fn(storageChanges, namespace)); //invoke each listener
        }

      });
    }
  }

}