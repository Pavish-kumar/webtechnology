var http =require("http");
var url=require("url");
function requestHandle(request,response)
{
    response.writeHead(200,{"Content-Type":"text/html"})
    response.write("<html><body><h1>Hello world</h1></body></html> ");
    response.end(); 
}
http.createServer(requestHandle).listen(8000);
console.log("server started");