import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem('admin')
		return savedUser ? JSON.parse(savedUser) : null
	})

	const login = userData => {
		setUser(userData)
		localStorage.setItem('admin', JSON.stringify(userData))
	}

	const logout = () => {
		setUser(null)
		localStorage.removeItem('admin')
		window.location.href = '/admin'
	}

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
