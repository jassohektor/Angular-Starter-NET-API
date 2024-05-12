import { Url } from "url";

export class Client {
        Id:number;
        CorporationId?:number;
        ClientName:string;
        Code:string;
        Description:string;
        Title:string;
        Email:string;
        Phone:string;
        Address:string;
        ZipCode?:number;
        Category:string;
        Notes:string;
        PhotoUrl?:Url;
        CreatedDate:Date;
        UpdatedDate?:Date;
        ModifiedBy:any;
        Active:boolean;
}