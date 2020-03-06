import { GraphQLServer } from 'graphql-yoga'
import 'dotenv/config'
import glue from 'schemaglue'

const { schema, resolver } = glue('src/GraphQL')

const server = new GraphQLServer({ 
    typeDefs: schema,
    resolvers: resolver
})

server.start(({ port }) => {
    console.log(`Server is running on http://localhost:${port}`)
})