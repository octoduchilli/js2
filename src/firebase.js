import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyBBXQjbUMewv-a4SYUq9RYR8tu-dEDf7sc',
  authDomain: 'js2-8e02b.firebaseapp.com',
  databaseURL: 'https://js2-8e02b.firebaseio.com',
  projectId: 'js2-8e02b',
  storageBucket: 'js2-8e02b.appspot.com',
  messagingSenderId: '613915370898'
})

export const db = app.database()
