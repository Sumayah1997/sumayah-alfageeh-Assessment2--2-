// const http = require('http');
// const fs = require('fs');
import http from 'http';
import fs from 'fs';
const server = http.createServer((request, response) => 
    {if (request.url === '/') 
        {response.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('index.html', (error, data) => 
    {if (error) 
        {response.writeHead(404);
        response.write('Error: File not found');}             
    else{response.write(data);}
    response.end();
});}});
server.listen(3000,()=>{console.log('Server listening on localhost:3000 ');
});