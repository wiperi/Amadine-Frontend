import React from 'react';
import avatar from '../assets/images/react-logo.png';
import '../styles/Comment.scss';

export const Comment: React.FC = () => {


  const commentList = [
    {
      commentId: 123123,
      user: {
        userId: 1324324,
        name: 'React',
        avatar: avatar
      },
      content: 'React is a JavaScript library for building user interfaces.',
      time: '2024-02-02 12:00:00',
      likes: 66,
    }
  ]

  const currentUser = {
    userId: 1324324,
    name: 'React',
    avatar: avatar
  }


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
          <textarea name="" id="" className="replay-box-textarea"></textarea>
          <button className="replay-box-btn">
            <span className="replay-box-btn-text">Send</span>
          </button>
        </div>
      </div>

      <div className="comment-list">
        <div className="comment-item">
          <div className="comment-item-avatar">
            <img src={avatar} alt="avatar img" />
          </div>
          <div className="comment-item-content">
            <div className="user-info">
              <span className="user-info-name">React</span>
            </div>
            <div className="reply-text">
              <p>
                React is a JavaScript library for building user interfaces.
              </p>
            </div>
            <div className="reply-info">
              <span className="reply-info-time">2024-02-02 12:00:00</span>
              <span className="reply-info-text">Likes: 66</span>
              <span className="reply-info-delete">Delete</span>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>)
}
