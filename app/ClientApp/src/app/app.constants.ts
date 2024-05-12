import { User } from './core/models/user.model';
import { environment } from "../environments/environment";
import { BehaviorSubject } from "rxjs";
// Export:
export const appUrl = environment.application.redirectUri;
export const apiUrl = environment.application.apiUrl;
export const app = environment.application.project;

export class rootPath {
  public localPath: string;
  public serverPath: string;
  constructor() {
    let collection = Object.getOwnPropertyNames(rootPath);
      for(let property of collection) {
            this[property] = null;
      }
  }
}

export let storedCredentials: BehaviorSubject<User> = new BehaviorSubject<User>(getCredentials(`${app}.credentials`));
export let storedPaths: BehaviorSubject<rootPath> = new BehaviorSubject<rootPath>(getSetting(`${app}.paths`));

export let controller = {
  building: 'buildings',
  location: 'locations',
  user: 'user',
  fileupload: 'fileupload',
  event: 'event'
};

export const APP_COLORS = {
  ORANGE: "#D9A460",
  BLUE: "#005487",
  BROWN: "#5C4925",
  GREEN: "#869565",
  GRAY: "#7EA8AD",
  AQUA: "#7EBEB6"
};

export function setNewValue(storeRef: string, item: User | rootPath) {
  localStorage.setItem(storeRef, JSON.stringify(item));

  if(item instanceof rootPath) {
    storedPaths.next(item);
  }
  else if(item instanceof User) {
    storedCredentials.next(item);
  }
}

export function getSetting(storedRef: string): rootPath {
  let defaultItem: any = { localPath: '', serverPath: ''};
  let store: any = JSON.parse(localStorage.getItem(storedRef));
  if(store){
    return store;
  }
  else {
      defaultItem.localPath = './assets/store/';
      defaultItem.serverPath = 'C:/';
    return defaultItem;
  }
}

export function getCredentials(storedRef: string):User {
  let user: User = JSON.parse(localStorage.getItem(`${app}.${storedRef}`));
  if(user) {
    return user;
  }
  else { //Environment: environment.global.production
    return null;
  }
}