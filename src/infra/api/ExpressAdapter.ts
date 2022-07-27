import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

export default class ExpressAdapter implements HttpServer {

    app: any;
    server: any;
    io: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

        this.server = http.createServer(this.app);

        const origin = process.env.CLIENT_CORS_URL ?? '*';

        this.io = new Server(this.server, {
            cors: {
                origin,
                methods: ["GET", "POST"]
            }
        });

        let users: Array<any> = [];

        const addUser = (userId: string, socketId: string) => {
            !users.some((user) => user.userId === userId) &&
                users.push({ userId, socketId });
        };

        const removeUser = (socketId: string) => {
            users = users.filter((user) => user.socketId !== socketId);
        };

        const getUser = (userId: string) => {
            return users.find((user) => user.userId === userId);
        };

        this.io.on("connection", (socket: any) => {
            console.log(`User connected (${socket.id})`);

            socket.on("addUser", (userId: string) => {
                addUser(userId, socket.id);
                this.io.emit("getUsers", users);
            });

            socket.on("sendMessage", ({ senderId, receiverId, text }: any) => {
                const user = getUser(receiverId);
                this.io.to(user.socketId).emit("getMessage", {
                    senderId,
                    text,
                });
            });

            socket.on("disconnect", () => {
                console.log("User disconnected!");
                removeUser(socket.id);
                this.io.emit("getUsers", users);
            });
        });
    }

    on(method: string, url: string, callback: Function): void {
        this.app[method](url, async function (req: Request, res: Response) {
            const { output, statusCode } = await callback(req.params, req.body);
            res.status(statusCode).json(output);
        });
    }
    listen(port: number): void {
        this.server.listen(port);
        console.log(`SERVER IS RUNNING - PORT:${port}`);
    }

}