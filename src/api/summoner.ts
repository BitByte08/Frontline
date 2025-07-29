import axios from '@/lib/axiosInstance';

export const getSummoner = async (summoner: string) => {
    try {
        const [riotName, riotTag] = summoner.split("#");
        const res = axios.get(`/summoner/${riotName}/${riotTag}`).then((res) => res.data);
        return res;
    } catch (error) {
        console.error(error);
    }
};
