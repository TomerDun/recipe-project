import Comment from '../mongo/models/Comment.js'

export async function addComment(req, res) {    
    console.log('recipeId: ', req.params.recipeId);
    
    const commentObj = {...req.body, userId: req.user.id, recipeId: req.params.recipeId, username: req.user.username};
    console.log('----obj: ', commentObj);
    
    const newComment = new Comment(commentObj);
    console.log('---------comment: ', newComment);
    

    console.log(newComment);
    

    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        err.status = 500;
        throw err;
    }
}
