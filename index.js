const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const configRoutes = require('./routes');
const port = 2001;
app.use(express.static('public'))
async function main() {
    configRoutes(app);
    app.listen(port, async () => {
        console.log(`Your server is running on http://localhost:${port}`);
    })
    
}

main().catch(console.error)