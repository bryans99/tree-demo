import React from 'react';
import './App.css';

export function Comment({ item }) {

  return (
    <>
      <h1>Comment</h1>
      <div>{item.text}</div>
    </>
  )
}
