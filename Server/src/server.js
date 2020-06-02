import 'dotenv/config'
import { GraphQLServer } from 'graphql-yoga'
import glue from 'schemaglue'
import permissions from './Middlewares/permissions'
import sentryMiddleware from './Middlewares/sentry'

const { schema, resolver } = glue('src/GraphQL')

const server = new GraphQLServer({ 
    typeDefs: schema,
    resolvers: resolver,
    context: req => ({ ...req }),
    middlewares: [sentryMiddleware, permissions]
})

server.start({ playground: false }, ({ port }) => {
    console.log(`Server is running on http://localhost:${port}`)
})