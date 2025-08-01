import React from 'react';

const MessageList = ({ data }) => {
  if (!data.length) return <p>No messages yet.</p>;

  return (
    <ul>
      {data.map(msg => (
        <li key={msg._id}>
          <strong>{msg.name}</strong> ({msg.email})<br />
          <em>{new Date(msg.date).toLocaleString()}</em><br />
          {msg.message}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
