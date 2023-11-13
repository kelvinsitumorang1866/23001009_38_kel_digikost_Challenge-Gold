// import { initializeApp } from 'firebase-admin/app';
import { initializeApp } from 'firebase/app';
// import { Storage } from 'firebase-admin/lib/storage/storage';
const firbaseConfig = {
    "type": "service_account",
    "project_id": "digikost-83396",
    "client_email": "firebase-adminsdk-h0s0z@digikost-83396.iam.gserviceaccount.com",
    "client_id": "102191904418048108095",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h0s0z%40digikost-83396.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"

}

const app = initializeApp(firbaseConfig);
// const storage = Storage(app);

module.exports = app;
  



