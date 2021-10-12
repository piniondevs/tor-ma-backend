const axios = require('axios');

axios.delete('http://localhost:3000/galis/delete/rbasYMhQHA')
    .then((res) => console.log(res.data))
    .catch(console.err);
