// import React, { useEffect, useState } from 'react';
// import { getCurrentUser, logout } from '../services/auth';
// import { useNavigate } from 'react-router-dom';

// const Profile: React.FC = () => {
//   const [user, setUser] = useState<any>(null);
//   const history = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const currentUser = await getCurrentUser();
//       if (!currentUser) {
//         history('/login');
//       } else {
//         setUser(currentUser);
//       }
//     };

//     fetchUser();
//   }, [history]);

//   const handleLogout = async () => {
//     await logout();
//     history('/login');
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-2xl mb-4">Profile</h2>
//         {user ? (
//           <>
//             <p>Welcome, {user.email}</p>
//             <button onClick={handleLogout} className="mt-4 w-full bg-red-500 text-white p-2 rounded">Logout</button>
//           </>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;