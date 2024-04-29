const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://priyanshupatel2313:8rutqTM0F8S9ISYJ@cluster0.3qxraau.mongodb.net/")
const taskSchema = new mongoose.Schema({
    username: String,
    userdescription: String,
  image:{
type:String
  },
  
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;