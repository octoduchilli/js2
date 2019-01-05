import { initializeApp } from 'firebase'

const test = {
  apiKey: "AIzaSyCYS9_5XtPHz1VMXH7Suvddgt3nZrQFshM",
  authDomain: "js2-test.firebaseapp.com",
  databaseURL: "https://js2-test.firebaseio.com",
  projectId: "js2-test",
  storageBucket: "js2-test.appspot.com",
  messagingSenderId: "480174289510"
}

const js2 = {
  apiKey: 'AIzaSyBBXQjbUMewv-a4SYUq9RYR8tu-dEDf7sc',
  authDomain: 'js2-8e02b.firebaseapp.com',
  databaseURL: 'https://js2-8e02b.firebaseio.com',
  projectId: 'js2-8e02b',
  storageBucket: 'js2-8e02b.appspot.com',
  messagingSenderId: '613915370898'
}

const app = initializeApp(js2)

export const db = app.database()
