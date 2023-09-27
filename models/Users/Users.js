const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ad: String,
  soyad: String,
  telefon: { type: String},
  email: { type: String },
  tcKimlik: { type: String},
  kullaniciAdi:  { type: String, unique: true },
  sifre: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;