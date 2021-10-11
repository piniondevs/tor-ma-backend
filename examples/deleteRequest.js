const axios = require('axios');

axios.delete('http://localhost:3000/requests/delete/ePnsNTAxw0')
    .then((res) => console.log(res.data))
    .catch(console.err);
