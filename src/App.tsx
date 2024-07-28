import './App.css'
import { AppProvider } from './contexts/app.context'
import useRouteElements from './hooks/useRouteElements'

function AppIner() {
  const routes = useRouteElements()

  return (
    <div
      style={{
        minHeight: 'inherit'
      }}
    >
      {routes}
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppIner />
    </AppProvider>
  )
}

export default App
