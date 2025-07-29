import React, {useEffect} from 'react';
import { getSummoner } from "@/api/summoner";

const Home: React.FC = () => {
    useEffect(() => {
        const test = async () => {
            console.log(await getSummoner("March of Time#Bit"));
        }
        test();
    }, []);
    return (
        <main>
            Home
        </main>
    )
}

export default Home