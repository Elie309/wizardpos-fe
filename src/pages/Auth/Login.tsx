import { FormEvent, useContext, useState } from "react";
import api from "../../utils/Axios";
import BlurredBackground from "../../components/BlurredBackground";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let formData = new FormData();

            formData.append('email', email);
            formData.append('password', password);
            formData.append('phone_number', email);

            const response = await api.post('auth/login', formData);

            if (response.status === 200) {
                window.location.href = '/orders';

                
            } else {
                setLoading(false);
                setError(response.data.message);
            }


        } catch (error: any) {
            setLoading(false);
            setError(error.response.data.message);
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
                    <img src="logo-filled.svg" alt="LOGO" className=" w-2/4 mx-auto xl:w-1/4" />

                    <div className="flex flex-col justify-center w-full xl:w-3/4 ">
                        <h1 className="primary-title ">Wizard POS</h1>
                        <h2 className="secondary-title">Login</h2>
                    </div>

                </div>

                <form>
                    <div className="label-input-container">
                        <label className="" htmlFor="email">Email or Phone Number</label>
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
                        
                        <button className="submit-button w-1/2" 
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