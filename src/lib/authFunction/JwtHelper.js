import { jwtVerify, SignJWT } from "jose";

export async function CreateJwtToken(email, id) {
    try {
        const mySecret = process.env.JWT_SECRET;
        if (!mySecret) {
            throw new Error("JWT_SECRET environment variable is not set");
        }

        const Secret = new TextEncoder().encode(mySecret);
        
        const token = await new SignJWT({ email, id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setIssuer(process.env.JWT_ISSUER || "your-app") // Configurable issuer
            .setExpirationTime(process.env.JWT_EXPIRES_IN || "2h")
            .sign(Secret);

        return token;
    } catch (error) {
        console.error("JWT Creation Error:", error);
        throw new Error("Failed to create authentication token");
    }
}

export async function DecodedJwtToken(token) {
    try {
        const mySecret = process.env.JWT_SECRET;
        if (!mySecret) {
            throw new Error("JWT_SECRET environment variable is not set");
        }

        const Secret = new TextEncoder().encode(mySecret);
        const { payload } = await jwtVerify(token, Secret, {
            issuer: process.env.JWT_ISSUER || "your-app" // Verify issuer matches
        });
        
        return payload;
    } catch (error) {
        console.error("JWT Verification Error:", error);
        
        // Specific error types for better handling
        if (error.code === 'ERR_JWT_EXPIRED') {
            throw new Error("Token has expired");
        }
        if (error.code === 'ERR_JWT_INVALID') {
            throw new Error("Invalid token");
        }
        
        throw new Error("Failed to verify token");
    }
}