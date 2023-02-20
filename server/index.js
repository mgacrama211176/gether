import express from "express";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";

//Routers
import adminRouter from "./router/adminRouter.js";
import validation from "./router/validation.js";
import usersRouter from "./router/usersRouter.js";
import notificationRouter from "./router/notificationRouter.js";

dotenv.config();

const uri = process.env.URI;
const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use((err, request, response, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return response.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

// Default
app.get("/", (req, res) => {
  res.json("Hello to my app");
});

app.use("/admin", adminRouter);
app.use("/validation", validation);
app.use("/usersInfo", usersRouter);
app.use("/notification", notificationRouter);

// Sign up to the Database
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const sanitizedEmail = email.toLowerCase();
    const validatorToken = crypto.randomBytes(20).toString("hex");

    const user = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
      validated: false,
      access: "user",
      resetPasswordToken: validatorToken,
      resetPasswordExpire: Date.now() + 3600000,
      matches: [],
      birthDate: new Date().toLocaleDateString(),
      url: "https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=",
    };

    const insertedUser = await users.insertOne(user);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    // At this point the account has been created so below this is the code for the sending of confirmation email to the regitered user.

    const transporter = nodemailer.createTransport({
      host: "smtp.mail.gmail.com",
      port: 465,
      service: "gmail",
      secure: false,
      auth: {
        user: "getherapplication@gmail.com",
        pass: "vzqxpazdqiemmkjz",
      },
      debug: false,
      logger: true,
    });

    console.log(transporter);

    const mailOptions = {
      from: "maruronu@gmail.com",
      to: req.body.email,
      subject: "Gether Verification",
      text:
        `Thank you for signing up for our services. To complete the registration process and start using our platform, we need to verify your email address.. \n \n` +
        `Please click the link below to confirm your email address: \n \n` +
        `https://getherapp-six.vercel.app/verified/${validatorToken} \n \n` +
        `If you did not sign up for our services, please ignore this email. \n`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("there was an error: ", err);
      } else {
        console.log("here is the response: ", info);
      }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  } finally {
    await client.close();
  }
});

// Create Account using Admin
app.post("/admin/signup", async (request, response, next) => {
  const client = new MongoClient(uri);
  const { email, password } = request.body;

  const generatedUserId = uuidv4();
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(request.body.password, salt);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return response.status(409).send("User already exists. Please login");
    }

    const sanitizedEmail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
      about: request.body.about,
      birthDate: request.body.birthDate,
      first_name: request.body.first_name,
      gender_identity: request.body.gender_identity,
      gender_interest: request.body.gender_interest,
      matches: request.body.matches,
      show_gender: request.body.show_gender,
      url: request.body.url,
      validated: false,
      access: request.body.access,
      resetPasswordToken: "",
      resetPasswordExpire: "",
    };
    const insertedUser = await users.insertOne(data);
    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    response.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
});

// Log in to the Database
app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;
  const validatorToken = crypto.randomBytes(20).toString("hex");

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      console.log(req.body);

      if (user.validated === false) {
        console.log(req.body.email);
        //Update the user Token to get the validated account
        const updatedUser = await users.findOneAndUpdate(
          { email: req.body.email },
          {
            $set: {
              resetPasswordToken: validatorToken,
              resetPasswordExpire: Date.now() + 3600000,
            },
          },
          { new: true }
        );

        // At this point the account has been created so below this is the code for the sending of confirmation email to the regitered user.

        const transporter = nodemailer.createTransport({
          host: "smtp.mail.gmail.com",
          port: 465,
          service: "gmail",
          secure: false,
          auth: {
            user: "getherapplication@gmail.com",
            pass: "vzqxpazdqiemmkjz",
          },
          debug: false,
          logger: true,
        });

        const mailOptions = {
          from: "gether@gmail.com",
          to: req.body.email,
          subject: "Gether Verification",
          text:
            `Thank you for signing up for our services. To complete the registration process and start using our platform, we need to verify your email address.. \n \n` +
            `Please click the link below to confirm your email address: \n \n` +
            `https://getherapp-six.vercel.app/verified/${validatorToken} \n \n` +
            `If you did not sign up for our services, please ignore this email. \n`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error("there was an error: ", err);
          } else {
            console.log("here is the response: ", info);
          }
        });

        res.status(201).json({ token, userId: user.user_id, user });
      } else {
        res.status(201).json({ token, userId: user.user_id, user });
      }
    } else {
      res.status(401).json("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  } finally {
    await client.close();
  }
});

// Get individual user
app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;
  console.log(userId);
  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

// Update User with a match
app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");

    const query = { user_id: userId };
    console.log(query);

    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.json(user);
  } finally {
    await client.close();
  }
});

// Update User with a match
// const { userId, selected } = req.body;
app.get("/unmatch/:userId/:selected", async (req, res) => {
  const client = new MongoClient(uri);

  const { userId, selected } = req.params;

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $pull: { matches: { user_id: selected } },
    };
    const user = await users.updateOne(query, updateDocument);

    const pair = { user_id: selected };
    const pairedUserRemove = {
      $pull: { matches: { user_id: userId } },
    };
    const paired = await users.updateOne(pair, pairedUserRemove);

    res.status(200).json("users unpaired");
  } finally {
    await client.close();
  }
});

// Get all Users by userIds in the Database
app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();

    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

// Get all the Gendered Users in the Database
app.get("/gendered-users", async (req, res) => {
  const client = new MongoClient(uri);
  const gender = req.query.gender;

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");
    const query = { gender_identity: { $eq: gender } };
    const foundUsers = await users.find(query).toArray();
    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

// Update a User in the Database
app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };

    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        gaming_interest: formData.gaming_interest,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);

    res.json(insertedUser);
  } finally {
    await client.close();
  }
});

// Get Messages by from_userId and to_userId
app.get("/messages", async (req, res) => {
  const { userId, correspondingUserId } = req.query;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});

// Add a Message to our Database
app.post("/message", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const messages = database.collection("messages");

    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("server running on PORT " + PORT));
