
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcrypt')
const app = express();
const port = 80;




mongoose.connect('mongodb+srv://ElViski:3123312918bG@elcasino-database.kjybxan.mongodb.net/',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 

});

mongoose.connection.on('connected', () => {
    console.log('MongoDB veritabanına başarıyla bağlandı');
  });

const User = require('./models/Users/Users')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// get yönlendirme sayfa render işlemleri
app.get('/', (req, res) => {
    res.render('anasayfa')
})
app.get('/anasayfa', (req, res) => {
    res.render('anasayfa')
})

app.get('/kayit', (req, res) => {
    res.render('kayt', {
        error: false
    })
})

app.get('/kontrol', async (req, res) => {
    const kullaniciAdi = req.query.kullaniciAdi;
  
    const existingUser = await User.findOne({ kullaniciAdi });
  
    if (existingUser) {
      return res.json({ hata: 'Bu kullanıcı adı daha önce alınmıştır.' });
    }
  
    res.json({ hata: null });
  });

// post database işlemleri
app.post('/kayit', async (req, res) => {
    try {
        const {ad, soyad, telefon, email, tcKimlik, kullaniciAdi, sifre, sifreOnay } = req.body;

        if (sifre !== sifreOnay) {
            return res.status(400).send('Şifreler eşleşmiyor');
          }
        
          const existingUser = await User.findOne({
            $or: [
                { kullaniciAdi },
                { telefon },
                { email },
                { tcKimlik },
            ]
          });
          
          if (existingUser) {
            // Eğer hata varsa, hata mesajını içeren bir HTML yanıtı gönderin
            return res.render("kayt", {
                error: true,
                message: "User Exist already"
                })
          }
         
        const hashedSifre = await bcrypt.hash(sifre, 10);
        const hashedTC = await bcrypt.hash(tcKimlik, 10);
        const hashedTelefon = await bcrypt.hash(telefon, 10);
          

        const newUser = new User({
            ad,
            soyad, 
            telefon: hashedTelefon,
            email,  
            tcKimlik: hashedTC,
            kullaniciAdi, 
            sifre: hashedSifre
        
        })
        await newUser.save();

       
      
        res.send('Kayıt İşlemi Başarı İle Tamamlandı bol kazançlar.')
    } catch (error) {
        console.error(error);
        res.status(500).send('Kayıt işlemi sırasında bir hata oluştu.')
    }
});


app.listen(port, () => {
    console.log('sitemiz şuanda aktifleşmiştir ')
})

