const axios = require('axios');

axios.get('http://localhost:3000/requests')
    .then((res) => console.log(res.data))
    .catch(console.err);
