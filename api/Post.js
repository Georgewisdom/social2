const router = require("express").Router();
const Post = require("../model/Posts");
const User = require("../model/User");
const authenticate = require("../middleware/authenticate");
const { check, validationResult } = require("express-validator");

// import image upload services
const upload = require("../services/ImageUpload");

// @route    POST api/posts
// @desc     create a new post
// @access   Private
router.post(
  "/",
  upload.single("image"),
  authenticate,

  // [
  //   [
  //     check("title")
  //       .not()
  //       .isEmpty(),
  //     check("body", "body is required")
  //       .not()
  //       .isEmpty(),
  //     check("category", "category is required")
  //       .not()
  //       .isEmpty()
  //   ]
  // ],
  async (req, res) => {
    //   Check for validity
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get user
      const user = await User.findById(req.user.id).select("-password");

      // Create Post
      const newPost = new Post({
        user: user,
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        image: req.file.location
      });
      const createdPost = await newPost.save();
      // created activity
      const activity = {
        msg: "you created this post",
        post: [createdPost.id, createdPost.title]
      };
      //add to activity log
      user.activities.unshift(activity);
      // save the changes
      await user.save();
      res.status(200).json(createdPost);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
);
/*
// @route    GET api/post/user
// @desc     get logged in user posts
// @access   Private
router.get("/user", authenticate, async (req, res) => {
  // Get User from db
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ date: 1 })
      .populate("user");

    if (posts.length == 0) {
      res.json({ msg: "you have no post" });
    } else {
      res.status(200).json({

        posts
      });
    }
  } catch (error) {
    console.error(error);
  }
});
*/

// @route    GET api/posts
// @desc     get all posts
// @access   Private
router.get("/", authenticate, async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ date: 1 })
      .populate("user");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
});

// @route    GET api/posts/user
// @desc     get current user posts
// @access   Private
router.get("/user", authenticate, async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ date: 1 })
      .populate("user");
    // filter list
    const filter = posts.filter(post => post.user.id === req.user.id);
    if (filter.length == 0) {
      res.json({ msg: "you have no post" });
    }
    res.status(200).json(filter);
  } catch (error) {
    console.error(error);
  }
});

// @route    DELETE api/posts/remove/:id
// @desc     delete my post
// @access   Private
router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    // get post
    const post = await Post.findById(req.params.id);
    // get user
    const user = await User.findById(req.user.id);
    // check for post existence
    if (!post) {
      res.status(404).json({ msg: "Not Post Found" });
    }
    // check the current user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    // remove post
    const removedPost = await post.remove();

    // add to activities
    const activity = {
      msg: "you deleted your post",
      post: [removedPost.id, removedPost.title]
    };
    // add to user records
    user.activities.unshift(activity);
    // save changes
    await user.save();

    // response
    res.status(202).json({ msg: "Post Removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route    DELETE api/posts/delete/:id
// @desc     delete post
// @access   Private
router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(400).json({ msg: "No Post Found" });
    }
    const del = await post.remove();
    res.status(200).json({
      msg: "this rubbish post has been deleted jare!, Omo dah dah"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route    PUT api/posts/like
// @desc     like a post
// @access   Private
router.put("/like/:id", authenticate, async (req, res) => {
  try {
    // get current post
    const post = await Post.findById(req.params.id);
    // get current user
    const user = await User.findById(req.user.id).select("-password");
    // Has post been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "bro you no fit like two times nah!" });
    }
    // like the post by add to the array
    post.likes.unshift({ user: req.user.id });
    post.likeCount += 1;
    // save the changes
    await post.save();
    // log the activity
    const activity = {
      msg: "you liked this post",
      post: [post.id, post.body]
    };
    // add activity to user
    user.activities.unshift(activity);
    // save changes
    await user.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// @route    PUT api/posts/hate/:id
// @desc     hate a post
// @access   Private
router.put("/hate/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if hated
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res
        .status(400)
        .json({ msg: "come you don hate this post before nah" });
    }

    // Get/Remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    post.likeCount -= 1;

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/:postId
// @desc     write comment to a post
// @access   Protected
router.post(
  "/comment/:postId",
  authenticate,
  [
    [
      check("comment", "write something please")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // check for input and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get current User
      const user = await User.findById(req.user.id).select("-password");
      // Get current Post
      const post = await Post.findById(req.params.postId);

      // Create a comment object
      const createdComment = {
        comment: req.body.comment,
        name: user.name,
        user: req.user.id
      };

      // Add created comment to list of comments
      post.comments.unshift(createdComment);
      // get posts followers
      const followers = post.follow.map(fol => {
        return fol.user;
      });

      // then saved the post with the changes made
      await post.save();

      followers.map(async follower => {
        const user = await User.find({ _id: follower });
        user.map(async use => {
          use.notifications.unshift({
            msg: "some one commented on a post you followed",
            post: [post.id, post.title]
          });
          await use.save();
          console.log(use);
        });
      });
      // activity log
      const activity = {
        msg: "you commented on this post",
        post: [post.id, post.body]
      };
      // add to activity log
      user.activities.unshift(activity);
      // save user
      await user.save();
      // check

      res.status(200).json(post.comments);
    } catch (error) {
      console.error(error.message);
    }
  }
);

// @route    DELETE api/posts/comment/:postId/:commentId
// @desc     Delete my comment
// @access   Private
router.delete("/comment/:postId/:commentId", authenticate, async (req, res) => {
  try {
    // get post
    const post = await Post.findById(req.params.postId);
    // get user
    const user = await User.findById(req.user.id);
    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.commentId
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment Not Found" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get/Remove index
    const removeIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.commentId);

    post.comments.splice(removeIndex, 1);

    await post.save();
    // add to user activity
    const activity = {
      msg: "comment deleted by you"
    };
    // add to user records
    user.activities.unshift(activity);
    // save changes
    await user.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/post/:id
// @desc     get post by id
// @access   Private
router.get("/:id", async (req, res) => {
  try {
    // get post
    const post = await Post.findById(req.params.id).populate("user");
    // response
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
});

// @route    PUT api/posts/follow/:postId
// @desc     Follow A Post
// @access   Protected
router.put("/follow/:id", authenticate, async (req, res) => {
  try {
    // get post
    const post = await Post.findById(req.params.id);
    // get user
    const user = await User.findById(req.user.id);
    // check if user has followed post before
    if (
      post.follow.filter(fol => fol.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "already followed" });
    }

    // add user to post follow
    const followedPost = post.follow.unshift({ user: req.user.id });
    post.followCount += 1;
    // save post changes
    await post.save();
    // add to user activity
    const activity = {
      msg: "you followed this post",
      post: [post.id, post.name]
    };
    // add to user record
    user.activities.unshift(activity);
    // save user changes
    user.save();
    res.status(200).json({
      postFollow: post.follow
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "server error" });
  }
});

// @route    PUT api/posts/unfollow/:id
// @desc     hate a post
// @access   Private
router.put("/unfollow/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check
    if (
      post.follow.filter(fol => fol.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "You have not followed yet" });
    }

    // Get/Remove index
    const removeIndex = post.follow
      .map(fol => fol.user.toString())
      .indexOf(req.user.id);

    post.follow.splice(removeIndex, 1);
    post.followCount -= 1;
    console.log(post);
    await post.save();

    res.json(post.follow);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
