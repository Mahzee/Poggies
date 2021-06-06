import React, { useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

function Post({ displayName, username, verified, text, image, avatar }) {
  const [commentAccess, setCommentAccess] = useState(false);
  const [commentText, setCommentText] = useState(null);
  const sendComment = (text) => {
    // Send API request here
    console.log(text)

    // Close CommentBox
    setTimeout(() => {
      setCommentText(null)
      setCommentAccess(false)
    }, 200);
  }
  return (
    <div className="post">
      <div className="post_avatar">
        <Avatar src={image} />
      </div>
      <div className="post_body">
        <div className="post_header">
          <div className="post_headerText">
            <h3>
              {username}
              <span>
                <VerifiedUserIcon className="post_badge" />
              </span>
            </h3>
          </div>
          <div className="post_headerDescription">
            <p>{text}</p>
          </div>
        </div>
        <div className="post_footer">
          {commentAccess
            ?
            <Close className="close_comment" fontSize="small" onClick={() => setCommentAccess(false)} />
            :
            <ChatBubbleOutlineIcon fontSize="small" onClick={() => setCommentAccess(true)} />
          }
          <RepeatIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
        {commentAccess &&
          <div className="commentBox">
            <textarea type="text" placeholder="comment text ..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="send" onClick={() => sendComment(commentText)}>
              Send
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default Post;
