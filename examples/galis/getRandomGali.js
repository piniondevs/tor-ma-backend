const axios = require('axios');

axios.get('http://localhost:3000/galis/random')
    .then(res => console.log(res.data))
    .catch(console.error);