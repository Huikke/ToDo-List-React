/* eslint-disable react/jsx-key */
import { useState } from 'react'


const App = () => {
  const [entries, setEntries] = useState(JSON.parse(localStorage.getItem("data")) || [])
  const [textboxValue, setTextboxValue] = useState("")

  const createEntry = () => {
      const entryData = {
          id: crypto.randomUUID(),
          state: false,
          title: textboxValue,
          subentries: [],
          content: "",
          favourite: false,
          creation_time: new Date().toISOString(),
          modification_time: null,
          modification_time_content: null,
          completion_time: null,
      }

      setEntries([...entries, entryData])
      localStorage.setItem("data", JSON.stringify(entries))
  
      setTextboxValue("")
  }

  const updateState = (entryId, newState) => {
    const newEntries = [...entries]
    const entryIndex = newEntries.findIndex((entry) => {
      return entry.id == entryId
    })

    newEntries[entryIndex].state = newState
    if (newState == true) {
      newEntries[entryIndex].completion_time = new Date().toISOString()
    } else {
      newEntries[entryIndex].completion_time = null
    }
    console.log(entryId, newState, newEntries)

    setEntries(newEntries)
    localStorage.setItem("data", JSON.stringify(newEntries))
  }

  return (
    <main>
		  <h1>To Do List</h1>
        <div id="entries">
          {entries.map(entry => (
            <p>
              <input id={entry.id} type="checkbox"onChange={() => updateState(entry.id, !entry.state)} checked={entry.state}/>
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