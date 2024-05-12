import { User } from './user.model';

// TODO --entity--.
export interface ISetting {
    user: User;
    date?: Date;
    tmpValue?: string;
}

export interface IAction<T> {
    element?: any;
    function?: any;
    entity?: T;
}