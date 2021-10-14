const axios = require('axios');

axios.post('http://localhost:3000/requests/create', {gali: 'madarchod', author: 'sus'})
    .then((res) => console.log(res.data))
    .catch(console.err);
