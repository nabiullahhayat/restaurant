import { useState } from "react";

function Security(){
    const [modal, setModal] = useState(null); 
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSet = () => {
        const adminData = {
            username , password
        }
          localStorage.setItem('adminAuth', JSON.stringify(adminData));
            alert(('Admin Username and Password saved successfully!'))
    };

  

    return( <div>
                <div className="flex space-x-6">
                <button onClick={() => setModal("security")} className='bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-yellow-400 transition-transform'>Security</button>
                     </div>
               {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
         
          <div className="absolute inset-0 backdrop-blur-sm"></div>

          
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl flex flex-col space-y-5 z-10">
            
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"> X </button>

            {modal === "security" && (
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl font-bold text-yellow-600 text-center">Admin Security</h2>
                <input type="text" value={username} onChange={(admin) => setUsername(admin.target.value)} placeholder="Set Username" className="border-2 border-yellow-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 text-black"/>
                <input type="password" value={password} onChange={(admin) => setPassword(admin.target.value)} Set placeholder="New Password" className="border-2 border-yellow-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 text-black"/>
                <button onClick={handleSet} className='bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 hover:shadow-yellow-400 transition-transform'>Set</button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>)
}

export default Security;