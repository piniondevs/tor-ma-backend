const axios = require('axios');

axios.delete('http://localhost:3000/galis/delete/kv3QD61CVk')
    .then((res) => console.log(res.data))
    .catch(console.err);
