import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from "react";

export default function Home() {
  const [list, setList] = useState([]);
  const [todo, newToDo] = useState('')

  useEffect(() => {
    if (window.localStorage.hasOwnProperty('todo')) {
      setList(JSON.parse(window.localStorage.getItem('todo')))
    } else {
      window.localStorage.setItem('todo', JSON.stringify([]))
    }
  }, [])

  const addItem = (c) => {
    c.preventDefault();
    document.getElementById('newToDo').value = "";
    setList(oldArray => [...oldArray, todo])
  }

  const removeItem = (e) => {
    let name = e.target.getAttribute("name");
    setList((oldArray) => oldArray.filter((item, index) => {
      return index != name;
    }))
  }

  useEffect(() => {
    window.localStorage.setItem('todo', JSON.stringify(list))
  }, [list])

  return (
    <div>
      <h1>To do list</h1>
      <ul>
        {list.map((item, index) => <li key={index}>{item} <input name={index} type="button" onClick={removeItem} value="x" /></li>
        )}
      </ul>
      <form onSubmit={addItem}>
        <input type="text" id="newToDo" name="newToDo" placeholder="Add New Item" onChange={({ target }) => newToDo(target.value)} />
        <input type="submit" id="addToDo" value="New Item" />
      </form>
    </div >
  )
}
