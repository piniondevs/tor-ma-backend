const axios = require('axios');

axios.post('http://localhost:3000/requests/accept', { id: 'kv3QD61CVk' })
    .then(res => console.log(res.data))
    .catch(console.error);