 import { url } from "./configuration";

 export const retrieveRooms = async (token) => {
   const reponse = await fetch(`${url}/rooms`, {
     method: "GET",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   });
   return await reponse.json();
 };