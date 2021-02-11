// You could hardcode your cart array of objects elsewhere, but I put them in their own folder cause I'm weird like that
// And since I did this, at the bottom you have to export this and then require it in your routes file to use it

const cartItems = [
    {
       id:1,
       product: "Fancy T-Rex Plush",
       price: 19.99,
       quantity: 10
    },
    {
        id:2,
        product: "Baby Shark",
        price: 9.99,
        quantity: 1
     },
     {
        id:3,
        product: "Bourbon",
        price: 59.99,
        quantity: 10
     },
     {
        id:4,
        product: "A half eaten bagel",
        price: 1.99,
        quantity: 1
     },
     {
        id:5,
        product: "Bacon",
        price: 2.99,
        quantity: 8
     },
     {
        id:6,
        product: "Gamestop Stonk",
        price: 60.00,
        quantity: 10
     },
     {
        id:7,
        product: "JavaScript Book",
        price: 19.99,
        quantity: 10
     },
]

module.exports = cartItems;