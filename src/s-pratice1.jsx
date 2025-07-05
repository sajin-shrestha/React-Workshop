import React, { useState } from 'react';

// A simple component that says "Welcome"
const Welcome = () => {
  return (
    <h1 style={{ display: 'flex', justifyContent: 'center' }}>
      Welcome.
    </h1>
  );
};

// A simple component that says "Not Welcome"
const NotWelcome = () => {
  return (
    <h1 style={{ display: 'flex', justifyContent: 'center' }}>
      Not Welcome
    </h1>
  );
};

// Main App component
const Pratice = () => {
  // State to control whether we show Welcome or NotWelcome
  const [status, setStatus] = useState(true);

  // State to store what the user types
  const [inputContent, setInputContent] = useState('');

  // This runs whenever the user types in the input
  const handleOnChange = (e) => {
    setInputContent(e.target.value); // save what user types
  };

  return (
    <>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        App component
      </h1>

      {/* Conditional rendering based on status */}
      {status ? <Welcome /> : <NotWelcome />}

      {/* Input box to type text */}
      <input
        style={{ marginLeft: 400 }}
        type="text"
        placeholder="Type something to change status"
        onChange={handleOnChange}
      />

      {/* Button to toggle status */}
      <button
        onClick={() => setStatus(!status)} // toggles between true and false
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '20px auto',
          padding: '10px 20px',
          fontSize: '16px',
        }}
      >
        Change Status
      </button>

      {/* Show what the user typed */}
      <p style={{ textAlign: 'center' }}>You typed: {inputContent}</p>
    </>
  );
};

export default Pratice
