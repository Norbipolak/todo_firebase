/*getPrototypeOf
The Object.getPrototypeOf method returns the prototype (i.e., the internal [[Prototype]] property) of the specified object. 
The prototype is the object from which the specified object inherits its properties.
*/
Object.getPrototypeOf(obj)
/*
obj: The object whose prototype is to be returned.

Returns:
The prototype of the given object. If the object does not inherit from another object, null is returned.
*/

const proto = { foo: 'bar' };
const obj = Object.create(proto);

console.log(Object.getPrototypeOf(obj)); // { foo: 'bar' }
console.log(Object.getPrototypeOf(obj) === proto); // true
/*
setPrototypeOf
The Object.setPrototypeOf method sets the prototype 
(i.e., the internal [[Prototype]] property) of a specified object to another object or null.
*/
Object.setPrototypeOf(obj, prototype)
/*
obj: The object which is to have its prototype set.
prototype: The object's new prototype (an object or null).

Returns:
The object with its prototype set to the new value.
*/
const proto1 = { foo: 'bar' };
const proto2 = { baz: 'qux' };
const obj = Object.create(proto1);

console.log(Object.getPrototypeOf(obj)); // { foo: 'bar' }

Object.setPrototypeOf(obj, proto2);
console.log(Object.getPrototypeOf(obj)); // { baz: 'qux' }
/*
Practical Use Cases
Inheriting Methods and Properties: 
By setting an object's prototype to another object, you can inherit properties and methods from that prototype.

Dynamic Prototyping: 
Allows you to dynamically change the behavior of objects at runtime by changing their prototypes.
*/
class Parent {
  constructor() {
    this.foo = 'bar';
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.baz = 'qux';
  }
}

const obj = new Child();
console.log(obj.foo); // 'bar'
console.log(obj.baz); // 'qux'
console.log(Object.getPrototypeOf(obj) === Child.prototype); // true
console.log(Object.getPrototypeOf(Object.getPrototypeOf(obj)) === Parent.prototype); // true

/*
Firebase or Firestore!!!!! 
metódusok 
-> 
Firebase Authentication

firebase.auth().createUserWithEmailAndPassword(email, password): Creates a new user with the specified email and password.

firebase.auth().signInWithEmailAndPassword(email, password): Signs in a user with the specified email and password.

firebase.auth().signOut(): Signs out the currently signed-in user.

firebase.auth().onAuthStateChanged(callback): Registers an observer for changes to the user's sign-in state.

firebase.auth().sendPasswordResetEmail(email): Sends a password reset email to the specified email address.
***
Firestore

firebase.firestore().collection(collectionPath): Gets a CollectionReference instance that refers to the specified collection.

collectionRef.add(data): Adds a new document with the specified data to the collection.

documentRef.set(data): Sets the data of the document, overwriting any existing data.

documentRef.update(data): Updates fields in the document without overwriting the entire document.

documentRef.get(): Retrieves the document referred to by the DocumentReference.

collectionRef.where(field, opStr, value): Creates a query against the collection.

Real-time Database

firebase.database().ref(path): Gets a Reference instance for the specified path.

ref.set(value): Sets the value at the specified reference path.

ref.update(values): Updates values at the specified reference path.

ref.once(eventType): Listens for a single event of the specified type, and then stops listening.

ref.on(eventType, callback): Listens for events of the specified type.
**
Cloud Storage

firebase.storage().ref(path): Gets a reference to the file at the specified path.

storageRef.put(file): Uploads the file to the specified reference.

storageRef.getDownloadURL(): Gets the download URL for the file at the specified reference.
****
Cloud Functions

firebase.functions().httpsCallable(functionName): Gets a reference to the callable HTTPS function with the specified name.

functionRef.call(data): Calls the HTTPS function with the specified data.
*/

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Authentication example
firebase.auth().createUserWithEmailAndPassword("user@example.com", "password123")
  .then((userCredential) => {
    console.log("User created:", userCredential.user);
  })
  .catch((error) => {
    console.error("Error creating user:", error);
  });

// Firestore example
const db = firebase.firestore();
db.collection("users").add({
  name: "John Doe",
  email: "john.doe@example.com"
})
  .then((docRef) => {
    console.log("Document written with ID:", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document:", error);
  });

// Real-time Database example
const dbRef = firebase.database().ref('users/123');
dbRef.set({
  username: "johndoe",
  email: "john.doe@example.com"
})
  .then(() => {
    console.log("Data saved successfully!");
  })
  .catch((error) => {
    console.error("Error saving data:", error);
  });

// Cloud Storage example
const storageRef = firebase.storage().ref('images/profile.jpg');
const file = ...; // Use a File object from an input element, for example
storageRef.put(file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});

// Cloud Functions example
const addMessage = firebase.functions().httpsCallable('addMessage');
addMessage({ text: 'Hello, world!' })
  .then((result) => {
    console.log(result.data);
  });
/*
*****************************************************************************************************************
firebase példa 
*/
// Assuming you have already initialized Firebase and Firestore
const db = firebase.firestore();

// Fetching the documents from the "todos" collection
db.collection('todos').get()
  .then((snapshot) => {
    // Transforming documents into an array of objects
    const todoData = snapshot.docs.map(doc => ({
      ID: doc.id,
      ...doc.data()
    }));
    
    console.log(todoData);
    // Now, todoData is an array of objects where each object includes the document ID and data
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });

/*
Example Output:
If your "todos" collection has documents with fields like title and completed, the output might look like this:
*/
[
  { ID: 'doc1ID', title: 'Buy groceries', completed: false },
  { ID: 'doc2ID', title: 'Read a book', completed: true },
  // more documents...
]

/****************************************************************************************/
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

async function addTodoItem(todo) {
  try {
    // Add a new document with the provided todo data
    const docRef = await addDoc(collection(db, "todos"), todo);
    
    // Add the document ID to the todo object
    todo.ID = docRef.id;
    
    console.log("Document written with ID: ", docRef.id);
    console.log("Updated todo object: ", todo);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// Example usage
const todo = {
  title: "Buy groceries",
  completed: false
};

addTodoItem(todo);
/******************************************************************************************************/
await deleteDoc(doc(db, "todos", id));
/*
db: Your Firestore database instance.
"todos": The name of the collection.
id: The ID of the document you want to delete.
*/
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

async function deleteTodoItem(id) {
  try {
    // Create a reference to the document to be deleted
    const docRef = doc(db, "todos", id);
    
    // Delete the document
    await deleteDoc(docRef);
    
    console.log(`Document with ID ${id} has been deleted.`);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

// Example usage
const todoId = "abc12345"; // The ID of the document you want to delete
deleteTodoItem(todoId);
/***************************************************************************************************************************************/
//Deleting all documents from the collection 
import { getFirestore, collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

async function deleteCollection(collectionName) {
  try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, collectionName, document.id));
    });
    
    console.log(`All documents in the collection '${collectionName}' have been deleted.`);
  } catch (error) {
    console.error("Error deleting collection: ", error);
  }
}

// Example usage
deleteCollection("todos");


