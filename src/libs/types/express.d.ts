

declare namespace Express {
    export interface Request {
        grupo?: string
    }
}



// declare global {
//     namespace Express {
//       // extend the built in User with your own custom properties
//         // interface User extends  {}
    
//         // Extend the request and response objects with your own custom properties
//         export interface Request {
//             grupo?: string;
//         }
//         // export interface Response {
//         //     locals: {
//         //     allowedRoles?: string[];
//         //     };
//         // }
//     }
// }