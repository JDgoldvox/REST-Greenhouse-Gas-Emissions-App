import { useState } from 'react'
import style from './App.module.css'
import Title from './components/Title.tsx'
import Filter from './components/filter/Filter.tsx'

function App() {

  return (
      <>
          <Title/>
          
          <div className = {style.mainLayout}>
              <div className = {style.filterLayout}>
                  <p> hi </p>
                  <Filter/>
              </div>
              <div className = {style.tableLayout}>
                  <p> hi </p>
              </div>
          </div>
      </>
  )
}

export default App
