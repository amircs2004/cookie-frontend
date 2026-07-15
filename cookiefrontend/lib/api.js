const urlBase = "";

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
    // const token = localStorage.getItem("token");

    const response = await fetch(`${urlBase}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // we need add the authorization
        //   Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (response.status === 401) {
      console.log("Unauthorized: Redirecting to login...");
      return null; // Clearly indicate auth failure
    }
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
        credentials: "include",
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
export const apiCreateFormulaire = async (data) => {
  try {
    const response = await fetch(`${urlBase}/api/createFormula`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      // credentials: "include", this will work if i want using cross site cookies
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error("error  at saving the formulaire");
    }

    return result;
  } catch (error) {
    console.error("Error during creation of formulaire:", error);
    throw error;
  }
};
