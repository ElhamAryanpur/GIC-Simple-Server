const express = require('express')
const fs = require('fs')

class Server{
    constructor(ip="localhost", port=8080){
        /**
         * Server(ip: String, port: Int)
         * 
         * ip   =  The address to serve
         * port =  The port to listen to
         * 
         * Simple Server Class used to serve static files
         */
        this.ip = ip; this.port = port;
        this.app = express();
    }

    get(route="/", response, html=false){
        /**
         * Server.get(route: String, response: Any, html=bool)
         * 
         * route     = The route to listen to
         * response  = The response to the route
         * html      = If true, response will be used as path and file will be
         * served instead
         * 
         * Used to create a GET route
         */

        this.app.get(route, (req, resp) => {

            if (html == false){
                resp.send(response)
            } else {
                var file = fs.readFileSync(response, 'utf-8');
                resp.send(file)
            }
        })
    }

    staticFolder(route="/static", path=__dirname + 'public'){
        /**
         * Server.staticFolder(route: String, path: String)
         * 
         * route = Route To Be Serving The Folder
         * path  = Path To The Folder
         * 
         * Used to set a folder for serving static files
         */
        
        this.app.use(route, express.static(path))
    }

    run(ip=this.ip, port=this.port){
        /**
         * Server.run(ip: String, port: Int)
         * 
         * ip   =  The address to serve
         * port =  The port to listen to
         * 
         * Used to start the server!
         */

        this.app.listen(port, ip, (err)=>{
            if (err){
                return console.log("ERROR: ", err);
            }

            console.log(`SERVER RUNNING AT ${ip}:${port}`);
        });
    }
}

if (require.main === module){

    if (process.argv[2] && process.argv[3] != undefined){
        var serv = new Server(process.argv[2], process.argv[3])
    } else {
        var serv = new Server();
    }
    serv.staticFolder();
    serv.get("/", "web/index.html", html=true);
    serv.run()

}