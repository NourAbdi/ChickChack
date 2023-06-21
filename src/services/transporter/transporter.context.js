import React, { useState, useEffect, createContext, useContext } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { fetchAreaOrders, getTransporterByUserUid, updateTransporterData, updateOrderStageAndTimeData } from "./transporter.service";

export const TransporterContext = createContext();

export const TransporterContextProvider = ({ children }) => {
    const { user } = useContext(AuthenticationContext);
    const [transporter, setTransporter] = useState(null);
    const [areaOrders, setAreaOrders] = useState([]);
    const [newOrders, setNewOrders] = useState([]);
    const [currentOrders, setCurrentOrders] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);
    const [editIsLoading, setEditIsLoading] = useState(true);
    const [areaOrdersIsLoading, setAreaOrdersIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransporter = async () => {
            try {
                const transporter = await getTransporterByUserUid(user.uid);
                setTransporter(transporter);
                setEditIsLoading(false);
            } catch (error) {
                console.log("Error fetching transporter:", error);
                setEditIsLoading(false);
            }
        };

        if (user && user.uid) {
            fetchTransporter();
        }
    }, [user]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (transporter && transporter.citiesUid) {
                setAreaOrdersIsLoading(true); 
                const unsubscribe = await fetchAreaOrders(transporter.citiesUid, setAreaOrders);
                setAreaOrdersIsLoading(false); 
                return () => {
                    unsubscribe();
                };
            }
        };

        fetchOrders();
    }, [transporter]);

    useEffect(() => {
        const splitOrders = async () => {
            if (areaOrders) {
                const newOrders = areaOrders.filter(
                    (order) => order.orderStage === "fresh" || order.orderStage === "onProcess"
                );
                const currentOrders = areaOrders.filter(
                    (order) => order.orderStage === "onDelivery" 
                );
                const pastOrders = areaOrders.filter(
                    (order) => order.orderStage === "done" || order.orderStage === "deny"
                );
                setNewOrders(newOrders);
                setCurrentOrders(currentOrders);
                setPastOrders(pastOrders);
            }
        };

        splitOrders();
    }, [areaOrders]);

    const updateTransporter = async (workingHours, openStatus) => {
        try {
            if (transporter && transporter.transporterUid) {
                await updateTransporterData(transporter.transporterUid, workingHours, openStatus);
                setTransporter((prevTransporter) => ({
                    ...prevTransporter,
                    workingHours: { ...workingHours },
                    openStatus,
                }));
            }
        } catch (error) {
            console.log("Error updating transporter data:", error);
        }
    };

    const updateOrderStageAndTime = async (orderId, orderStage, deliveryTime) => {
        try {
            if (orderId && orderStage && deliveryTime) {
                await updateOrderStageAndTimeData(orderId, orderStage, deliveryTime);
            }
        } catch (error) {
            console.log("Error updating order stage:", error);
        }
    };

    // useEffect(() => {
    //     if (user) {
    //         console.log("user changed: ", user);
    //     }
    //     if (transporter) {
    //         console.log("transporter changed: ", transporter);
    //     }
    //     if (areaOrders) {
    //         console.log("areaOrders changed: ", areaOrders);
    //     }
    //     if (newOrders) {
    //         console.log("newOrders changed: ", newOrders);
    //     }
    //     if (currentOrders) {
    //         console.log("currentOrders changed: ", currentOrders);
    //     }
    //     if (pastOrders) {
    //         console.log("pastOrders changed: ", pastOrders);
    //     }
    // }, [user, transporter, areaOrders, newOrders, currentOrders, pastOrders]);

    return (
        <TransporterContext.Provider
            value={{
                transporter,
                areaOrders,
                newOrders, 
                currentOrders, 
                pastOrders,
                editIsLoading,
                areaOrdersIsLoading,
                updateTransporter,
                updateOrderStageAndTime,
            }}
        >
            {children}
        </TransporterContext.Provider>
    );
};
