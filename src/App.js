import { useEffect, useState } from 'react'
import { GlobalStyle } from './styles/GlobalStyle'
import { Navbar } from './components/Navbar'

export function App() {
  const [responses, setResponses] = useState([])

  useEffect(() => {
    window.Main.on('mdns-response', response => {
      setResponses([...responses, response])
      console.log(response)
    })
    window.Main.searchDevices()
  }, [])

  return (
    <>
      <GlobalStyle />
      <Navbar responses={responses} />
    </>
  )
}
