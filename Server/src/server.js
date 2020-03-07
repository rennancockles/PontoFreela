import { GraphQLServer } from 'graphql-yoga'
import glue from 'schemaglue'
import permissions from './Middlewares/permissions'
import 'dotenv/config'

const { schema, resolver } = glue('src/GraphQL')

const server = new GraphQLServer({ 
    typeDefs: schema,
    resolvers: resolver,
    context: req => ({ ...req }),
    middlewares: [permissions]
})

server.start(({ port }) => {
    console.log(`Server is running on http://localhost:${port}`)
})