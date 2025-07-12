import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./Body"
import Login from "./login"
import {Provider} from "react-redux"
import appstore from "./utils/appstore"

function App() {
  return (
 <>    
  <Provider store={appstore}>
   <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
        </Route>
        </Routes>
   </BrowserRouter>
  </Provider>

 </>
  )
}

export default App
