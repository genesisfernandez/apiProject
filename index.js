import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const API_URL = "https://www.themealdb.com/api/json/v1/1";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) =>{
    res.render("index.ejs");
}); 

app.post("/", async (req, res) =>{
    try {
        const result = await axios.get( API_URL + "/filter.php?" , {
            params: {
                i : req.body.foodName
            }
        });
        res.render("index.ejs", { contentMealItem: result.data.meals });
    } catch (error) {
        res.status(500).send(error.message);    
    }
    
});

app.post("/result", async (req, res) =>{
    try {
        const result = await axios.get( API_URL + "/lookup.php?" , {
            params:{
                i: req.body.num
            }
        });
        res.render("result.ejs", { contentMealInfo: result.data.meals });       
    } catch (error) {
        res.status(500).send(error.message);    
    }
});

app.listen(port, () =>{
    console.log(`Server is running in port ${port}`);
});



