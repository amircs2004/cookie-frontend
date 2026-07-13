
const urlBase = "https://cooki-backend.vercel.app";

export const register = async (data) => {
  try {
    const registerNewUser = await fetch(`${urlBase}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await registerNewUser.json();
    if (!registerNewUser.ok) {
      // This will catch the "User already exists" 400 error
      throw new Error(result.msg || "Registration failed");
    }
    return result;
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};
//
export const getUserInfos = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    const response = await fetch(`${urlBase}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // we need add the authorization
        Authorization: `Bearer ${token}`,
      },
      //deleting this temporary
      credentials: "include", // 'include' 'omit' 'same-origin' when cookie is sent from diffrent domaines the cookie will be not be sent
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.msg || "Failed to fetch user");
    }
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginUser = async (data) => {
  try {
    // i used this const token = localStorage.setItem("token"); before the logging request
    //  const token = localStorage.setItem("token");
    // console.log(token);

    const response = await fetch(
      `${urlBase}/api/login`,
      // the backend uses res.cookie to sedn the token => secure approach because i use httponly whiche means javascript cannot access the token via localeStrorage.setItem
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`, no need to send this the server is the one whos going to provide the tpken if the resuest is successfull
        },
        body: JSON.stringify(data), // this function is going to turn the data which its time is object into a string
       //to forece the brower to save the cookie i need to include 
       credentials : 'include'
    },
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const result = await response.json();

    console.log(result);
    // and ofcause i have to return the result !!!!
    return result;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
