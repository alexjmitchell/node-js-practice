const MongoPassword = "yunhekv3";
const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const router = express.Router();
const url = `mongodb+srv://alex:${MongoPassword}@share-place-project-j9wj4.mongodb.net/locations?retryWrites=true&w=majority`;
const dbName = "share-place-project";
const client = new MongoClient(url, {
  useNewUrlParser: true
  // useUnifiedTopology: true
});

// const locationStorage = {
//   locations: []
// };

router.post("/add-location", (request, response, next) => {
  // const id = Math.floor(Math.random() * 9999999);

  // client.connect((err, client) => {
  //   const db = client.db("locations");
  //   db.collection("user-locations").insertOne(
  //     {
  //       address: request.body.address,
  //       coords: {
  //         lat: request.body.lat,
  //         lng: request.body.lng
  //       }
  //     },
  //     (err, r) => {
  //       console.log("response =========>", r);
  //       response.json({ message: "Stored Location!", locationId: id });
  //       client.close();
  //     }
  //   );
  // });

  client.connect(error => {
    const collection = client.db("locations").collection("user-locations");

    collection.insertOne(
      {
        address: request.body.address,
        coords: {
          lat: request.body.lat,
          lng: request.body.lng
        }
      },
      (err, res) => {
        console.log("response from mongo", res);
        response.json({
          message: "Stored Location",
          locationId: res.insertedId
        });
      }
    );
    client.close();
  });

  // locationStorage.locations.push({
  //   id: id,
  //   address: request.body.address,
  //   coords: {
  //     lat: request.body.lat,
  //     lng: request.body.lng
  //   }
  // });
});

router.get("/location/:id", (request, response, next) => {
  const locationId = request.params.id;
  // const location = locationStorage.locations.find(location => {
  //   return location.id === locationId;
  // });
  // if (!location) {
  //   return response.status(404).json({ message: "Not found!" });
  // }

  // response.json({
  //   address: location.address,
  //   coordinates: location.coords
  // });

  client.connect(error => {
    const db = client.db("locations").collection("user-locations");

    db.findOne({ _id: new mongodb.ObjectID(locationId) }, async (err, doc) => {
      const document = await doc
      if (!document) {
        return response.status(404).json({ message: "Not found!" });
      }

      response.json({
        address: document.address,
        coordinates: document.coords
      });
    });
  });

  client.close();
});

module.exports = router;
