//code for cookies
// import express from 'express';
// import cookieParser from 'cookie-parser';
//  const app=express();
//  app.use(cookieParser());

//  //set cookie
//  app.get('/setcookie',(req,res)=>{
//     res.cookie('username','Anu',{
//         maxAge:60000, //it isn the expiration time of the cookie
//         httpOnly:true,
//         //secure:true,
//         //samesite:true,
//     });
//     res.send("cookie created successfullty");

//  })

//  //read cookie
//  app.get('/getcookie',(req,res)=>{
//     const username=req.cookies.username;
//     res.send(`welcome ${username}`);
//  });

//  //delete cookies
//  app.get('/deletecookie',(req,res)=>{
// res.clearCookie('username');
//     res.send("cookie delete successfully");
//  });

//  app.listen(3000,()=>{
//     console.log("server running a http://localhost:3000")
//  })

//session:
import express from 'express';
import session from 'express-session';

const app = express();

app.use(express.json());

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

// Create a session
app.get('/login', (req, res) => {
    req.session.username = 'Meera';
    res.send('Login successful');
});

// Read session
app.get('/dashboard', (req, res) => {
    if (req.session.username) {
        res.send(`Welcome ${req.session.username}`);
    } else {
        res.send('Please Login First');
    }
});

// Destroy session
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Logout Failed");
        }

        res.clearCookie('connect.sid');
        res.send("Logout successful");
    });
});

app.listen(3000,()=>{
    console.log("server running a http://localhost:3000")
 })