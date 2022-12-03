require('dotenv').config();

const dev = {
    app: {
        port: process.env.PORT
    },
    db: {
        url: process.env.DB_URL
    },
    key: {
        jwt: process.env.SECRET_KEY
    }
}

module.exports = dev;