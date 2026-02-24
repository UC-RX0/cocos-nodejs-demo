
import { WebSocketServer, WebSocket, EventEmitter } from "ws";
import { Connection } from "./Connection";
import { ApiMsgEnum, IModel } from "../Common";
export class Myserver extends EventEmitter {
    port: number
    wss: WebSocketServer;
    connections: Set<Connection> = new Set();
    apiMap: Map<ApiMsgEnum, Function> = new Map();
    constructor(
        { port }: { port: number }
    ) {
        super();
        this.port = port;
    }
    start() {
        return new Promise((res, rej) => {
            this.wss = new WebSocketServer({
                port: this.port
            });
            this.wss.on("listening", () => {
                res(true);
            })
            this.wss.on("error", (err: Error) => {
                console.error(err);
                rej(false)
            })
            this.wss.on("close", (ws: WebSocket) => {
                rej(false);
            })
            this.wss.on("connection", (ws: WebSocket) => {
                const conn = new Connection(this, ws);
                this.emit("connection", conn);
                this.connections.add(conn);
                conn.on("close", () => {
                    this.emit("disconnect", conn);
                    this.connections.delete(conn);
                })
            })
        })
    }
    setApi<T extends keyof IModel["api"]>(name: T, cb: (conn: Connection, data: IModel["api"][T]['req']) => void) {
        this.apiMap.set(name, cb);
    }
}