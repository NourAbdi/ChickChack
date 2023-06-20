import { host, db } from "../../utils/env";
import {
    collection,
    onSnapshot,
    updateDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

export const getTransporterByUserUid = async (userUid) => {
    try {
        const userRef = doc(db, "users", userUid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            // User document exists
            const userData = userSnapshot.data();
            const transporterUid = userData.transporterUid;

            if (transporterUid) {
                const transporterRef = doc(db, "transporters", transporterUid);
                const transporterSnapshot = await getDoc(transporterRef);

                if (transporterSnapshot.exists()) {
                    // Transporter document exists
                    const transporterData = transporterSnapshot.data();
                    console.log(transporterData);
                    // Process the transporter data as needed
                    return transporterData;
                }
            }
        }

        // User or transporter document does not exist
        return null;
    } catch (error) {
        throw new Error("Error fetching transporter: " + error.message);
    }
};

export const updateTransporterData = async (transporterUid, workingHours, openStatus) => {
    try {
        const transporterRef = doc(db, "transporters", transporterUid);
        const transporterSnapshot = await getDoc(transporterRef);

        if (transporterSnapshot.exists()) {
            // Transporter document exists
            const transporterData = transporterSnapshot.data();

            const updatedTransporterData = {
                ...transporterData,
                workingHours: workingHours,
                openStatus: openStatus
            };

            await updateDoc(transporterRef, updatedTransporterData);

            console.log("Transporter data updated successfully.");
        } else {
            throw new Error("Transporter document does not exist.");
        }
    } catch (error) {
        throw new Error("Error updating transporter data: " + error.message);
    }
};

export const fetchAreaOrders = async (citiesUid, setAreaOrders) => {
    try {
        const shopUids = await getShopUidsByCities(citiesUid);
        const ordersRef = collection(db, "orders");
        const areaOrdersQuery = query(ordersRef,
            where("shopUid", "in", shopUids),
            where("orderOption", "==", "Delivery"),
        );
        const unsubscribe = onSnapshot(areaOrdersQuery, (snapshot) => {
            const orders = [];
            snapshot.forEach((doc) => {
                const order = doc.data();
                orders.push(order);
            });
            console.log("orders: ", orders);
            setAreaOrders(orders);
        });

        // Return the unsubscribe function to clean up the listener
        return unsubscribe;
    } catch (error) {
        console.log("Error fetching area orders:", error);
    }
};

const getShopUidsByCities = async (citiesUid) => {
    const citiesRef = collection(db, "cities");
    const citiesQuery = query(citiesRef, where("cityUid", "in", citiesUid));
    const citiesSnapshot = await getDocs(citiesQuery);

    const shopUids = [];
    await Promise.all(citiesSnapshot.docs.map(async (doc) => {
        const city = doc.data();
        for (const shopUid of city.shopsUid) {
            shopUids.push(shopUid);
        }
    }));

    return shopUids;
};

export const updateOrderStageAndTimeData = async (orderId, _orderStage, _deliveryTime) => {
    try {
        console.log("11111111111111",orderId, _orderStage, _deliveryTime);
        const orderRef = doc(db, "orders", orderId);
        const orderSnapshot = await getDoc(orderRef);

        if (orderSnapshot.exists()) {
            console.log("222222222222", orderSnapshot.exists());
            const existingOrderData = orderSnapshot.data();
            const updatedOrderData = {
                ...existingOrderData,
                orderStage: _orderStage,
                deliveryTime: _deliveryTime
            };

            await updateDoc(orderRef, updatedOrderData);
            console.log("Order data updated successfully.");
        } else {
            throw new Error("Order document does not exist.");
        }
    } catch (error) {
        throw new Error("Error updating order data: " + error.message);
    }
};


