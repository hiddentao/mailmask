import React, { useState } from 'react'

export const GlobalContext = React.createContext({})

export const GlobalProvider = ({ children }) => {
  const [ themeName, setThemeName ] = useState('light')

  return (
    <GlobalContext.Provider value={{ themeName, setThemeName }}>
    {children}
    </GlobalContext.Provider>
  )
}

export const GlobalConsumer = GlobalContext.Consumer

