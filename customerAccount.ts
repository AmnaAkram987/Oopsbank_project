import { Customer } from "./classbank/customer.js";

import inquirer from 'inquirer'

const sleep = () =>new Promise((r) =>setTimeout (r,2000))


export async function displayInfo(customer:Customer){
   console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
   console.log(`Name          : ${customer.name}`);
   console.log(`Age           : ${customer.age}`) ;
   console.log(`UserId        : ${customer.userId}`); 
   console.log(`AccountBalance: Rs.${customer.BankAccount.accountBalance}}`); 
   console.log(`ContactNumber : ${customer.contactNumber}`) 
   console.log(`AccountNumber : ${customer.BankAccount.Accountnumber}`)
   console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
} 

export async  function ShowAccountBalance(customer:Customer){
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log(`AccountBalance : Rs.${customer.BankAccount.accountBalance}`)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
}

export async function Credit(customer:Customer){
   
    while(true)
    {
        const{amount}=await inquirer.prompt([{
            type:'number',
            name:'amount',
            message:'Enter amount:'
        },
    ])

    await sleep();

    if(!amount){
        console.error('Enter correct amount.')
        continue;
    }
    customer.BankAccount.Credit(amount)

    if(amount>100){
        console.log('Transaction successful with Rs.1 minus')
    }else{
        console.log('Transaction successful .')
    }
      return;
    }
}



export async function Debit(customer:Customer){
    while(true)
    {
        const{amount}=await inquirer.prompt([{
            type:'number',
            name:'amount',
            message:'Enter amount:'
        },
    ])

    await sleep();

    if(!amount){
        console.error('Enter correct amount')
        continue;
    }

    if(amount > customer.BankAccount.accountBalance){
      console.log('Amount  you entered is greater than your balance.')
      return;
    }
    customer.BankAccount.Debit(amount)
    console.log('Transaction succeesful ')
    return;    
    }
    }

    export function TransactionHistory(customer:Customer){
        
        if(!customer.BankAccount.transactionHistory.length){
            console.log('No Transaction history available' )
            return;
        }

       console.table(
        customer.BankAccount.transactionHistory.map((val)=>{
            return{...val,fee:`Rs:${val.fee}` ,amount:`Rs:${val.amount}`}
        })
       )

    }

