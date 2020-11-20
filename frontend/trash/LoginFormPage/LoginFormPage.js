// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import "./LoginForm.css";

// function LoginFormPage() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(sessionActions.loginUser({ credential, password })).catch(
//       (res) => {
//         if (res.data && res.data.errors) setErrors(res.data.errors);
//       }
//     );
//   };

//   return (
//     <div className="login-form">
//       <form onSubmit={handleSubmit}>
//         <p>Log In</p>
//         <ul>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
//         </ul>
//         <label>Email Address</label>
//         <input
//           name="email"
//           value={credential}
//           placeholder="email address"
//           onChange={(e) => setCredential(e.target.value)}
//         />

//         <label>Password</label>
//         <input
//           name="password"
//           value={password}
//           placeholder="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// };
// export default LoginFormPage;
