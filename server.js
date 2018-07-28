const router = require('tiny-router');

router.listen(8080);
console.log('🚀 SERVER UP ON PORT 8080 [online] ');

require('./routes')(router);