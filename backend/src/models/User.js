const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String
// caso o usuario tenha mais informações como nome, idade ou se estaria ativo
// name: String,
// age: Number,
// active: Boolean
})

module.exports = mongoose.model('User', UserSchema);
