const axios = require('axios');

axios.get('http://localhost:3000/galis/rbasYMhQHA')
    .then((res) => console.log(res.data))
    .catch(console.err);
