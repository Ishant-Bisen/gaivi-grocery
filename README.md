<h1 align="center">
    <b>GAIVI The Grocery Application </b> 
<br>
</h1>




## What is this for?
This is a grocery application which works like a clone of big basket 
## Getting Started

### Deployment
This Project is [Live] on: 🌍 **https://gaivi-grocery.herokuapp.com/**

## Features

### •Registration Form:
Allows the user to register their account by filling their Email, Username, Password.


### •Login Form:
If the user has been registered on the app, can login by passing the credentials.


### •User's Profile:
After the user logged in, a simple profile with the user's username and password <br>displayed with a session Logout button.


### •Password Reset:
If the user forget his/her password, can reset by entering the registered Email id <br>and reset the password.

### •View Products
user can check the products which are just example sets

### •Add to cart
user can add them to cart if they want to buy

### •View Cart
They Can Checkout by just viewing the cart

### •DataBase:
Here we use **[MongoDB Atlas(Cloud)](https://www.mongodb.com/cloud/atlas)** as the database. Here we have two collection created, named as:
- users.
- sessions.
- Cart.
<br>
<br>
<br>

## Prerequisites
Tools that we need to run this app:

- ***[Node.js](https://nodejs.org/en/)***
- ***[Node Package Manager](https://www.npmjs.com/get-npm)***
- ***[MongoDB (Atlas)](https://www.mongodb.com/cloud/atlas)***

## Installing
```
npm install
```
## Connection to DataBase Access
At line 11 on ```./server.js``` change ***```<DB_USERNAME>```*** with your DataBase UserName & ***```<DB_PASSWORD>```*** with your DataBase Password.

## To Run the App
```
node server.js
```

The server will start Running on
+ http://localhost:3000/



## Acknowledgments

* Hat tip to anyone whose code was used.
* Special mention to all the Nodejs dev's on youtube 😜

<br><br>

<p align="center">
  Made with ❤️ by ishant
</p>
