const express = require('express');
const app = express();

app.use(express.static('./'));

app.listen(3333,()=>{
    console.log('Listening at Port 3333')
})