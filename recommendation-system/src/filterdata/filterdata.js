import data from "../info.json" assert {type:"json"}

const get_data=((genres,categories,studio,free_flag)=>
{   
    let user_games=[]
    for (let gameid in data)
    {   
        if(data[gameid].free === free_flag)
        {
            data[gameid].genres.forEach(genre => {
                if(genres.includes(genre))
                {
                    data[gameid].categories.forEach(category =>{
                        if(categories.includes(category))
                        {   
                            data[gameid]["developer"].forEach(developer => {
                                if(studio.includes(developer))
                                {
                                    if(!user_games.includes(data[gameid].name))
                                    {
                                        user_games.push(data[gameid].name) 
                                    }
                                }
                            })                            
                        }
                    })
                }

            });
        }
        

    }
    console.log("User Games are:",user_games);
})

get_data(["Action"," Strategy"," Adventure"],["Single-player"],["Ubisoft Montreal"],"FALSE")