import React, { useState } from 'react';
import { Input, Button, List, Card, Avatar } from 'antd';

const { TextArea } = Input;

const CommentResponse = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Nguyễn Văn A',
      avatar: 'https://joeschmoe.io/api/v1/random',
      content: 'Sản phẩm này rất tuyệt vời! Cảm ơn bạn.',
      date: '2025-04-10 10:00',
      replies: [
        { author: 'Vendor', content: 'Cảm ơn bạn đã ủng hộ sản phẩm của chúng tôi.' },
      ],
    },
    {
      id: 2,
      author: 'Trần Thị B',
      avatar: 'https://joeschmoe.io/api/v1/random',
      content: 'Giao hàng rất chậm, hy vọng sẽ cải thiện.',
      date: '2025-04-09 15:30',
      replies: [],
    },
  ]);

  const [replyContent, setReplyContent] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = (commentId) => {
    if (!replyContent) return;

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            { author: 'Vendor', content: replyContent },
          ],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyContent('');
    setSelectedCommentId(null);  // Reset after submitting
  };

  return (
    <div style={{ padding: '20px' }}>
      <List
        dataSource={comments}
        renderItem={(comment) => (
          <Card style={{ marginBottom: 16 }} key={comment.id}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <Avatar src={comment.avatar} />
              <div style={{ marginLeft: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>{comment.author}</div>
                <div>{comment.date}</div>
              </div>
            </div>
            <div style={{ marginBottom: '10px' }}>{comment.content}</div>

            {comment.replies.map((reply, index) => (
              <Card key={index} style={{ marginLeft: '40px', marginTop: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>{reply.author}</div>
                <div>{reply.content}</div>
              </Card>
            ))}

            {selectedCommentId === comment.id ? (
              <div>
                <TextArea
                  value={replyContent}
                  onChange={handleReplyChange}
                  rows={4}
                  placeholder="Nhập phản hồi của bạn..."
                />
                <Button
                  type="primary"
                  onClick={() => handleReplySubmit(comment.id)}
                  style={{ marginTop: '10px' }}
                >
                  Gửi Phản Hồi
                </Button>
              </div>
            ) : (
              <Button
                type="link"
                onClick={() => setSelectedCommentId(comment.id)}
                style={{ marginTop: '10px' }}
              >
                Trả lời
              </Button>
            )}
          </Card>
        )}
      />
    </div>
  );
};

export default CommentResponse;
