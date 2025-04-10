"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SignUpForm } from './components/user-signup-form'
import axios from 'axios'

export default function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        setIsLoading(false)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp")
            return
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/signup", {
                username,
                password,
                email,
            })
            if (response.data) {
                localStorage.setItem("token", response.data)
                router.push("/signin")
            } else {
                setError("Đăng ký thất bại")
            }
        } catch (error) {
            console.error("Registration error:", error)
            setError("Đã xảy ra lỗi khi đăng ký")
        }
    }

    if (isLoading) {
        return <div>Đang tải...</div>
    }

    return (
        <div className="flex min-h-[70vh] w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignUpForm
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    onSubmit={handleSubmit}
                    error={error}
                />
            </div>
        </div>
    )
}
