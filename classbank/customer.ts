import { BankAccount } from "./account.js";

export class Customer{
    name:string;
    age:number;
    contactNumber:string;
    pin:number;
    userId:string;
    BankAccount : BankAccount

    constructor(
     name : string,
     age : number,
     contactNumber : string,
     pin : number,
     userId : string,
    ){
       
       this.name = name;
       this.age = age;
       this.contactNumber = contactNumber;
       this.pin = pin;
       this.userId = userId

       this.BankAccount = new BankAccount()
    }







}