import axios from "axios";

export class Mems {
    static async getMems(){
        try{
            const response = await axios.get('https://api.imgflip.com/get_memes')
             return response.data; 
        }
        catch(e) {
            console.error("Error fetching memes:", e);
             throw e;
        }
    } 
    
}
