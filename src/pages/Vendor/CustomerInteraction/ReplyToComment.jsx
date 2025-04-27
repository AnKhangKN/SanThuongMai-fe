import React, { useState } from 'react';
import { List, Avatar, Button, Input, Card, Select, Tag } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const ReplyToComment = () => {
  const [reply, setReply] = useState({});
  const [filter, setFilter] = useState('all');

  const comments = [
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      product: 'Giày đá bóng Nike',
      content: 'Sản phẩm chất lượng không?',
      replied: false,
      time: '2025-04-21 14:30',
    },
    {
      id: 2,
      customer: 'Trần Thị B',
      product: 'Vợt cầu lông Yonex',
      content: 'Giao hàng có nhanh không?',
      replied: true,
      time: '2025-04-20 10:15',
      replyContent: 'Dạ shop giao nhanh trong 2-3 ngày ạ!',
    },
  ];

  const handleReply = (id) => {
    console.log('Đã gửi phản hồi:', reply[id]);
    // Gửi phản hồi đến server ở đây
  };

  const filteredComments = comments.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'replied') return c.replied;
    if (filter === 'unreplied') return !c.replied;
  });
  return (
    <div style={{ padding: 24 }}>
      <Card title="Bình luận từ khách hàng" extra={
        <Select value={filter} onChange={setFilter} style={{ width: 200 }}>
          <Option value="all">Tất cả</Option>
          <Option value="replied">Đã trả lời</Option>
          <Option value="unreplied">Chưa trả lời</Option>
        </Select>
      }>
        <List
          itemLayout="vertical"
          dataSource={filteredComments}
          renderItem={(item) => (
            <Card style={{ marginBottom: 16 }}>
              <List.Item
                key={item.id}
                extra={<Tag color={item.replied ? 'green' : 'orange'}>{item.replied ? 'Đã trả lời' : 'Chưa trả lời'}</Tag>}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.customer[0]}</Avatar>}
                  title={<b>{item.customer}</b>}
                  description={`Sản phẩm: ${item.product} | ${item.time}`}
                />
                <p><strong>Bình luận:</strong> {item.content}</p>

                {item.replied ? (
                  <div style={{ marginTop: 12, background: '#f6ffed', padding: 12, borderRadius: 6 }}>
                    <p><strong>Phản hồi:</strong> {item.replyContent}</p>
                  </div>
                ) : (
                  <>
                    <TextArea
                      rows={2}
                      placeholder="Nhập phản hồi..."
                      value={reply[item.id] || ''}
                      onChange={(e) => setReply({ ...reply, [item.id]: e.target.value })}
                    />
                    <Button type="primary" onClick={() => handleReply(item.id)} style={{ marginTop: 8 }}>
                      Gửi phản hồi
                    </Button>
                  </>
                )}
              </List.Item>
            </Card>
          )}
        />
      </Card>
    </div>
  )
}

export default ReplyToComment