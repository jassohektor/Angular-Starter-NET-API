import { Binary } from '@angular/compiler';

export class User {
    Id?: any;
    CityId?: number;
	FirstName: string;
	LastName?: string;
	AlsoKnownAs?: string;
	Title?: string;
	Email?: string;
	Phone?: string;
	Address?: string;
	ZipCode?: number;
	Gender: string;
	//UserPW?: any[];
	Notes?: string;
    BirthDate?: Date;
    PhotoUrl?: string;
    Points?: number;
    Description?: string;
    //Roles?: Array<UserRole>;
    //MapLocation?: Array<Binary>;
	CreatedDate: Date;
	UpdatedDate?: Date;
	ModifiedBy?: any;
	Active: boolean;

    constructor(){
        let collection = Object.getOwnPropertyNames(User);
            for(let property of collection){
                this[property] = null;
            }
    }
}

export enum UserRole {
    Administrator = "admin",
    Operator = "user",
    Anonimus = "readonly",
    Unknown = ""
}