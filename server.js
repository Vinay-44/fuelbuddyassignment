import 'dotenv/config'
import Fastify from 'fastify';
import user from './routes/user.js';


const fastify = Fastify({
    logger:false
});


await fastify.register(import('@fastify/swagger'))

await fastify.register(import('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})

fastify.register(user,{prefix:'/user'});

fastify.listen({port:3000}).then((val)=>{
    console.log(val);
})