var http =require("http");
var url=require("url");
var qs=require("querystring");
function requestHandle(request,response)
{
    var query=url.parse(request.url).query;
    var name = qs.parse(query)["uname"];
    var pass=qs.parse(query)["password"];
    response.write("Your username is "+name+" and your password is "+pass);
    response.end();
}
http.createServer(requestHandle).listen(8001);
console.log("server started");