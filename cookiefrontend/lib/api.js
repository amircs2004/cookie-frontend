const urlBase = 'https://cooki-backend.vercel.app'

export  const register = async (data) => {
   try {
       const registerNewUser = await fetch('urlBase/api/register' , {
       method : 'POST' ,
        headers : {
           'content-Type' : 'application/json' , 
       
        } , 
        body : JSON.stringify(data)
       })
       const result = registerNewUser.json()
        if (!response.ok) {
         // This will catch the "User already exists" 400 error
         throw new Error(result.msg || 'Registration failed');
       }
       return result 
   
     
   
   } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
   }
}