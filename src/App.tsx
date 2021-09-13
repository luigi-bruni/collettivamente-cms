import React from "react"

import {
  Authenticator,
  CMSApp,
  NavigationBuilder,
} from '@camberi/firecms'


import firebase from "firebase/app"

import { navigation as cmsNavigation } from "./cms-data-types/navigation"
import { isOwner } from "./utils"

import "@fontsource/rubik"
import "@fontsource/space-mono"

const firebaseConfig = {
  apiKey: "AIzaSyBTDIHkK45O2EiU-E8O8-75MPc702Pn3Wo",
  authDomain: "collettivamente-cms.firebaseapp.com",
  projectId: "collettivamente-cms",
  storageBucket: "collettivamente-cms.appspot.com",
  messagingSenderId: "179791805757",
  appId: "1:179791805757:web:50f73ca3e88c3084079954"
};

export default function App() {
  const navigation: NavigationBuilder = cmsNavigation;

  const myAuthenticator: Authenticator = (user?: firebase.User) => {
    return isOwner(user)
  }

  return <CMSApp
    name={"Collettivamente CMS"}
    authentication={myAuthenticator}
    navigation={navigation}
    firebaseConfig={firebaseConfig}
  />;
}
