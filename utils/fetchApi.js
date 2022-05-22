import axios from 'axios';


export const baseUrl = 'https://bayut.p.rapidapi.com'




export const fetchApi = async (url) => {

    const {data} = await axios.get((url),  {
      
        headers: {
    'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
    'X-RapidAPI-Key': 'b040c03499mshecdf9af52634d5fp1b1a05jsnacc2fdbbc6cb'
  }
    })

    return data;
}

export default fetchApi