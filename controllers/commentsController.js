import Comment from '../mongo/models/Comment.js'

export async function addComment(req, res) {
    console.log('recipeId: ', req.params.recipeId);

    const commentObj = { ...req.body, userId: req.user.id, recipeId: req.params.recipeId, username: req.user.username };
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


// TODO: Add validation
export async function editComment(req, res) {
    console.log('CommentId: ', req.params.commentId);

    const commentUserId = await Comment.findById(req.params.commentId, 'userId');

    if (commentUserId.userId != req.user.id) {
        const err = new Error('Cannnot access this resource');
        err.status = 401;
        throw err;
    }

    const newComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
    res.status(201).json(newComment);
}

export async function likeComment(req, res) {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
        const err = new Error('Invalid comment ID');
        err.status = 404;
        throw err;
    }

    // Remove Like
    if (comment.likes.includes(req.user.id)) {
        comment.likes = comment.likes.filter(like => like !== req.user.id);
    }
    else {
        comment.likes.push(req.user.id);
    }

    await comment.save();

    res.status(201).send('likes: ' + comment.likes.length);
}
