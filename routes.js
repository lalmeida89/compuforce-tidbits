/*
Node.js

This is a snippet from my Band Together app. The app allowed users to look through
profiles and click like or dislike if they liked what they say, kind of like Tinder
for musicians looking to play together. This endpoint checks if the user we click 'like'
on has also liked us. When that happens, a chat room is created for the two users using
socket.io. We also save the 'like' or 'dislike' so that we know that this profile
has already been voted on so that it doesn't show again for the same user.
*/
app.post('/dashboard', isLoggedIn, function(req, res) {
  //check for likes from another user
  User.findOne({_id:req.body.id}).exec().then(them => {
    if (them.likes.indexOf(req.user._id) != -1 && req.body.value == 'likes'){
      //match found
      let chat = new Chat();
      let a = { userId : req.user._id, userName : req.user.name};
      let b = { userId : them._id, userName : them.name}
      chat.users.push(a);
      chat.users.push(b);
      chat.save(function(err,room) {

        //once we find a match, create match id
        them.matches.push({userId:req.user._id, chatId: room._id, userName: req.user.name});
        req.user.matches.push({userId: req.body.id, chatId: room._id, userName: req.body.name});
        them.save();

        //saves likes and dislikes to logged in user
        req.user[req.body.value].push(req.body.id);
        req.user.save();
        res.json({match:req.body});
      });
    } else {
      //saves likes and dislikes to logged in user
      req.user[req.body.value].push(req.body.id);
      req.user.save();
      res.json({match: null});
    };
  });
});
