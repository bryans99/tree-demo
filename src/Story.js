import React from 'react';
import './App.css';

export function Story({ item }) {

  return (
    <>
      <h1>Story</h1>
      <a href={item.url}><div>{item.title}</div></a>
    </>
  )

}
