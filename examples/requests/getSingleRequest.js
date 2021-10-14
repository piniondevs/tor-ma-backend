const axios = require('axios');

axios.get('http://localhost:3000/requests/ePnsNTAxw0')
    .then((res) => console.log(res.data))
    .catch(console.err);
