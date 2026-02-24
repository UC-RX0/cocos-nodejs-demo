
import { Myserver } from ".";
import { WebSocketServer, WebSocket, EventEmitter } from "ws";
import { IModel } from "../Common";

const em = new EventEmitter();
interface IItem {
    cb: Function;
    ctx: unknown;
}
export class Connection extends EventEmitter {
    private map: Map<string, Array<IItem>> = new Map();
    constructor(private server: Myserver, private ws: WebSocket) {
        super();
        this.ws.on("close", () => {
            em.emit("close");
        })
        this.ws.on("message", (buffer: Buffer) => {
            const str = buffer.toString();
            try {
                const { name, data } = JSON.parse(str);
                if (this.server.apiMap.has(name)) {
                    try {
                        const cb = this.server.apiMap.get(name);
                        const res = cb.call(null, this, data);
                        this.sentMsg(name, {
                            success: true,
                            res,
                        });
                    } catch (e) {
                        this.sentMsg(name, {
                            success: false,
                            error: e.message,
                        });
                    }
                } else {
                    try {
                        if (this.map.has(name)) {
                            this.map.get(name).forEach(({ cb, ctx }) => {
                                cb.call(ctx, this, data);
                            });
                        }
                    } catch (e) {
                        console.log("调用事件错误", e.message);
                    }
                }
            } catch (error) {
                console.log("解析消息错误", error);
            }
        });
    }
    sentMsg<T extends keyof IModel["msg"]>(name: T, data: IModel["msg"][T]) {
        const msg = JSON.stringify({ name, data });
        this.ws.send(msg);
    }
    listenMsg<T extends keyof IModel["msg"]>(name: T, cb: (Connection: Connection, args: IModel["msg"][T]) => void, ctx: unknown) {
        if (this.map.has(name)) {
            this.map.get(name).push({ cb, ctx });
        } else {
            this.map.set(name, [{ cb, ctx }]);
        }
    }
    unListenMsg<T extends keyof IModel["msg"]>(name: T, cb: (Connection: Connection, args: IModel["msg"][T]) => void, ctx: unknown) {
        if (this.map.has(name)) {
            const index = this.map.get(name).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(name).splice(index, 1);
        }
    }
}