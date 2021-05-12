const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./server/database/connection');
const app = express();
const cookieParser = require('cookie-parser');
const requireAuth = require('./server/middlewares/authmiddleware')

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// const fileStorageEngine = multer.diskStorage({
//     destination: (req,res,cb)=>{
//         cb(null,'./images')
//     },
//     filename :(req, file, cb)=>{
//         cb(null,Data.now() + '@--@'+file.originalname);
//     }
// })

// const upload = multer({storage})    

app.use(cors())
// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(express.json())
app.use(cookieParser());
// set view engine
// app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
// app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
// app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
// app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
// app.use('/images',express.static(path.resolve(__dirname,'client/using_redux/public/images/')))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});