
# Personal Expense Tracker

A RESTful API for managing personal financial records. Users can record their income and expenses, retrieve past transactions, and get summaries by category or time period.


## Installation

Clone the repository:
```bash
git clone https://github.com/Kodam-Vinay/expense-tracker.git
cd expense-tracker
```

Install dependecies with npm

```bash
  npm install
```


    
## Technologies Used

- Node
- Express
- jsonwebtoken
- mongoose
- cors
- dotenv


## Running the Project

Start the development server

```bash
  npm start
    or
  npm run dev (nodemon)
```
The server will start on http://localhost:8000.


## API Reference

#### ADD TRANSACTION

```http
  POST /transactions
```

- validate fields type, category, amount, description
- if fields are empty respective error will be shown 

#### for successful transaction
response will be:-

      status: true,
      message: "Transaction added successfully",
      data: {
          amount,
          type,
          category,
          date
      }

![add transaction](https://res.cloudinary.com/dwgpba5n2/image/upload/v1729623410/expense-tracker-images/expense-add_wljbkl.png)


#### GET ALL TRANSACTIONS

```http
  GET /transactions
```
 
#### for successful transaction
response will be:-

      status: true,
      message: "Transactions retrieved successfully"
      data: [
          {
          amount,
          type,
          category,
          date
          },
          ...
      ]

![all transactions](https://res.cloudinary.com/dwgpba5n2/image/upload/v1729623410/expense-tracker-images/expense-all_dekt0t.png) 



#### GET TRANSACTION DETAILS BY ID

```http
  GET /transactions/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of each expense to fetch |


#### for successful transaction
response will be:-

      status: true,
      message: "Transaction added successfully"
      data: 
          {
            amount,
          type,
          category,
          date
          },

![transaction details](https://res.cloudinary.com/dwgpba5n2/image/upload/v1729623410/expense-tracker-images/expense-transaction_mo8qlg.png) 


#### UPDATE TRANSACTION
```http
  PUT /transactions/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of transaction to update |

#### for successful transaction
response will be:-

      status: true,
      message: "Transaction updated successfully"
      data: 
          {
          amount,
          type,
          category,
          date
          },

![update transaction](https://res.cloudinary.com/dwgpba5n2/image/upload/v1729623410/expense-tracker-images/expense-update_etrxoz.png) 



#### DELETE TRANSACTION
```http
  DELETE /transactions/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of transaction to delete |

#### for successful transaction
response will be:-

      status: true,
      message: "Transaction updated successfully"

![delete transaction](https://res.cloudinary.com/dwgpba5n2/image/upload/v1729623410/expense-tracker-images/expense-delete_tgukwv.png) 

#### GET SUMMARY

```http
  GET /summary
```
 in this we can mention startDate, endDate, and category as query params based on that it will return result

#### for successful transaction
response will be:-

      status: true,
      message: "Summary Retrieved Successfully"
      data:{
          income,
          expenses,
          balance
          transactions: [
          {
          amount,
          type,
          category,
          date
          },
          ...
      ]
      }

![transactions summary](https://res.cloudinary.com/dwgpba5n2/image/upload/v1729623411/expense-tracker-images/expense-summary_lpm0do.png) 
    
#### error handling
If it is an error it will handled by catch block
## Documentation

[APIS LIVE FOR TESTING](https://martian-comet-60779.postman.co/workspace/536b71ad-f6d6-4b77-88d4-a67e9a5873ad/folder/28835926-93b7965c-e802-41aa-817f-07b05602d006?ctx=documentation)

