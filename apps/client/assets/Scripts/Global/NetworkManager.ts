import { _decorator, resources, Asset } from "cc";
import Singleton from "../Base/Singleton";
import { IModel } from "../Common";

interface IItem {
    cb: Function;
    ctx: unknown;
}
interface IApiMsg<T> {
    success: boolean;
    res?: T;
    error?: Error;
}
export class NetworkManager extends Singleton {

    static get Instance() {
        return super.GetInstance<NetworkManager>();
    }
    port = 9876;
    private socket: WebSocket;//统一通信管道
    private map: Map<string, Array<IItem>> = new Map();
    inConnection = false;
    connect() {
        return new Promise((resolve, reject) => {
            if (this.inConnection) {
                resolve(true)
                return;
            }
            this.socket = new WebSocket(`ws://localhost:${this.port}`);
            this.socket.onopen = () => {
                this.inConnection = true;
                console.log("连接成功");
                resolve(this.socket);
            };
            this.socket.onclose = (event) => {
                this.inConnection = false;
                console.log("连接关闭", event);
                reject(event);
            };
            this.socket.onerror = (event) => {
                this.inConnection = false;
                console.log("连接错误", event);
                reject(event);
            };
            this.socket.onmessage = (event) => {
                try {
                    // console.log("收到消息", event.data);
                    const { name, data } = JSON.parse(event.data);
                    if (this.map.has(name)) {
                        this.map.get(name).forEach(({ cb, ctx }) => {
                            cb.call(ctx, data);
                        });
                    }
                } catch (error) {
                    console.log("解析消息错误", error);
                }

            };
        });
    }
    /**
     * @description 调用接口
     * @param name 接口名称
     * @param data 接口参数
     * @returns 
     */
    callApi<T extends keyof IModel["api"]>(name: T, data: IModel["api"][T]["req"]): Promise<IApiMsg<IModel["api"][T]["res"]>> {
        return new Promise((resolve) => {
            try {
                const time = setTimeout(() => {
                    resolve({ success: false, error: new Error("超时") });
                    this.unListenMsg(name as any, rs, null);
                }, 5000);
                const rs = (res) => {
                    resolve(res);
                    clearTimeout(time);
                    this.unListenMsg(name as any, rs, null);
                }
                this.listenMsg(name as any, rs, null);
                this.sentMsg(name as any, data);
            } catch (error) {
                resolve({ success: false, error });
            }
        });
    }
    sentMsg<T extends keyof IModel["msg"]>(name: T, data: IModel["msg"][T]) {
        const msg = JSON.stringify({ name, data });
        this.socket.send(msg);
    }
    listenMsg<T extends keyof IModel["msg"]>(name: T, cb: (args: IModel["msg"][T]) => void, ctx: unknown) {
        if (this.map.has(name)) {
            this.map.get(name).push({ cb, ctx });
        } else {
            this.map.set(name, [{ cb, ctx }]);
        }
    }
    unListenMsg<T extends keyof IModel["msg"]>(name: T, cb: (args: IModel["msg"][T]) => void, ctx: unknown) {
        if (this.map.has(name)) {
            const index = this.map.get(name).findIndex((i) => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(name).splice(index, 1);
        }
    }
}
