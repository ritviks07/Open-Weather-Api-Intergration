import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const yourApiKey = process.env.OPENWEATHER_API_KEY;

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