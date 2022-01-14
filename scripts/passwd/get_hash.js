var hash_func = require('./sha256-min.js');
const args = process.argv.slice(2);
console.log(hash_func.hex_hmac_sha256(args[0], args[1]));
