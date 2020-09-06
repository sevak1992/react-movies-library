import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const {
  REACT_APP_FIREBASE_API_KEY: FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN: FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL: FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_MEASUREMENT_ID: FIREBASE_MEASUREMENT_ID,
  REACT_APP_FIREBASE_PROJECT_ID: FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_APP_ID: FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  measurementId: FIREBASE_MEASUREMENT_ID,
  projectId: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID,
};

app.initializeApp(firebaseConfig);

const auth = app.auth();
const db = app.database();
const googleProvider = new app.auth.GoogleAuthProvider();

export const doCreateUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const doSignInWithGoogle = () =>
  auth.signInWithPopup(googleProvider).then((res) => {
    return res;
  });

export const doSignOut = () => auth.signOut();

export const user = (uid) => db.ref(`users/${uid}`);

export const users = () => db.ref("users");

export const favorites = (uid) => db.ref(`favorites/${uid}`);

export const favorite = () => db.ref("favorites");

export const onAuthUserListener = (next) =>
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      user(authUser.uid)
        .once("value")
        .then((snapshot) => {
          const dbUser = snapshot.val();
          if (!dbUser) {
            next({});
            return;
          }
          favorites(authUser.uid).on("value", (snapshot) => {
            const jobsObject = snapshot.val();
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              favorites: jobsObject || {},
              ...dbUser,
            };

            next(authUser);
          });
        })
        .catch(() => {
          /* TODO: handle */
        });
    } else {
      next(null);
    }
  });
