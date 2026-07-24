import { useState } from 'react'
import style from './App.module.css'
import Title from './components/Title.tsx'
import Filter from './components/filter/Filter.tsx'
import Table from './components/table/Table.tsx'

function App() {

  return (
      <>
          <Title/>
          
          <div className = {style.mainLayout}>
              <div className = {style.filterLayout}>
                  <Filter/>
              </div>
              <div className = {style.tableLayout}>
                  <Table/>
              </div>
          </div>
      </>
  )
}

export default App
