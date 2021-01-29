import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
    const apiUrl = "/api/userprofile";

    const userProfile = localStorage.getItem("userProfile");
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => {
                localStorage.setItem("userProfile", JSON.stringify(userProfile));
                setIsLoggedIn(true);
                return userProfile;
            });
    };

    const logout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                localStorage.clear();
                setIsLoggedIn(false);
            });
    };

    const register = (userProfile, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(userProfile.email, password)
            .then((createResponse) =>
                saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid })
            )
            .then((savedUserProfile) => {
                localStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
                setIsLoggedIn(true);
                return savedUserProfile;
            });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => resp.json())
        );
    };

    const saveUser = (userProfile) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userProfile),
            }).then((resp) => resp.json())
        );
    };

    const getCurrentUser = () => {
        const user = localStorage.getItem("userProfile");
        if (!user) {
            return null;
        }
        return JSON.parse(user);
    };

    const isAdmin = () => {
        const user = getCurrentUser();
        const adminTypeId = 1;
        return user !== null && user.userTypeId === adminTypeId;
    };

    return (
        <UserProfileContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                register,
                getToken,
                getCurrentUser,
                isAdmin,
            }}
        >
            {isFirebaseReady ? (
                props.children
            ) : (
                    <Spinner className="app-spinner dark" />
                )}
        </UserProfileContext.Provider>
    );
}