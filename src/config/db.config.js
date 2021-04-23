const mongoose = require('mongoose');

module.export = mongoose.connect(
    `mongodb://127.0.0.1:27017/${process.env.db_name}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err, data) => {
        if (err) {
            console.log(err);
         } else {
            console.log("Mongodb Connected");
         }
      
    }
  );