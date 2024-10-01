import React, { useState } from 'react';
import avatar from '../assets/images/react-logo.png';
import '../styles/Comment.scss';

type user = {
  id: number
  name: string
  avatar: string
}

type commentItem = {
  commentId: number
  user: user
  content: string
  time: string
  likes: number
}

const currentUser: user = {
  id: 1324324,
  name: 'React',
  avatar: avatar
}

export const Comment: React.FC = () => {

  const defaultCommentList: commentItem[] = [
    {
      commentId: 123123,
      user: {
        id: 1324324,
        name: 'React',
        avatar: avatar
      },
      content: 'React is a JavaScript library for building user interfaces.',
      time: '2024-02-02 12:00:00',
      likes: 66,
    },
    {
      commentId: 123124,
      user: {
        id: 312312312,
        name: 'Bugger',
        avatar: avatar
      },
      content: 'Bugger is a JavaScript library for building user interfaces.',
      time: '2024-02-02 12:00:00',
      likes: 66,
    }
  ]



  const [commentList, setCommentList] = useState<commentItem[]>(defaultCommentList)


  return (<div>
    <div className="comment">
      <ul className="nav-bar">
        <li className="nav-bar-title">Comments</li>
        <li className="nav-bar-item active">Latest</li>
        <li className="nav-bar-item">Popular</li>
      </ul>

      <div className="replay-wrap">
        <div className="bili-avatar">
          <img src={avatar} alt="avatar img" />
        </div>
        <div className="replay-box-wrap">
          <textarea
            name=""
            id=""
            className="replay-box-textarea"></textarea>
          <button className="replay-box-btn">
            <span className="replay-box-btn-text">Send</span>
          </button>
        </div>
      </div>

      <div className="comment-list">

        {commentList.map((comment) => {
          return (
            <CommentItem
              key={comment.commentId}
              item={comment}
              onDelete={(commentId: number) => {
                setCommentList(commentList.filter((item) => item.commentId !== commentId))
              }}
            />
          )
        })}
      </div>
    </div>
  </div>)
}

const CommentItem: React.FC<{
  item: commentItem
  onDelete: (commentId: number) => void
}> = ({ item, onDelete }) => {
  return (
    <div className="comment-item">
      <div className="comment-item-avatar">
        <img src={item.user.avatar} alt="avatar img" />
      </div>
      <div className="comment-item-content">
        <div className="user-info">
          <span className="user-info-name">{item.user.name}</span>
        </div>
        <div className="reply-text">
          <p>
            {item.content}
          </p>
        </div>
        <div className="reply-info">
          <span className="reply-info-time">{item.time}</span>
          <span className="reply-info-text">Likes: {item.likes}</span>
          {item.user.id === currentUser.id && (
            <span className="reply-info-delete" onClick={() => onDelete(item.commentId)}>Delete</span>
          )}
        </div>
      </div>
    </div>
  )
}

