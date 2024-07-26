const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUxSK2dKc1lHbjRLaHJhVExnbi9LVWdQYUpTblNpQy9yREdzU3dycElGQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFBYOU9EYUd1STlnbkx2SGMzb1cwU1h1UnZJMk16YXllTEZGUVBoalBEZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRHNOZzBCQkd1MTIwV1EyRmRYa1p2aUkxNUJCMGlIK3BieUhtWktLejNrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyamF5ek1GM3VuQ1NJT0Q3STFhZUlOTUJwTnFNbXhMQzdiZm14Q3VuRVMwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBQZ0VXbDRpRzN5TVFDS0Y0Vm9WMlpHSzNkSEk1Z3MySFJ5UlhTQm9YMlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVVVkUrVFNzemIyenlCQk5FVStIbVh2RDZmcUxvWlU0RC9QWmlsQ3l2d1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUhkcVoyb0tsMEZidlpFNENhQkRJaUxLbzd5MFpJRUhqVXY1dk50dVJWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzBFZWV0ajV0dzNaZmdScjIrVm9xNW5aNFBLS3hQMFpFTWRocmZJNlFpZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlaNzJjV1UxYUpyYzQzay8zY0xhbFNnS0FBL1p5NkpqNkxGZE1KOVlBZUh1ckdrUGVvRWFkZ3N5VTBieHdzZkd3V0hDSnhWcmw4QzhUU09oSGVuQkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiJBeHpjdmxyMW5BdzVOelJtN3ZGOHFHd3NwcnlWaWJocnJKdVMyajlUK1hnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJsWHlWS0VYSVRNR19zZ0RQbHEtQ1BRIiwicGhvbmVJZCI6IjViNjI0NjExLTU4MWUtNDVjZC1iM2JjLWU1NDdiN2VhNDEwMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRWVUNTJISEhsY3pHR1JIUmMxWnVSa2h0TlU9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InkrS1BSUWpwYkRSUTkrMGxlZUoxT3JsbzBDND0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0luSDdlOEZFS0RnajdVR0dDd2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik9RcFpSaTRpWUlia0VqZWhaaW9SNjRHYzR2U2s3cXBYajZ2K0NTaE1CZ0k9IiwiYWNjb3VudFNpZ25hdHVyZSI6InhQa05lZHFWK0JFbWJJTm9PTXNsc3pienExSG9TeWZPSkQ0YWlVVWF2OFBxS3RnMEJHQlVjODVpdW9CNDFJSmd2MFZ5Rm5TQWtMNkdkOEE1SUEyckRnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJIR0R3eXlHTy9KTk13aE91NjVUR2lmWkVqWFllZGh3ZHlsREhNbEh0L0piZUFva2Uzd3RKMTkzbzlITy9iNkdPSHErMVVvMUpsa2Y4VTU0L3lEamRCUT09In0sIm1lIjp7ImlkIjoiMjI1NjY3NTcxMzI6MzJAcy53aGF0c2FwcC5uZXQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1NjY3NTcxMzI6MzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGtLV1VZdUltQ0c1Qkkzb1dZcUVldUJuT0wwcE82cVY0K3IvZ2tvVEFZQyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjAxOTg3N30=',
    PREFIXE: process.env.PREFIX || "-",
    OWNER_NAME: process.env.OWNER_NAME || "꧁𓊈𒆜phink's 𝐃𝚵𝛁𝚰𝐋'𝐒 𒆜𓊉꧂",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254105915061", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
