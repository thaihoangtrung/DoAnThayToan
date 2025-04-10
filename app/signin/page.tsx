"use client"
import { postLogin } from '@/lib/fetchapi/api'
import { useUserStore } from '@/lib/store/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LoginForm } from './components/user-auth-form'
import axios from 'axios'

export default function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        setIsLoading(false)
    }, [])

    const { setUser, setToken } = useUserStore()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
    
        try {
            const response = await postLogin(username, password)
            if (response.data) {
                setToken(response.data)
    
                const responseUser = await axios.get("http://localhost:8080/auth/me", {
                    headers: {
                        Authorization: `Bearer ${response.data}`,
                    },
                })
    
                const userData = responseUser.data?.data
                setUser(userData)
    
                console.log("User data:", userData)
    
                // ✅ Điều hướng theo role
                if (userData?.role?.name === "admin") {
                    router.push("/admin")
                } else {
                    router.push("/")
                }
            } else {
                setError(response.message || "Đăng nhập thất bại")
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error)
            setError("Đã xảy ra lỗi khi đăng nhập")
        }
    }
    

    if (isLoading) {
        return <div>Đang tải...</div>
    }

    return (
        <div className="flex min-h-[70vh] w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    onSubmit={handleSubmit}
                    error={error}
                />
            </div>
        </div>
    )
}
