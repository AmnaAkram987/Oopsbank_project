//#!/usr/bin/env node
// Import necessary packages
import inquirer from "inquirer";
import { Customer } from "./classbank/customer.js";
import { displayInfo, ShowAccountBalance, Credit, Debit, TransactionHistory, } from "./customerAccount.js";
// Utility function to introduce a delay
const sleep = () => new Promise((r) => setTimeout(r, 2000));
// Array to store customer data
let customers = [];
// Function to prompt the user for the main choice (Create New Account or Sign In)
async function Choice() {
    const { option } = await inquirer.prompt([
        {
            name: "option",
            message: "What Would You Like To Do ?",
            type: "list",
            choices: [
                { name: "Create New Account", value: "C" },
                { name: "Sign In", value: "S" },
            ],
        },
    ]);
    return option;
}
async function creatnewaccount() {
    let Names;
    (function (Names) {
        Names["Name"] = "Name";
        Names["Age"] = "Age";
        Names["ContactNumber"] = "ContactNumber";
        Names["Pin"] = "Pin";
        Names["UserID"] = "UserID";
    })(Names || (Names = {}));
    async function Inputs(name, type) {
        while (true) {
            const { input } = await inquirer.prompt([
                {
                    name: 'input',
                    message: `Enter your ${name} :`,
                    type: type,
                },
            ]);
            if (!input) {
                continue;
            }
            /*  if (name === Names.ContactNumber){
           let numRegex =  /^(\+92|0|92)[0-9] {10}$/;
           if(!numRegex.test(input)){
             console.log('Enter Pakistani Number')
             //continue;
           
           }
              }  */
            if (name === Names.ContactNumber) {
                // Updated regex to allow for optional '+' and spaces
                let numRegex = /^(\+?92|0)?([ -]?\d{10})$/;
                if (!numRegex.test(input)) {
                    console.log('Enter a valid Pakistani Number');
                    continue;
                }
            }
            if (name === Names.UserID) {
                let customer = customers.find((val => val.userId === input));
                //let customer = customers.find((val) => val.userId.toLowerCase() === UserID.toLowerCase());
                if (customer) {
                    console.log('This UserId is already taken.Try a different one');
                    continue;
                }
            }
            return input;
        }
    }
    //Prompt user for different inputs
    let name = await Inputs(Names.Name, 'string');
    let age = await Inputs(Names.Age, 'number');
    let contactnumber = await Inputs(Names.ContactNumber, 'number');
    let pin = await Inputs(Names.Pin, 'number');
    let userId = await Inputs(Names.UserID, 'string');
    let customer = new Customer(name, age, contactnumber, pin, userId);
    await sleep();
    customers.push(customer);
    console.log('Account Created Successfully.');
    console.log('New customer UserID:', userId);
}
async function signin() {
    const { userID, pin } = await inquirer.prompt([
        {
            name: 'userID',
            message: 'Enter Your UserId:'
        },
        {
            name: 'pin',
            message: 'Enter Your Pin:',
            type: 'number'
        },
    ]);
    console.log('User Input: UserID:', userID, 'PIN:', pin);
    let customer = customers.find((val) => val.userId === userID);
    // Log existing customer IDs for debugging
    console.log('Existing Customer IDs:', customers.map((customer) => customer.userId));
    //let customer = customers.find((val) => val.userId === userID);
    if (!customer) {
        console.log('No customer with This UserID');
        return;
    }
    else {
        if (customer.pin !== pin) {
            console.log('Incorrect PIN.');
            return;
        }
        console.log('Signed In Successfully.');
        while (true) {
            const { userChoice, } = await inquirer.prompt([
                {
                    name: 'userChoice',
                    message: "Make Your Choice",
                    type: 'rawlist',
                    choices: [
                        'Show Profile',
                        'Debit',
                        'Credit',
                        'Account Balance',
                        'Transaction History',
                    ]
                },
            ]);
            switch (userChoice) {
                case 'Show Profile':
                    displayInfo(customer);
                    break;
                case 'Credit':
                    await Credit(customer);
                    break;
                case 'Debit':
                    await Debit(customer);
                    break;
                case 'Transaction History':
                    TransactionHistory(customer);
                    break;
                case 'Account Balance':
                    await ShowAccountBalance(customer);
                    break;
                default:
                    break;
            }
            const { choice } = await inquirer.prompt([{
                    name: 'choice',
                    message: 'Select One:',
                    type: 'list',
                    choices: ["Perform Another Task", 'Sign Out']
                },
            ]);
            if (choice === 'Sign Out') {
                console.log('`\n------------------\n');
                break;
            }
            else {
                console.log(`\n------------------------\n`);
                continue;
            }
        }
    }
}
async function main() {
    while (true) {
        let choice = await Choice();
        if (choice === 'C') {
            await creatnewaccount();
        }
        else if (choice === 'S') {
            await signin();
        }
        const input = await inquirer.prompt([
            {
                name: 'exit',
                message: "Do You Want To Exit?",
                type: 'confirm',
                default: false,
            },
        ]);
        if (input.exit) {
            break;
        }
        console.log("\n----------------------");
        console.log("----------------------\n");
    }
}
main();
