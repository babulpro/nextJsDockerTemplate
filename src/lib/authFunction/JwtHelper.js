import { jwtVerify, SignJWT } from "jose"

 export async function CreateJwtToken(email,id) {
    const secret = process.env.MYSECRET;
    const Secret= new TextEncoder().encode(secret)
    let token = await new SignJWT({email,id})
                .setProtectedHeader({alg:'HS256'})
                .setIssuedAt()
                .setIssuer("babul1946@gmail.com")
                .setExpirationTime("2h")
                .sign(Secret);

    return token
    
 }


export async function DecodedJwtToken(token) {
    const secret = process.env.MYSECRET;
    const Secret= new TextEncoder().encode(secret)
    const decodedToken = await jwtVerify(token,Secret)
    return decodedToken['payload']   
    
}