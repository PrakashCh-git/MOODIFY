const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connecttoDb = require("./src/config/database")


const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

connecttoDb();
app.listen(3000,()=>{
    console.log("Server is running in port 3000");
})