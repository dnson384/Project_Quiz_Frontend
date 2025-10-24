'use client';
import React from 'react'
import { useForm } from '@/hooks/useForm'


interface LoginFormState {
    email: string;
    password: string;
}

export default function Login() {
    const { formData, handleInputChange } = useForm<LoginFormState>({
        email: "",
        password: ""
    })

    const handleLoginButton = (event: React.FormEvent) => {
        event.preventDefault()
        console.log(formData)
    }

    return (
        <div className="bg-[#FAFAFA] w-fit mx-auto mt-30 px-8 py-10 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.25)] flex flex-col gap-6 ">
            <h1
                className="text-brand-primary-500 leading-normal text-5xl text-center font-bold"
            >
                Đăng nhập
            </h1>

            {/* Form đăng nhập*/}
            <form
                method="post"
                className="w-fit flex flex-col gap-3"
                onSubmit={handleLoginButton}
            >
                {/* Email */}
                <div>
                    <label htmlFor="email" className="font-semibold mb-1 block">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email || ""}
                        required
                        className="w-md px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Nhập email của bạn"
                        onChange={handleInputChange}
                    />
                </div>

                {/* Mật khẩu */}
                <div>
                    <label htmlFor="password" className="font-semibold block mb-1">
                        Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type="password"
                            // type={inputType}
                            name="password"
                            id="password"
                            pattern="[A-Za-z0-9!@#$%^&*_]+"
                            value={formData.password || ""}
                            required
                            className="w-md px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Nhập mật khẩu của bạn"
                            onChange={handleInputChange}
                        />
                        {/* {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                viewBox="0 0 32 32"
                                className="absolute right-3 cursor-pointer select-none"
                                onClick={handleEyeButton}
                            >
                                <path
                                    fill="#000"
                                    d="M15.998 24c-3.31 0-6-2.69-6-6s2.69-6 6-6s6 2.69 6 6s-2.69 6-6 6m0-11c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m13.5 5a.51.51 0 0 1-.49-.39c-.1-.43-2.55-10.61-13.01-10.61S3.088 17.18 2.988 17.61a.503.503 0 0 1-.98-.22C2.038 17.28 4.728 6 15.998 6s13.96 11.27 13.99 11.39c.06.27-.11.54-.38.6c-.04 0-.08.01-.11.01"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                viewBox="0 0 32 32"
                                className="absolute right-3 cursor-pointer select-none"
                                onClick={handleEyeButton}
                            >
                                <path
                                    fill="#000"
                                    d="m20.525 21.94l7.768 7.767a1 1 0 0 0 1.414-1.414l-26-26a1 1 0 1 0-1.414 1.414l5.19 5.19c-3.99 3.15-5.424 7.75-5.444 7.823c-.16.53.14 1.08.67 1.24s1.09-.14 1.25-.67c.073-.254 1.358-4.323 4.926-6.99l3.175 3.175a6 6 0 1 0 8.465 8.465m-1.419-1.42a4 4 0 1 1-5.627-5.627zm-3.553-8.504l2.633 2.634c.464.303.86.7 1.164 1.163l2.634 2.634q.015-.222.016-.447a6 6 0 0 0-6.447-5.984M10.59 7.053L12.135 8.6a12.2 12.2 0 0 1 3.861-.6c9.105 0 11.915 8.903 12.038 9.29c.13.43.53.71.96.71v-.01a.993.993 0 0 0 .96-1.28C29.923 16.61 26.613 6 15.995 6c-2.07 0-3.862.403-5.406 1.053"
                                ></path>
                            </svg>
                        )} */}
                    </div>
                </div>

                {/* Chưa có tài khoản */}
                <p className="text-sm text-center">
                    Bạn chưa có tài khoản?
                    <span
                        className="text-brand-primary-500 italic ml-2 cursor-pointer hover:underline hover:text-brand-primary-600"
                    // onClick={handleRegisterLink}
                    >
                        Đăng ký ngay
                    </span>
                </p>

                {/* Nút đăng nhập bằng Email*/}
                <button
                    type="submit"
                    className="bg-brand-primary-500 text-white text-xl font-semibold uppercase py-3 rounded-md cursor-pointer hover:bg-brand-primary-600"
                >
                    Đăng nhập
                </button>

                {/* Đăng nhập Google */}
                <button className="font-semibold border border-gray-300 rounded-md flex justify-center items-center gap-2 py-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={36}
                        height={36}
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#ffc107"
                            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                        ></path>
                        <path
                            fill="#ff3d00"
                            d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                        ></path>
                        <path
                            fill="#4caf50"
                            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                        ></path>
                        <path
                            fill="#1976d2"
                            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                        ></path>
                    </svg>
                    Đăng nhập với Google
                </button>
            </form>
        </div>
    )
}
