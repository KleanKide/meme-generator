export class Mems {
    static async getMems(){
        try{
            const response = await fetch('https://api.imgflip.com/get_memes')
            const data = response.json()
             return data; 
        }
        catch(e) {
            console.error("Error fetching memes:", e);
             throw e;
        }
    } 
    
}
