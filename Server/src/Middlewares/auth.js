import jwt from 'jsonwebtoken'

export default async (resolve, root, args, ctx, info) => {
    const authorization = ctx.request.get('Authorization')

    if (!authorization) throw new Error('No token provided')

    const parts = authorization.split(' ')

    if (!parts.length === 2) throw new Error('Token error')

    const [ scheme, authToken ] = parts

    if (!/^Bearer$/i.test(scheme)) throw new Error('Token format error')
    
    try {
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET)

        if (!decodedToken) throw new Error('Not Authorized')

        ctx.userId = decodedToken.id

        return await resolve(root, args, ctx, info)
    } catch {
        throw new Error("Not authorized")
    }
}