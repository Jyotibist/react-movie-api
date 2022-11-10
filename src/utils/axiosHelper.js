import axios from "axios";

export const fetchData = (str) => {
  const apiEp = `https://www.omdbapi.com/?t=${str}&apikey=1c49254a`;
  try {
    return axios.get(apiEp);
  } catch (error) {
    console.log(error);
  }
};
