import { url } from "./configuration";

export const retrieveRoomTypes = async (token) => {
    const reponse = await fetch(`${url}/roomTypes`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await reponse.json();
}