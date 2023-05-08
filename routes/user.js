const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');


// register endpoint
router.post("/register", (request, response) => {
    // hash the password
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
          username: request.body.username,
          email: request.body.email,
          password: hashedPassword,
        });
  
        // save the new user
        user
          .save()
          // return success if the new user is added to the database successfully
          .then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch error if the new user wasn't added successfully to the database
          .catch((error) => {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        response.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
  });

  
// login endpoint
router.post("/login", (request, response) => {
    // check if email exists
    User.findOne({ email: request.body.email })
  
      // if email exists
      .then((user) => {
        // compare the password entered and the hashed password found

        bcrypt
          .compare(request.body.password, user.password)
  
          // if the passwords match
          .then((passwordCheck) => {
  
            // check if password matches
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }
  
            //   create JWT token
            const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
  
            //   return success response
            response.status(200).send({
              message: "Login Successful",
              email: user.email,
              username: user.username,
              token,
            });
          })
          // catch error if password does not match
          .catch((error) => {
            response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        response.status(404).send({
          message: "Email not found",
          e,
        });
      });
});

// forgot endpoint
router.post("/forgot", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      const email = user.email;
      const newPassword = randomstring.generate(7);

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'parkovkaavto@gmail.com',
          pass: 'wdxglbdcgaqekxqa'
        }
      });

      var mailOptions = {
        from: 'parkovkaavto@gmail.com',
        to: email,
        subject: 'Ваш новий пароль для parkovka.ua',
        html:`<p>Це ваш новий пароль: ${newPassword}</p><a href="http://parkovka.in.ua/login" target="_blank">http://parkovka.in.ua/login</a>`,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {

          async function updatePassword() {
            try {
              bcrypt.hash(newPassword, 10, async function(err, hashedUpdatedPassword) {
                const filter = { email: email };
                const update = { password: hashedUpdatedPassword };

                await User.findOneAndUpdate(filter, update, {
                  new: true
                });

              });
                 
            }catch(err) {
                console.log(err);
            } 
          }

          updatePassword();
          
          response.status(200).send({
            message: "New password generated",
          });

        }
      });
      
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});
  
module.exports = router;