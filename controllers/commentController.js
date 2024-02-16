// import model

const Post = require("../models/postModel");
const Comment = require("../models/commentModels");

// business logic


exports.createComment = async (req, res) => {
    try{
        // fetch data from req body

        const {post, user, body} = req.body;

        // create a comment Objct
        const comment = new Comment({
            post, user , body
        });

        // save the new connect into the database
        const savedComment = await comment.save();

        // find the post by ID , add the new Comment to its comment array

        const udpatedPost = await Post.findByIdAndUpdate(post, {$push: {comment: savedComment._id}}, {new: true} )
                            .populate("comment") // populate the comment array with comment document
                            .exec();

       res.json({
        post: udpatedPost,
       });


    }
    catch(error){
        return res.status(500).json({
            error: "Error While Createing comment",
        });

    }
}