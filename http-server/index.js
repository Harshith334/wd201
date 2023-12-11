const fs = require("fs");
const http = require("http");

let homepage;
let registrationform;
let projectpage;
fs.readFile(
    "home.html",
    (err, home) => {
        if (err) { throw err; }
        homepage = home;
    }
)

fs.readFile(
    "project.html",
    (err, project) => {
        if (err) { throw err; }
        projectpage = project;
    }
)

fs.readFile(
    "registration.html",
    (err, registration) => {
        if (err) { throw err; }
        registrationform = registration;
    })

const args = require("minimist")(process.argv.slice(2));
const portinput = args.port;

if (portinput === undefined) {
    console.log("Enter A Valid Port Number");
} else {
    const port = parseInt(portinput, 10);


    http
        .createServer((request, response) => {
            const url = request.url;
            response.writeHeader(200, { "Content-Type": "Text/html" });

            switch (url) {
                case "/project.html":
                    response.write(projectpage);
                    response.end();
                    break;
                case "/registration.html":
                    response.write(registrationform);
                    response.end();
                    break;
                default:
                    response.write(homepage);
                    response.end();
                    break
            }
        })
        .listen(port, () => { console.log(`Server is listening on port ${port}`); });

}