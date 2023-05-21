const mongoose = require('mongoose');
const fs = require('fs');
return;
// Connection URL
const url = 'mongodb://localhost:27017/ecommerce';

// JSON file path
const jsonPath = './db-backup/orders.json';

// Read the JSON file
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let Product = require('./src/v1/models/order.model');

data = data.map(item=>{
	const newItem = {...item}
	newItem._id = newItem._id.$oid
	newItem.createdAt = newItem.createdAt.$date
	newItem.updatedAt = newItem.updatedAt.$date
	return newItem;
})

// Connect to MongoDB server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB...');
    
    // Insert JSON data into MongoDB
    Product.insertMany(data, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      mongoose.connection.close();
    });
  })
  .catch((err) => console.error(err));

