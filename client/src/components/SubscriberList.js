import React from 'react';

const SubscriberList = ({ data }) => {
  if (!data.length) return <p>No subscribers yet.</p>;

  return (
    <ul>
      {data.map(sub => (
        <li key={sub._id}>
          {sub.email} — <em>{new Date(sub.date).toLocaleDateString()}</em>
        </li>
      ))}
    </ul>
  );
};

export default SubscriberList;
