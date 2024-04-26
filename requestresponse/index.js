var http = require("http");
var url=require("url");
let server = http.createServer(function(request, response) 
{
    if (request.url == "/admin") 
    {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<html><body> <h1>This is a admin site!</h1><br><h2> URL was "+request.url+"</h2></body></html>");
        response.end();
    }
    else if (request.url == "/student") 
    {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<html><body><h1>This is a student site!</h1> <br><h2> URL was "+request.url+"</h2></body></html>");
        response.end();
    } 
    else if(request.url=="/")
    {
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write("<html><body> <h1>Hello World</h1><h2>This is home Page! <br>URL was: "+request.url+"</h2></body></html>");
        response.end();
    }
    else 
    {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("404 Not Found");
    }
});

server.listen(3000);
console.log("server started");
console.log("Server running");