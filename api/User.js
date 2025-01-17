const router = require("express").Router();
const User = require("../model/User");
const Image = require("../model/Image");
const Profile = require("../model/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateRandomString = require("../middleware/randomString");
const mailgun = require("mailgun-js");
const config = require("config");
const authenticate = require("../middleware/authenticate");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateForgetInput = require("../validation/forgetPassword");
const validateResetInput = require("../validation/resetPassword");
// import image upload services & configuration
const upload = require("../services/ImageUpload");
const singleUpload = upload.single("image");
// @route   GET api/user/records
// @desc    GET User Records of Activities
// @access  Private
router.get("/activity", authenticate, async (req, res) => {
  try {
    // get current user
    const user = await User.findOne({ _id: req.user.id });
    // response
    res.status(200).json(user.activities);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   GET api/user/register
// @desc    Register New User
// @access  Public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors: Array.from(errors) });
  }

  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const secretToken = generateRandomString(30);

    const newUser = new User({
      name,
      email,
      password,
      secretToken
    });

    const mg = mailgun({
      apiKey: config.get("mailgun-key"),
      domain: config.get("mailgun")
    });
    const data = {
      from: "no-reply@yourwebapplication.com",
      to: newUser.email,
      subject: "Account Verification Token",
      html: `
                            <h3> Hello  <i>${name}</i></h3>
                            <p> Please verify your account by clicking the button Below</p><br>
                            <a href = "https://${req.headers.host}/api/user/verify/${newUser.secretToken}"><button>confirm your account</button></a>
                            `
    };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.json({
              message: "Account Created, Please verify your email"
            });
          })
          .catch(err => console.error(err));
      });
    });

    mg.messages().send(data, function(error, body) {
      console.log(body);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//@route Post api/user/verify
//@desc  confrim email
//access  Private

router.post("/verify/:secretToken", async (req, res) => {
  const secretToken = req.params.secretToken;

  try {
    const user = await User.findOne({ secretToken: secretToken });
    if (!user) {
      const secretToken = "This is not our secret Token or it has expires";
      return res.status(404).json(secretToken);
    }

    if (user) {
      user.isVerified = true;
      user.secretToken = "";
      const saved = await user.save();
      res.json(saved);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   POST api/user/forgetpassword
// @desc    reset password User
// @access  Public
router.post("/forgetpassword", async (req, res) => {
  const { errors, isValid } = validateResetInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    // Check for user
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User already exists" }] });
    }

    if (user) {
      // create my secret token for resetpasswordtoken
      const resetToken = generateRandomString(36);
      // create an expire date for the resettoken
      const resetExpire = Date.now() + 3600000; // 1 hour
      const success = "A reset password link have been sent to you mail.";

      user.passwordResetToken = resetToken;
      user.passwordResetExpires = resetExpire;
      //send email to user informing about password token

      const mg = mailgun({
        apiKey: config.get("mailgun-key"),
        domain: config.get("mailgun")
      });
      const data = {
        from: "no-reply@yourwebapplication.com",
        to: email,
        subject: "Password Reset Token",
        html: ` <h3> <i>Hello</i></h3>
                      <p> you are receiving this mail because we belive<br>
                          you request for a reset password, kindly click the button below<br>
                          if you actually request this or ignore and take every neccessary measure to<br>
                          your account. Thanks
                       </p>
                      <a href = "http://${req.headers.host}/api/user/resetpassword/${user.passwordResetToken}"><button>Reset your Account Password</button></a>
                    `
      };
      mg.messages().send(data, function(error, body) {
        console.log(body);
      });
      //send email ends here
      const save = user.save();
      return res.status(200).json(success);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   POST api/user/resetpassword
// @desc    Reset password
// @access  Private
router.post("/resetpassword/:passwordResetToken", async (req, res) => {
  const { errors, isValid } = validateResetInput(req.body);
  //const passwordResetToken = req.params.passwordResetToken;
  const { password } = req.body;
  // Check Validation
  if (!isValid || errors) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findOne({
      passwordResetToken: req.params.passwordResetToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "This is not our password reset token" }] });
    }

    if (user.passwordResetToken < Date.now()) {
      return res.status(400).json({ errors: [{ msg: "Expired token" }] });
    }

    if (user) {
      user.password = bcrypt.hashSync(password, 10);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      const save = user.save();
      return res.status(200).json({ msg: "Password reset successfull" });
    }
    // get date
    let today = new Date().toLocaleDateString();
    // add activity
    const activity = {
      msg: "your password was changed on " + today
    };
    // add activity to user record
    user.activities.unshift(activity);
    // save changes
    await user.save();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   GET api/user
// @desc    Check Auth User
// @access  Private
router.get("/", authenticate, async (req, res) => {
  try {
    User.findById(req.user.id)
      .select("-password")
      .then(user => res.json(user));
    console.log(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
});

// @route   GET api/user/:id
// @desc    GET User by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("Image");

    if (!user) {
      res.status(400).json({ msg: "User not found" });
    } else {
      res.status(200).json({
        user,
        request: {
          type: "get",
          url: "http://localhost:5000/api/account/"
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// @route   GET api/user/login
// @desc    Login User
// @access  Public
router.post("/login", async (req, res) => {
  // Validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json({ errors: Array.from(errors) });
  }
  // Destructuring
  const { email, password } = req.body;
  // Check For User Existence
  try {
    const user = await User.findOne({ email });
    // const profile = await Profile.findOne({ user: user.id }).populate("User");

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // log activity

    // Password Validation Strategy
    const pasMatch = await bcrypt.compare(password, user.password);

    console.log(user.password, password);

    if (pasMatch) {
      // Generate Token
      jwt.sign(
        { id: user.id },
        config.get("tokenSecret"),
        { expiresIn: "2d" },
        (error, token) => {
          if (error) throw error;

          res.json({
            token: token,
            user: {
              id: user._id,
              email: user.email,
              name: user.name
            }
          });
        }
      );
    } else {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    // new date
    let today = new Date().toLocaleDateString();
    // log activity
    const activity = {
      msg: "your last login was on " + today
    };

    user.activities.unshift(activity);

    // save
    await user.save();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/user/image
// @desc    POST Change User Image
// @access  Private
router.post(
  "/image",
  upload.single("image"),
  authenticate,
  async (req, res) => {
    try {
      const newImage = new Image({
        user: req.user.id,
        avartar: req.file.location
      });
      const savedImage = await newImage.save();
      // add user avartar
      const user = await User.findById(req.user.id).select(
        "-notifications -message"
      );

      // user.avartar = savedImage;
      const re = (user.picture = savedImage.avartar);
      // const resaved = await user.save();

      await user.save();
      res.status(201).json(re);
    } catch (error) {
      console.error(error);
    }
  }
);

// @route   GET api/user/:id
// @desc    GET User by ID
// @access  Public
router.get("/image", authenticate, async (req, res) => {
  try {
    const userImage = await Image.findOne({ user: req.user.id });

    res.status(200).json(userImage);
  } catch (error) {
    console.error(error);
  }
});

// @route   GET api/user/:id
// @desc    GET User by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("avatar");

    console.log(user);
    if (!user) {
      res.status(400).json({ msg: "User not found" });
    } else {
      res.status(200).json({
        user,
        request: {
          type: "get",
          url: "http://localhost:5000/api/account/"
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
