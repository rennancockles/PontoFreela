import { GraphQLServer } from 'graphql-yoga'
import path from 'path'
import 'dotenv/config'
import resolvers from './GraphQL/resolvers'

const server = new GraphQLServer({ 
    typeDefs: path.resolve(__dirname, 'GraphQL', 'schema.graphql'),
    resolvers
})

server.start(({ port }) => {
    console.log(`Server is running on http://localhost:${port}`)
})