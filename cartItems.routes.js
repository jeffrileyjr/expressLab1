// we require express
const express = require("express");
const itemRoutes = express.Router();
// since our cart Array is in another file, we need to require it so we use the next line to do that
const cartItems = require("./cart");

itemRoutes.get('/cart-items', (req, res) => {
    // since we have a few possible parameters, we make a new array to hold our filtered items and we start it by containing all items
    let filteredItems = cartItems;
    // we declare our parameters
    console.log(typeof(req.query.maxPrice))  //this shows us that maxPrice is a string, we need it to be a number
    const maxPrice = parseFloat(req.query.maxPrice); //so we use parseFloat to do that
    const prefix = req.query.prefix;
    const pageSize = parseInt(req.query.pageSize); // again since pageSize will come in as a string, we make it a number
    // We use if statements here to filter through our array to only give us back the objects that meet our parameters. Since we are using if 
    // statements, not if...else, it will run through each line of code and execute each if block if it is true, so if all are true, all 3 will run.
    // I've added console.log statements as a way to test this 
    if (maxPrice) {
        console.log('maxPrice') // we see this if this code block runs
        filteredItems = filteredItems.filter(item => item.price <= maxPrice);  // we get only the items that equal or are lower than maxPrice
    } if (prefix) {
        console.log('prefix')  // we see this when this code block runs
        filteredItems = filteredItems.filter(item => item.product.toLowerCase().startsWith(prefix.toLowerCase()));
        //  we get only the items that begin with our prefix
    } if (pageSize) {
        console.log('pageSize')  // we see this when this code block runs
        filteredItems = filteredItems.slice(0, pageSize) // gives us only the number of items that match our pageSize
    }
    res.status(200); // returns the desired status code
    res.json(filteredItems);  // returns the json object of our filtered array
});

itemRoutes.get('/cart-items/:id', (req, res) => {
    // we set our item to be the item in our array that matches the id parameter we give it
    //  since our id is a number the req.params.id is a string, we use double equals ==
    const item = cartItems.find(el => el.id == req.params.id);
        if (item) {  // if we get a match do this
            res.status(200);
            res.json(item);
        } else {  // otherwise do this
            res.status(404);
            res.send('ID Not Found');
        }
    });

itemRoutes.post('/cart-items', (req, res) => {
    const item = req.body; // we set our new item to be our req.body
    item.id =  cartItems[cartItems.length - 1].id + 1;  // then we set the id automatically to be 1 more than the highest id
    cartItems.push(item);  // add it up to our array
    res.status(201);
    res.json(item);
});

itemRoutes.put('/cart-items/:id', (req, res) => {
    // we get the id passed in
    const id = parseInt(req.params.id);
    // we then use that to find the item in our array
    const index = cartItems.findIndex(item=>item.id===id);

        if(req.body.quantity) cartItems[index].quantity = req.body.quantity; //if a new quantity if found, update it
        if(req.body.product) cartItems[index].product = req.body.product; // if a new product is found, update
        if(req.body.price) cartItems[index].price = req.body.price;  //if a new price, update
        cartItems[index].id = id;  // set the index to be the same.
        res.status(200);
        res.json(cartItems[index]); // return the updated item
    
})

itemRoutes.delete('/cart-items/:id', (req, res) => {
    cartItems.splice(cartItems.findIndex(el => el.id == req.params.id), 1);  //find the id and delete it
    res.status(204);
    res.send(); // send an empty response
})
//  export the routes so we can use them in the server
module.exports = itemRoutes; 