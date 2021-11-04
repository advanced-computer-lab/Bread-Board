
const login=require('../middleware/login') 

router.get('/protected',login,(req,res)=>{
    res.send("hello");
});
