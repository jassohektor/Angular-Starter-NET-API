export class Corporation {
    Id:number;
    CorporationName:string;
    Code:string;
    Category:string;
    Description:string;
    InBetaMode:boolean;
    CreatedDate:Date;
    UpdatedDate:Date;
    ModifiedBy:any;
    Active:boolean;

    constructor(){
        let collection = Object.getOwnPropertyNames(Event);
            for(let property of collection){
                this[property] = null;
            }
    }
}