import { useState } from 'react'
import './App.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import {Cards} from './routes/Cards'
import {AddCards} from './routes/AddCards'
import {Root} from './routes/Root'
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<Root/>}>
      <Route path="/cards" element={<Cards/>}/>
      <Route path="/add-cards" element={<AddCards/>}/>
      </Route>
    </Route>
    
    ))

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>

    </>
  )
}

export default App
