import { useState } from 'react'
import style from './App.module.css'
import Title from './components/Title.tsx'
import Filter from './components/filter/Filter.tsx'
import Table from './components/table/Table.tsx'

function App() {
    const [url, setUrl] = useState<string | null>(null);
    
    return (
      <>
          <Title/>
          
          <div className = {style.mainLayout}>
              <div className = {style.filterLayout}>
                  <Filter setUrl = {setUrl}/>
              </div>
              <div className = {style.tableLayout}>
                  <Table url={url}/>
              </div>
          </div>
      </>
   )
}

export default App
