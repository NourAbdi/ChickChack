import { host } from "../../utils/env";

export const getShopDetails = async (shopOwnerUid) => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    try {
        const response = await fetch(`${host}/getShopDetails?shopOwnerUid=${shopOwnerUid}`, requestOptions);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error getting shop details');
    }
};

export const updateShopDetails = async (shopUid, updatedShopDetails) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedShopDetails), // Pass the updatedShopDetails object as JSON string
    };

    try {
        console.log("Trying to update shop details with requestOptions:", requestOptions.body);
        console.log("and shop uid:", shopUid);
        const response = await fetch(`${host}/updateShopDetails?shopUid=${shopUid}`, requestOptions);
        const data = await response.text();
        console.log("Response from updateShopDetails:", data); // Log the response data
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error updating shop details');
    }
};
