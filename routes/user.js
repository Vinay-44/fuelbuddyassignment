
import { createUser, deleteUser, getUserById, rootUser, updateUser } from "../controllers/user.controller.js";

export default function (fastify, opts, done) {

  fastify.get("/", rootUser);
  fastify.get('/:id',{
    schema:{
        params:{
            type:'object',
            properties:{
                id:{type:'string'}
            },
            required:['id']
        }
    }
  },getUserById)
  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" },
            email: { type: "string" },
          },
          required: ["username", "password", "email"],
        },
      },
    },
    createUser
  );
  fastify.patch('/update/:id',{
    schema:{
        params:{
            type:'object',
            properties:{
                id:{type:'string'}
            },
            required:['id']
        },
        body:{
            type:'object',
            properties:{
                username:{type:'string'}
            },
            required:['username']
        }
    }
  },updateUser)
  fastify.delete('/delete/:id',{
    schema:{
        params:{
            type:'object',
            properties:{
                id:{type:'string'}
            },
            required:['id']
        }
    }
  },deleteUser)
  done();
}
