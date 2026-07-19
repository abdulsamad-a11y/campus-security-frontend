import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import privateAxiosInstance from '../auths/privateAxiosInstance'

const UserContext = createContext(null)

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [reports, setReports] = useState([])
  const [isReportsLoading, setIsReportsLoading] = useState(true)

  const fetchUser = async () => {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      setUser(null)
      setIsLoading(false)
      return null
    }

    try {
      const response = await privateAxiosInstance.get('/users/me')

      const currentUser = response.data.data;

      setUser(currentUser)

      return currentUser
    } catch (error) {
      console.error('Failed to fetch user data:', error)

      localStorage.removeItem('accessToken')
      setUser(null)
      setReports([])

      return null
    } finally {
      setIsLoading(false)
    }
  }

  const fetchReports = async () => {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      setReports([])
      setIsReportsLoading(false)
      return []
    }

    try {
      const response = await privateAxiosInstance.get('/reports')

      const userReports = response.data.reports
      console.log(userReports)

      setReports(userReports)

      return userReports
    } catch (error) {
      console.error('Failed to fetch reports:', error)

      setReports([])

      return []
    } finally {
      setIsReportsLoading(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchUser()
      await fetchReports()
    }

    loadData()
  }, [])

  const logout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    setReports([])
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        fetchUser,
        logout,

        reports,
        setReports,
        isReportsLoading,
        fetchReports,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}

export { UserContext }