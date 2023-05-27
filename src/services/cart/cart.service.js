import { host } from "../../utils/env";

export const saveOrder = async (order) => {
    console.log("trying to save the order :", order, JSON.stringify({ order }));
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
    };

    try {
        const response = await fetch(`${host}/saveOrder`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Error saving the order");
    }
};

export const getPastOrdersByUserUid = async (userUid) => {
    console.log("trying to get the past orders:", userUid);
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    try {
        const response = await fetch(
            `${host}/getPastOrdersByUserUid?userUid=${userUid}`,
            requestOptions
        );
        const data = await response.json();
        return data.orders;
    } catch (error) {
        console.log(error);
        throw new Error("Error retrieving past orders");
    }
};





