import { FormEvent, useState } from "react";
import api from "../../utils/Axios";
import BlurredBackground from "../../components/Utils/BlurredBackground";
import { useDispatch } from "react-redux";
import { setUser, UserState } from "../../utils/Slices/userSlice";
import LogoFilled from "../../components/Icons/LogoFilled";
import { AxiosError } from "axios";


export default function LoginPage() {

    const dispatch = useDispatch();
  
    const handleLogin = (data: UserState) => {
        dispatch(setUser(data));
        data.token && sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data));
    }

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if(email === '' || password === ''){
            setError('Please fill all fields');
            setLoading(false);
            return;
        }

        try {
            let formData = new FormData();

            formData.append('employee_email', email);
            formData.append('employee_password', password);

            const response = await api.post('auth/login', formData);

            if (response.status === 200) {

                let user: UserState = {
                    name: response.data.user.name,
                    email: response.data.user.email,
                    role: response.data.user.role,
                    token: response.data.token,
                    isAuthenticated: true
                }

                handleLogin(user);
                setLoading(false);

                window.history.replaceState({}, '', '/');
                
            } else {
                setLoading(false);
                setError(response.data.message || 'An error occurred');
            }


        } catch (error: any) {

            if(error instanceof AxiosError){
                if(error.response?.status === 401){
                    setError(error.response.data.message);
                }else{
                    setError('An error occurred');
                }
            }else{
                setError(error.message || 'An error occurred');
            }

            setLoading(false);

        }
    }




    return (
        //Put image background
        <BlurredBackground imageUrl="pos-background.webp" >


            <div className="flex flex-col shadow-md 
            border-gray-200
            rounded-md md:w-2/4 max-w-2xl overflow-auto
            bg-white p-4">

                <div className="flex flex-col xl:flex-row justify-center">
                    <LogoFilled className="fill-dark w-3/4 mx-auto" />

                    <div className="flex flex-col justify-center w-full xl:w-3/4 ">
                        <h1 className="primary-title ">Wizard POS</h1>
                        <h2 className="secondary-title">Login</h2>
                    </div>

                </div>

                <form>
                    <div className="label-input-container">
                        <label className="" htmlFor="email">Email</label>
                        <input className="" type="email" id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="label-input-container">
                        <label className="" htmlFor="password">Password</label>
                        <input className="" type="password" id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="w-full text-center">
                        
                        <button className={`submit-button w-1/2 mt-4 ${loading ? "cursor-wait": ""} `}
                        disabled={loading}  
                        onClick={handleSubmit}>{loading ? "Loading..." : "Login"}</button>

                        <p className="text-sm text-gray-400 italic my-2">Please contact your administrator to recover your account</p>
                    </div>
                </form>

                <div className="w-full text-center">
                    <p className="text-red-500 text-sm">{error}</p>
                </div>
            </div>

        </BlurredBackground>

    )
}