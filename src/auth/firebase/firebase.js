import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMSZgmSbjpXMRthBHxEYOnXy07UofHRfI",
  authDomain: "tmtb-b8251.firebaseapp.com",
  databaseURL: "https://tmtb-b8251.firebaseio.com",
  measurementId: "G-S71TJRLWGQ",
  projectId: "tmtb-b8251",
  appId: "1:657364492166:web:eabc247df61f2feb3d1607",
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

export const onAuthUserListener = (next, fallback) =>
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
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            providerData: authUser.providerData,
            ...dbUser,
          };

          next(authUser);
        })
        .catch(() => {
          /* TODO: handle */
        });
    } else {
      fallback();
    }
  });
