const express = require ('express');
const bodyParser = require ('body-parser');
const path = require("path");
const ejs = require('ejs');
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', '../views');
app.use(express.static('public'));

mongoose.connect('mongodb+srv://M3:m3-mongodb@cluster0.sykgz.mongodb.net/cacheDB?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({extended: true}));

const noteSchema = new mongoose.Schema({
  title:String,
  data:String
});

const Note = mongoose.model("Note" , noteSchema);

app.route('/')

.get((req , res) => {
  Note.find({}, function(err, cbNote) {
    res.render('index', {
      notes: cbNote

    });
  })

})

.post((req , res) => {
    const noteTitle = req.body.noteTitle;
    const noteContent = req.body.noteContent;

    // console.log(noteContent , noteTitle);

    Note.insertMany({title:noteTitle , data:noteContent} , (err , docs) => {
      if(err) {
        console.log(err);
      }
    })

    res.redirect('/');
}
)

app.get('/delete/:someId' , (req , res) => {
   const reqId = req.params.someId;

   Note.deleteMany({_id:reqId} , (err) => {
     if (err) {
       console.log(err);
     }else {
       console.log("Deleted successfully");
     }
   })

  res.redirect('/');
})


app.listen(3000 , () => {
  console.log("Goin' good here, port!");
});
