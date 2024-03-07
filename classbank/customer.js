import { BankAccount } from "./account.js";
export class Customer {
    name;
    age;
    contactNumber;
    pin;
    userId;
    BankAccount;
    constructor(name, age, contactNumber, pin, userId) {
        this.name = name;
        this.age = age;
        this.contactNumber = contactNumber;
        this.pin = pin;
        this.userId = userId;
        this.BankAccount = new BankAccount();
    }
}
