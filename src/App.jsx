/* eslint-disable react/jsx-key */
import { useState } from 'react'


const App = () => {
  const [entries, setEntries] = useState(JSON.parse(localStorage.getItem("data")) || [])
  const [textboxValue, setTextboxValue] = useState("")

  const createEntry = () => {
      const entryData = {
          state: false,
          title: textboxValue,
          subentries: [],
          content: "",
          fav: false,
          c_time: new Date().toISOString(),
          m_time: null,
          m_time_content: null,
          f_time: null,
      }

      setEntries([...entries, entryData])
      localStorage.setItem("data", JSON.stringify(entries))
  
      setTextboxValue("")
  }

  return (
    <main>
		  <h1>To Do List</h1>
        <div id="entries">
          {entries.map(entry => (
            <p>
              <input type="checkbox" />
              {entry.title}
            </p>
          ))}
        </div>
        <input id="entry_textbox" value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
        <button id="new_entry" onClick={createEntry}>New Entry</button>
	  </main>
  )
}

export default App