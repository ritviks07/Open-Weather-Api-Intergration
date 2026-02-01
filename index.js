import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const yourApiKey = "60ee8c0802bd3c340cc80652163aaff2";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async (req,res) => {
    res.render("index.ejs",{ uvindex: null });
});

app.post("/weather", async (req,res) => {
    try {
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?" , {
            params : {
                lat : latitude,
                lon : longitude,
                appid : yourApiKey,
        }       
    });
    res.render("index.ejs",{ uvindex : response.data.main.temp }); 
    } catch (error) {
        res.status(500).send(error.message);
    }
   
});

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});