import 'dotenv/config'
import express from  'express';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import signupModel from './signupSchema.js';

const app = express();
const PORT = process.env.PORT;
const DBURI = process.env.MONGODB_URI; 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(DBURI)
mongoose.connection.on('connected',()=>console.log('MongoDb Connected...'));
mongoose.connection.on('error',()=>console.log('MongoDb error...'));

                    
app.post('/signup', async(req,res)=>{
    const {name,email,password} = req.body

    const userAccountData = {
        name,
        email,
        password
    }

    await signupModel.create(userAccountData)

    res.send('Account Created')
    
})

app.post('/login',async (req,res)=>{
    const {email,password} = req.body

    await signupModel.findOne({email : email,password : password})
    .then((response)=>{
        if(response){
            console.log('Account exists');
            res.send('User account exists')
        }else{
            console.log('Account does not exists');
            res.send('User account does not exists')


        }
        
        
    })
})




















//Starting Server
app.listen(PORT,()=>{
    console.log('Server Started...');
    
})
app.get('/',(req,res)=>{
    res.send('Server Started...')
}
)
//