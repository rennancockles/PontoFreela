import { sentry } from 'graphql-middleware-sentry'

const sentryMiddleware = sentry({
    config: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.ENVIRONMENT 
    },
    withScope: (scope, error, context) => {
        scope.setUser({
            id: context.userId,
        })
        scope.setExtra('body', context.request.body)
        scope.setExtra('origin', context.request.headers.origin)
        scope.setExtra('user-agent', context.request.headers['user-agent'])
    },
    captureReturnedErrors: true,
    forwardErrors: true
})

export default sentryMiddleware