import { url } from "./configuration";

export const getSections = async (token) => {
    const reponse = await fetch(`${url}/sections/`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await reponse.json();
};