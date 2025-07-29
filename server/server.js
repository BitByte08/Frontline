import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import "./env.js";
import {api_key} from "./api.js";


const port = 8080;
const app = express();
app.use(cors());
const serverUrl = "https://asia.api.riotgames.com";

app.get('/summoner/:riotName/:riotTag', async (req, res) => {
    const riotName = req.params.riotName;
    const riotTag = req.params.riotTag;
    const riotAccountUrl = `${serverUrl}/riot/account/v1/accounts/by-riot-id/${riotName}/${riotTag}`;

    try{
        const accountResponse = await fetch(riotAccountUrl, {
            method: "GET",
            headers: {
                "X-Riot-Token" : api_key,
            },
        });
        if(!accountResponse.ok){
            throw new Error("Could not find a response");
        }
        const accountData = await accountResponse.json();
        const summonersResponse = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}`,{
            method: "GET",
            headers: {
                "X-Riot-Token" : api_key,
            },
        });
        const summonersData = await summonersResponse.json();
        const leagueResponse = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-puuid/${accountData.puuid}`,{
            method: "GET",
            headers: {
                "X-Riot-Token" : api_key,
            }
        })
        const leagueData = await leagueResponse.json();
        const response = {
            "name" : riotName,
            "tag" : riotTag,
            "level" : summonersData.summonerLevel,
            "flexTier" : leagueData[0].tier,
            "flexRank" : leagueData[0].rank,
            "soloTier" : leagueData[1].tier,
            "soloRank" : leagueData[1].rank
        }
        res.json(response);
    } catch (err) {
        res.status(404).send(err);
    }
})

app.listen(port, function() {
    console.log("Server started on port 8080");
});
