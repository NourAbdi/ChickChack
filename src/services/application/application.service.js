import { db } from "../../utils/env";
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

const applicationDataId = "vKgrGTsBfCmuhKFaEW66";

export const getApplicationData = async () => {
    
    try {
        const applicationDataRef = doc(db, "applicationData", applicationDataId);
        const applicationDataDoc = await getDoc(applicationDataRef);
    
        if (applicationDataDoc.exists()) {
          const applicationdata = applicationDataDoc.data();
          return applicationdata;
        } else {
          throw new Error("applicationData not found.");
        }
      } catch (error) {
        console.error("Error fetching applicationData:", error);
        return null;
      }
    };
