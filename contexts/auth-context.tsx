"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

interface User {
  id: number
  username: string
  email: string
  name: {
    firstname: string
    lastname: string
  }
  phone: string
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "SET_USER"; payload: { user: User; token: string } }
  | { type: "UPDATE_USER"; payload: User }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
        token: action.payload.token,
      }
    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: null,
        token: null,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

// Map username to user ID for demo purposes (since Fake Store API doesn't return user ID on login)
const usernameToIdMap: Record<string, number> = {
  mor_2314: 1,
  kevinryan: 2,
  donero: 3,
  derek: 4,
  david_r: 5,
  john: 6,
  william: 7,
  kate_h: 8,
  jimmie_k: 9,
  snyder: 10,
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("unicloth_token")
    const userData = localStorage.getItem("unicloth_user")

    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch({ type: "SET_USER", payload: { user, token } })
      } catch (error) {
        localStorage.removeItem("unicloth_token")
        localStorage.removeItem("unicloth_user")
      }
    }
  }, [])

  const fetchUserData = async (userId: number): Promise<User> => {
    const response = await fetch(`/api/users/${userId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch user data")
    }
    return await response.json()
  }

  const login = async (username: string, password: string) => {
    dispatch({ type: "LOGIN_START" })

    try {
      // Authenticate with our internal API
      const authResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      if (!authResponse.ok) {
        throw new Error("Invalid credentials")
      }

      const { token } = await authResponse.json()

      // Get user ID from username mapping
      const userId = usernameToIdMap[username]
      if (!userId) {
        throw new Error("User not found")
      }

      // Fetch real user data from API
      const userData = await fetchUserData(userId)

      // Store in localStorage
      localStorage.setItem("unicloth_token", token)
      localStorage.setItem("unicloth_user", JSON.stringify(userData))

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: userData, token },
      })
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: error instanceof Error ? error.message : "Login failed",
      })
    }
  }

  const refreshUser = async () => {
    if (!state.user?.id || !state.token) return

    try {
      const userData = await fetchUserData(state.user.id)
      localStorage.setItem("unicloth_user", JSON.stringify(userData))
      dispatch({ type: "UPDATE_USER", payload: userData })
    } catch (error) {
      console.error("Failed to refresh user data:", error)
    }
  }

  const logout = () => {
    localStorage.removeItem("unicloth_token")
    localStorage.removeItem("unicloth_user")
    dispatch({ type: "LOGOUT" })
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
