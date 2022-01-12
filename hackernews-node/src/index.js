const { ApolloServer } = require('apollo-server');

let links = [
    {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'FullStack tutorial for graphql'
    },
    {
    id: 'link-1',
    url: 'www.howtographql1.com',
        description: 'FullStack tutorial for graphql1'
    },

];

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent,args) => links.find((link) => link.id === args.id),
        
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length;

            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link);
            return link;
        }
    }

    
}

const fs = require('fs');
const path = require('path');

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf-8'
    ),
    resolvers,
})

server
    .listen()
    .then(({ url }) => {
        console.log(`Server is running on ${url}`)
    })