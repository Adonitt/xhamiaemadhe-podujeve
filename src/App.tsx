import { BrowserRouter, Navigate, useLocation } from 'react-router-dom'
import { resolveRoute } from './content'
import { SiteApp } from './app/SiteApp'

export default function App() {
  return <BrowserRouter><RoutesWrapper /></BrowserRouter>
}

export function RoutesWrapper() {
  const location = useLocation()
  const route = resolveRoute(location.pathname, location.search)
  if (route.redirect) return <Navigate to={route.redirect} replace />
  return <SiteApp locale={route.locale} page={route.page} />
}
