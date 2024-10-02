import React, { useEffect, useRef, useState } from 'react';
import avatar from '../assets/images/react-logo.png';
import '../styles/Comment.scss';
import _ from 'lodash';

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
  useEffect(() => {
    (async function fetchCommentList() {
      fetch('http://localhost:4000/comments')
        .then(res => res.json())
        .then(data => setCommentList(data))      
    })()
  }, [])


  // Send comment
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [commentText, setCommentText] = useState<string>('')

  const handleSend = () => {
    console.log('send !')
    if (commentText.trim() === '') return

    const newComment: commentItem = {
      commentId: Math.random() * 1000000,
      user: currentUser,
      content: commentText,
      time: new Date().toLocaleString(),
      likes: 0
    }

    setCommentList([...commentList, newComment]); // Rerender the comment list
    textAreaRef.current!.value = '' // Clear the comment text
  }

  // Sort comment list
  const popularRef = useRef<HTMLLIElement>(null)
  const latestRef = useRef<HTMLLIElement>(null)

  const commentSortLatest = () => {
    const sortCommentList = _.orderBy(commentList, 'time', 'desc')
    setCommentList(sortCommentList)
    popularRef.current!.classList.remove('active')
    latestRef.current!.classList.add('active')
  }
  const commentSortLikes = () => {
    const sortCommentList = _.orderBy(commentList, 'likes', 'desc')
    setCommentList(sortCommentList)
    popularRef.current!.classList.add('active')
    latestRef.current!.classList.remove('active')
  }

  return (<div>
    <div className="comment">
      <ul className="nav-bar">
        <li className="nav-bar-title">Comments</li>
        <li className="nav-bar-item active" ref={latestRef} onClick={commentSortLatest}>Latest</li>
        <li className="nav-bar-item" ref={popularRef} onClick={commentSortLikes}>Popular</li>
      </ul>

      <div className="replay-wrap">
        <div className="bili-avatar">
          <img src={avatar} alt="avatar img" />
        </div>
        <div className="replay-box-wrap">
          <textarea
            ref={textAreaRef}
            className="replay-box-textarea"
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button className="replay-box-btn" onClick={handleSend}>
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

