var http =require("http");
var url=require("url");
var qs=require("querystring");
function requestHandle(request,response)
{
    var data1='';
    request.on('data' ,function(chunk){
        data1+=chunk;
    });
    request.on('end',function(){
        var qs1=qs.parse(data1);
        var name=qs1['uname'];
        var pass=qs1['password'];
        response.write("Your user name is "+name+" Your password is "+pass);
        response.end();
    });
}
http.createServer(requestHandle).listen(8002);
console.log("server started");