import 'dotenv/config'
import Fastify from 'fastify';
import user from './routes/user.js';


const fastify = Fastify({
    logger:false
});


fastify.register(user,{prefix:'/user'});

fastify.listen({port:3000}).then((val)=>{
    console.log(val);
})