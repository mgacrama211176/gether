import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";

dotenv.config();
const uri = process.env.URI;

export const fetchAllUsers = async (request, response, next) => {
  // connect to DB 1st
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");
    const param = request.params.param;

    //fetch All data from the Database to an Array of objects.

    const data = await users.findOneAndUpdate(
      { resetPasswordToken: param },
      {
        $set: { validated: true },
      },
      { new: true }
    );
    console.log(data);
    response.status(200).json(data);
  } catch (err) {
    next(err);
  } finally {
    //Close DB after all functions are done.
    await client.close();
  }
};

export const forgotPassController = async (request, response, next) => {
  // connect to DB 1st
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const users = database.collection("users");
    const validatorToken = crypto.randomBytes(20).toString("hex");

    const chkEmail = request.body.email;
    const password = validatorToken;
    const hashedPassword = await bcrypt.hash(password, 10);

    //fetch All data from the Database to an Array of objects.
    try {
      const data = await users.findOneAndUpdate(
        { email: chkEmail },
        {
          $set: {
            resetPasswordToken: validatorToken,
            resetPasswordExpire: Date.now() + 3600000,
            hashed_password: hashedPassword,
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
        from: "getherapplication@gmail.com",
        to: chkEmail,
        subject: "Gether password reset",
        text:
          `We have received your request for changing of password. \n \n` +
          `Your Email address is ${chkEmail} \n \n` +
          `Your new password is ${validatorToken} \n \n` +
          `To reset your password please click the link below and go to user rofile and reset password: \n \n` +
          `http://localhost:3000 \n \n` +
          `If you did not request for change of password, please ignore this email. \n`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("there was an error: ", err);
        } else {
          console.log("here is the response: ", info);
          response.status(200).json("Email sent!");
        }
      });

      console.log(chkEmail);
    } catch (err) {
      response.status(500).json(err);
    }
  } catch (err) {
    next(err);
  } finally {
    //Close DB after all functions are done.
    await client.close();
  }
};
