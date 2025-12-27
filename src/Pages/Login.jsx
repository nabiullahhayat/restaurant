import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    const navigat = useNavigate();

    const handleLogin = () => {
        const saveData = 
        JSON.parse(localStorage.getItem('adminAuth'));

        if(!saveData){
            alert('No admin founded, please set secutity first!');
            return;
        }

        if(username === saveData.username && password === saveData.password){
            localStorage.setItem('IsAdminLoggedIn', 'true');
            navigat('/admin');
        } else{
            alert('Wron username or password')
        }
    }
  return (
   <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <title>Login Form</title>
  <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10 relative">
    
   
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-30"></div>
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-30"></div>

    <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-yellow-600 mb-8"> Welcome Admin </h1>

    <div className="flex flex-col space-y-6">
      <input type="text" placeholder="Username" value={username} onChange={(admin) => setUsername(admin.target.value)} className="w-full border-2 border-yellow-600 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition" />
      <input type="password" placeholder="Password" value={password} onChange={(admin) => setPassword(admin.target.value)} className="w-full border-2 border-yellow-600 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition" />

      <button onClick={handleLogin} className="w-full bg-yellow-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-yellow-400 transition-transform transform hover:scale-105"> Login </button>
    </div>
  </div>
</div>


    );  }

export default Login;
