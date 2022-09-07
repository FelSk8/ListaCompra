
import { validate } from "class-validator";
import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { User } from "../entity/User"

export class UserController { // crud de usuarios

    static newUser = async (req: Request, res: Response) => {
    const { email, password} = req.body;
    const user = new User();
    user.email = email;
    user.password = password;

        
    const validationOpt = {
        validationError: { target: false, value: false },
      };
      const errors = await validate(user, validationOpt);
      if (errors.length > 0) {
        return res.status(400).send(errors);
      }
      const userRepository = AppDataSource.getRepository(User);
      try {
        user.hashPassword();//encriptamos el password
        await userRepository.save(user);//guardamos el usuario

      } catch (error) {
        return res.status(500).json({
          message: "Error creating user",
          error:error.message
        })
      }
      return res.status(201).json({
        message: "User created",
      })
    
    }

    static getUsers = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User);
        let users;
        try {
          users = await userRepository.find();
        } catch (error) {
          return res.status(500).json({
            message: "Error getting users",
            error: error.message,
          });
        }
        if (users.length > 0) {
          return res.send(users);
        } else {
          return res.status(404).json({
            message: "No users found",
          });
        }
    }

     static getByid = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User);
    
        try {
          const user = await userRepository.findOneByOrFail({ id: parseInt(id) });
          res.send(user);
        } catch (error) {
          res.status(404).json({
            message: "User not found",
            error: error.message,
          });
        }
    }

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User);
        let user: User;
        try {
          user = await userRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
          return res.status(404).json({
            message: "User not found",
            error: error.message,
          });
        }
        try {
           await userRepository.delete(id);
            res.status(200).json({
              message: "User deleted",
            });
            
        } catch (error) {
            res.status(500).json({
              message: "Error deleting user",
              error: error.message
            });
           
        }
       
    }
    
    static update =async (req: Request, res: Response) =>{
        let user;
        const {id} = req.params;
        const {email, password} = req.body;
        const userRepository = AppDataSource.getRepository(User)//conexion a la base de datos
        try {
            user = await userRepository.findOneByOrFail({id: parseInt(id)})//BUSCAMOS AL USUARIO
            user.email= email;
            user.password= password;
           
    
        } catch (error) {
            return res.status(404).json({
                message: "User not found",
                error: error.message
            })
            
        }
    
        const validationOpt = { validationError: { target: false, value: false}}
        const errors =  await validate(user,validationOpt)
        if (errors.length > 0){
            return res.status(400).send(errors)
        }
    
        try {
          await userRepository.save(user);
        } catch (error) {
          return res.status(500).json({
            message: "Error Updating User",
          });
        }
        return res.status(201).json({
          message: "Update User",
        });
    }
}
    
    
