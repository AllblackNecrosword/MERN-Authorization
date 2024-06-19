// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, setCookie, removeCookie] = useCookies([]);

//   useEffect(() => {
//     const verifyUser = async () => {
//       if (!cookies.jwt) {
//         navigate("/login");
//       } else {
//         try {
//           const response = await fetch("http://localhost:5000/jwt", {
//             method: "POST",
//             credentials: "include",
//           });
//           const data = await response.json();
//           console.log(data);
//           if (!data.status) {
//             removeCookie("jwt");
//             navigate("/login");
//           } else {
//             // You can handle successful verification here, like setting user data
//             alert(`Hi ${data.user}`);
//             navigate("/");
//           }
//         } catch (error) {
//           console.error("Error verifying user:", error);
//           removeCookie("jwt");
//           navigate("/login");
//         }
//       }
//     };
//     verifyUser();
//   }, [cookies, navigate, removeCookie]);

//   const Logouthandler = () => {
//     removeCookie("jwt");
//     navigate("/signup");
//   };

//   return (
//     <div className="flex justify-center">
//       <p className="text-3xl font-bold">I am Home page</p>
//       <button
//         onClick={Logouthandler}
//         className="bg-slate-500 p-3 rounded-2xl m-3"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  useEffect(() => {
    console.log("JWT Cookie:", cookies.jwt); // Log the JWT cookie value
    console.log("All Cookies:", cookies);
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        try {
          const response = await fetch("http://localhost:5000/jwt", {
            method: "POST",
            credentials: "include",
          });
          const data = await response.json();
          console.log(data);
          if (data.status) {
            alert(`Hi ${data.user}`);
            navigate("/");
          } else {
            removeCookie("jwt");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error verifying user:", error);
          removeCookie("jwt");
          navigate("/login");
        }
      }
    };
    verifyUser();
  }, [cookies, removeCookie]);

  const Logouthandler = () => {
    removeCookie("jwt");
    navigate("/signup");
  };

  return (
    <div className="flex justify-center">
      <p className="text-3xl font-bold">I am Home page</p>
      <button
        onClick={Logouthandler}
        className="bg-slate-500 p-3 rounded-2xl m-3"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
