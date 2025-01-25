const cors = require("cors");
const fetch = require("node-fetch");
const express = require("express");
const admin = require("firebase-admin");
var serviceAccount = require("./../project2024tic-firebase-adminsdk-gv9er-47f6e77d5f.json");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/getMyUser", async (req, res) => {
  console.log("getMyUser");

  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).send("You must be logged in.");
    }

    //Decode with firebase, see if the token is all good
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    console.log("userId", userId);
    const userRef = admin.firestore().collection("users").doc(userId);
    const doc = await userRef.get();
    console.log("doc", doc);
    if (!doc.exists) {
      console.log("No such document!");
      return res.status(405).json({ message: "No User data found." });
    }

    res.json(doc.data());
  } catch (error) {
    console.log(error);
    res.status(500).send({ mssage: "Error getting user data" });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const userRef = admin.firestore().collection("users");
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No Users data found." });
    }

    let usersData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(usersData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ mssage: "Error getting users data" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
