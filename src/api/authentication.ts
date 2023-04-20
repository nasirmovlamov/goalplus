// import { toast } from "react-hot-toast";

// const authenticationApi = async (
//   username: string,
//   password: string
// ): Promise<AuthenticationResponse> => {
//   try {
//     const response = await fetch(
//       "http://159.69.150.229:5000/api/authentication",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       }
//     );
//     toast.success("Successfully authenticated wait for intialization!");
//     return await response.json();
//   } catch (error) {
//     toast.error("An error occurred while authenticating");
//   }
// };
