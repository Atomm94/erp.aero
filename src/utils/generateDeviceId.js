const crypto = require('crypto');

module.exports = (userInfo) => {
    const {ip = '0.0.0.0', ua = 'unknown'} = userInfo;

    return crypto.createHash('sha256').update(ip + ua).digest('hex');
}