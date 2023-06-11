import { Platform } from "react-native";

const liveHost = "https://us-central1-chickchack-3069a.cloudfunctions.net";
const localHost = "https://localhost:5001/chickchack-3069a/us-central1";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = true;
// export const host = !isDevelopment || isAndroid ? liveHost : localHost;
export const host = liveHost ;



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWkA7XZsBTOGfiRh9YGTDrbzcusOJUhcs",
    authDomain: "chickchack-3069a.firebaseapp.com",
    projectId: "chickchack-3069a",
    storageBucket: "chickchack-3069a.appspot.com",
    messagingSenderId: "497036758885",
    appId: "1:497036758885:web:6c1d2e545d8a8bf35cdb8c",
    type: "service_account",
    project_id: "chickchack-3069a",
    private_key_id: "30eb053b4a2996a21a287ca67717c91a21559721",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDblPJ9F8fT/nRR\nQe7/zH+JOjLprJPLuFNA8taoKOqCLmQpWJtF055iNjQRxQ0sTHgoDBHPCBjolhd8\nF9Lm8IhH8Whn0BcObS0mw9twGiWE/rbImd1BOGdJvKF66RU+e01lmNTfXaINtM+W\nJ3hbkajJOdA6gG2mwL8ceb6P67RSyZ1XkLAaQmCGIeCp3XdtTrPW/lXy1rKPNV65\nfBk0FjkH0GP+V0rq5MHKyE60weyRh4oNY3jMk56e6lrovqdMXRQCmx1OwjhptYCG\ntXxgjIgk07/X0d7blKndnR1zljoRO3OJab1wHXTd7+k0X9JflLxWm38qyfCkWMZF\nG99n9IvLAgMBAAECggEAOZyj3tRddq69gBBnj6/tCmk9sHe6M2pCVbkhPu+1T8Cy\nQPLhknmKhcQo9zyXTzclE4TPK125g1TWBpYNnNAhQZcCSLKdSgi1HwWmToxdqb5W\n4N0V4yXUW9FlIOWE0GbzkKN/vrdHbIczK/dhKc1W1q0XiDHoEydhPSxoJkS2hD2r\nXF317uRi0UkW4x0ykX7xhMveFNazVoQAbCZweLIMWEGwJS2xJ108vvnJsESTw+/C\ncav4JKmFBZDiOfvN4/mOOqnK2hFSQcmtL4tWX8QgSZQv/b3ITwy/SIxxCKpfTIm+\nB4WyqVbeQx3zzTEajCXskICkkZAZUXieG1HSlekj4QKBgQDyM71it3RSTp+7xmwN\nu+UmdPzEYS+Zzi+CREtODIlEPlAmariW+k1kSAMrIjSwfAUyErybN4vxhs6xFwXY\n0t/tjbQlOQGVztr7IwBR7BWri19QTbVP/meTlKshvE9VIXIA6FeXXB0pCnME0LvT\nzSFyDbVoQ7g2WYcThmOGHP2ZEQKBgQDoF1CNDKhsQS/ew0D4zS+QJ+g+8dUv/bOX\nOeDwkO90dmU2dk7LNYCR7bAm3KVDdfnUWPJSKTsLbG901aqxzbBkUDAfDJBg0B/A\nOUipt2iNsnl9OQE83PO0G9arf13DSn/Jw9arEpBjf5NcAzZNm+WxuHd8LtWn/IJK\nqeC90ib3GwKBgQDqoxk8A0IbYrP4c7fGblsGsJsXnJdCx67a4lKZ4CczB7MaJJWD\nHiXPmrwHE3I770oRQnmZXWyjpdejVAyEC3aIapk03k8c1HLsjPIIa1BrCfBimYWn\nY2zwWjyXyBiK/oW1P2Fr7v8I/WiEJ7tu6vEVzxYJVmGltYHYdn8ANCGyIQKBgQC7\nG8i53gGOPMN+AMXJj4oP2sx2qnpnlU4K1gONjhsuNiEE1j5Rv1Fm1EvWGL43c840\nrny1Vj4eyI3WkEdrztqtFKSm83cWRdPDIat9/7oPuloNZT6lNbBXfLYFTsplnhMF\ns5fGFVJIlNpVLNXDnbKBI6lYeV2Qb5cO4IOqJNl7DwKBgQCI3FwQn4ZWNEgPE4LN\nNKxiDogCnQe81PqrCcEQ9gFupZbu0WU9pGpEJgCJcZhGPulYu9BLoZtj+Tca++2p\nvcsaBD7F83ln4XHhcaeycTNIfu3eHUvJ295w/2hc2Dtd+zz3cU+qWNn7h4n0XX67\nLa8TymomRw0plpPpK1hR2ja2rg==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-zsh9k@chickchack-3069a.iam.gserviceaccount.com",
    client_id: "110577393020935911573",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zsh9k%40chickchack-3069a.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  };
  
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
