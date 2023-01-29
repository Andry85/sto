const router = require("express").Router();
const Post = require("../models/Post");
const fs = require('fs');
const { json } = require('express');



//Create new post
router.post("/", async (req, res) => {

    const newPost = new Post(req.body);

    try {

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch(err) {
        res.status(500).json(err);
    }

   
    
});

//Update new post
router.put("/:id", async (req, res) => {

  try {
      const post = await Post.findById(req.params.id);

     

        if (post.username === req.body.username) {

            try {

                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, 
                {new: true}
                );
                res.status(200).json(updatedPost);
            } catch(err) {
        
            }
            
        } else {
            res.status(401).json('You can update only your post');
        }

     

  } catch(err) {
    res.status(500).json(err);
  }
    
});

//Delete post
router.delete("/:id", async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);


        const postImagesArr = post.files;

        for (const item of postImagesArr) {
            let path = `./images/${item}`;
    
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
        }
  
       
  
          if (post.username === req.body.username) {
  
              try {

                await post.delete();

                res.status(200).json('Post has been deleted');
  
               
              } catch(err) {
          
              }
              
          } else {
              res.status(401).json('You can delete only your post');
          }
  
       
  
    } catch(err) {
      res.status(500).json(err);
    }
      
  });


// Get post
router.get('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);


        res.status(200).json(post);

    } catch(err) {
        res.status(500).json(err);
    }
});

// Get all post
router.get('/', async(req, res) => {

    console.log(req.query.id)

    const username = req.query.user;
    const catName = req.query.cat;

    console.log(username, 'username');
    console.log(catName, 'catName');
    console.log(req.query, 'req.query');


    try {
       

        let posts;

        if (username) {
            posts = await Post.find({username});
        } else if (catName) {
            posts = await Post.find({categories: {
                $in: [catName]
            }});
        } else {
            posts = await Post.find();

        }

        res.status(200).json(posts);

    } catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;

