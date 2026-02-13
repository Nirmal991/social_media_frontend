import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loginUserSchema, type LoginUserFormData } from "../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "../General/Spinner";
import { toast } from 'react-toastify';
import { loginUser } from "../../api/auth.api";
import { setUser } from "../../store/slice/authSLice";

function LoginUserForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginUserFormData>({
        resolver: zodResolver(loginUserSchema),
    });

    const onSubmit = async(data: LoginUserFormData) => {
        try {
            setLoading(true);
            setServerError(null);

            const response = await loginUser(data);
            dispatch(setUser(response.data.user));
            toast.success("User Logged in Successfully");
            reset();
            navigate('/')
        } catch (error: any) {
            setServerError(error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border flex flex-col gap-3 text-sm"
        >
            <div className="flex flex-col gap-2">
                <label className="text-[#9929EA]">Username or Email</label>
                <input
                    type="text"
                    {...register("identifier")}
                    placeholder="enter your username or email"
                    className="text-white p-2 border rounded-xl"
                />
                {errors.identifier && (
                    <p className="text-red-400 text-xs h-4">
                        {errors.identifier.message}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[#9929EA]">Password</label>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="enter your password"
                    className="text-white p-2 border rounded-xl"
                />
                {errors.password && (
                    <p className="text-red-400 text-xs h-4">{errors.password.message}</p>
                )}
            </div>
            <Link to='/register' className="text-[#9929EA]"> Don't have an account?</Link>
            <button
                type="submit"
                disabled={loading}
                className="bg-[#9929EA] md:py-2 rounded-xl font-bold hover:bg-[#7b14c4] cursor-pointer ease-in-out duration-200"
            >
                {loading ? <Spinner /> : "Login"}
            </button>
        </form>
    )
}

export default LoginUserForm
