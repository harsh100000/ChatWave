const asyncHandler = require('express-async-handler');
const Message = require('../Models/messageModel');
const User = require('../Models/userModel');
const Chat = require('../Models/chatModel');


const sendMessage = asyncHandler(async (req,res) => {
  try { 
    const { content, chatId} = req.body;
    if(!content || !chatId){
      console.log("Invalid data passed into request")
      return res.status(400).json({message:"Invalid data passed into request"})
    }

    let newMessage = {
      sender: req.user._id,
      content:content,
      chat:chatId
    }

    try {
      let message = await Message.create(newMessage)

      message = await message.populate("sender", "name profilePicture");
      message = await message.populate("chat");
      message = await User.populate(message,{
        path: "chat.users",
        select: "name profilePicture, email"
      })

      await Chat.findByIdAndUpdate(req.body.chatId,{
        latestMessage: message
      })

      res.status(200).json(message)
    } 
    catch (error) {
      res.status(400)
      throw new Error(error.message)
      console.log(error);
    }
  } 
  catch (error) {
    console.log(error);
  }
})

const allMessages = asyncHandler(async (req,res) => {
  try {
    const messages = await Message.find({chat: req.params.chatId})
    .populate("sender", "name profilePicture email")
    .populate("chat")

    res.status(200).json(messages)
  } 
  catch (error) {
    res.status(400);
    throw new Error(error)
  }
})

module.exports = {sendMessage, allMessages}