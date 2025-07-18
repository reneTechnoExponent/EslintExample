import React from 'react';
import { useState } from 'react';

// multiple violations to test airbnb rules
const BadCodeExample = () => {
  const [count, setCount] = useState(0);
  var oldStyleVar = 'bad practice';
  let user_name = 'underscore_not_allowed';
  const obj = { x: 1, y: 2 };

  const handleClick = function () {
    const newCount = count + 1;
    setCount(newCount);
  };

  const userObj: any = new Object();
  userObj.name = 'test';

  if (count > 5) return <div>Too many clicks</div>;

  return (
    <div>
      <h1 style={{ color: 'red' }}>Bad Code Example</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click me</button>
      <img src='test.jpg' />
      <a href='javascript:void(0)'>Bad link</a>
      <div onClick={() => console.log('clicked')}>
        Clickable div without keyboard support
      </div>
      <input type='text' placeholder='Enter text' />
    </div>
  );
};

export default BadCodeExample;
