import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
const port = 8080;
const app = express();
app.use(cors());
const API_KEY = "";
const serverUrl = "https://asia.api.riotgames.com";


app.get('/api/summoner/:riotName/:riotTag', async (req, res) => {
    const riotName = req.params.riotName;
    const riotTag = req.params.riotTag;
    const riotAccountUrl = `${serverUrl}/riot/account/v1/accounts/by-riot-id/${riotName}/${riotTag}`;

    try{
        const accountResponse = await fetch(riotAccountUrl, {
            method: "GET",
            headers: {
                "X-Riot-Token" : API_KEY,
            },
        });
        if(!accountResponse.ok){
            throw new Error("Could not find a response");
        }
        const accountData = await accountResponse.json();
        const summonersResponse = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}`,{
            method: "GET",
            headers: {
                "X-Riot-Token" : API_KEY,
            },
        });
        const summonersData = await summonersResponse.json();
        res.json(summonersData);
    } catch (err) {
        res.status(404).send("Could not find a response");
    }
})

app.listen(port, function() {
    console.log("Server started on port 8080");
});
