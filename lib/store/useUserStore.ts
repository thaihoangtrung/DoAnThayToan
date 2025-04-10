import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: number
  email: string
  isAdmin: boolean
  username: string
  createdAt: string
  updatedAt: string
}

interface UserStore {
  user: User | null
  token: string | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
)
