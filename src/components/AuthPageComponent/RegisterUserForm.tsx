import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUserSchema } from "../../schemas/auth.schema";
import type { RegisterUserFormData } from "../../schemas/auth.schema";
import { toast } from 'react-toastify';
import Spinner from "../General/Spinner";
import { registerUser } from "../../api/auth.api";
import { setUser } from "../../store/slice/authSLice";


const RegisterUserForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterUserFormData>({
        resolver: zodResolver(registerUserSchema),
    })

    const onSubmit = async(data: RegisterUserFormData) => {
        console.log(data);
        try {
            setLoading(true);
            setServerError(null)

            const response = await registerUser(data);
            console.log("Registered: ", response);
            dispatch(setUser(response.data.user));
            toast.success("Account Created Successfully");
            reset();
            navigate('/');
        } catch (error: any) {
            setServerError(error.message);
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='border flex flex-col gap-3 text-sm md:pb-4'>
            {/* username */}
            <div className="flex flex-col gap-2">
                <label className="text-[#9929EA]">Username</label>
                <input
                    type="text"
                    {...register("username")}
                    placeholder="enter your name"
                    className="text-white p-2 border rounded-xl bg-transparent"
                />
                {errors.username && (
                    <p className="text-red-400 text-xs h-4">{errors.username.message}</p>
                )}
            </div>
            {/* Email */}
            <div className="flex flex-col gap-2">
                <label className="text-[#9929EA]">Email</label>
                <input
                    type="email"
                    {...register("email")}
                    placeholder="enter your email"
                    className="text-white p-2 border rounded-xl bg-transparent" />
                {errors.email && (
                    <p className="text-red-400 text-xs h-4">{errors.email.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[#9929EA]">Password</label>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="create your password"
                    className="text-white p-2 border rounded-xl bg-transparent" />
                {errors.password && (
                    <p className="text-red-400 text-xs h-4">{errors.password.message}</p>
                )}
            </div>
            {/* profile Image */}
            <div className="flex flex-col gap-2">
                <label className="text-[#9929EA]">Profile Picture</label>
                <input
                    type="file"
                    {...register("profileImage")}
                    accept="image/*"
                    className="text-white p-2 border rounded-xl hover:bg-[#131313] cursor-pointer" />
                {errors.profileImage && (
                    <p className="text-red-400 text-xs h-4">
                        {errors.profileImage.message}
                    </p>
                )}
            </div>
            <Link to='/login' className="text-[#9929EA]">
                Already have an Account?
            </Link>

            <button
                type="submit"
                disabled={loading}
                className="bg-[#9929EA] md:py-2 rounded-xl font-bold hover:bg-[#7b14c4] cursor-pointer ease-in-out duration-200"
            >
                {loading ? <Spinner /> : "Register"}
            </button>
        </form>
    )
}

export default RegisterUserForm
