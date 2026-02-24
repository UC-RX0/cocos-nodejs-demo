import { renderActorData } from './../Controller/BattleController';
import { _decorator, Component, EventTouch, input, Input, instantiate, Node, UITransform, Vec2, Vec3 } from 'cc';
import DataManager from '../Global/DataManager';
import { JoyStickManager } from '../UI/JoyStickManager';
import { BattleController } from '../Controller/BattleController';
import { ActorManager } from '../Entity/Actor/ActorManager';
import { BulletManager } from '../Entity/Bullet/BulletManager';
import { ApiMsgEnum, clientInput, EntityTypeEnum, IActor, IBullet, IMsgClientSync, IMsgServerSync, InputTypeEnum } from '../Common';
import ObjectPoolManager from '../Global/ObjectPoolManager';
import { NetworkManager } from '../Global/NetworkManager';
import EventManager from '../Global/EventManager';
import { EventEnum } from '../Enum';
import { deepClone } from '../Utils';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    private stage: Node = null;
    private ui: Node = null;
    private _JoyStickData: JoyStickManager = null;
    private pendingInputs: IMsgClientSync[] = [];
    private isFinish: boolean = false
    async start() {
        this.clearGame();
        //网络模块
        //游戏模块
        const list = BattleController.loadRes();
        await Promise.all([...list, this.connectServer()])
        const { success, error, res } = await NetworkManager.Instance.callApi(ApiMsgEnum.ApiPlayerJoin, {
            nickname: "player1"
        });
        if (!success) {
            console.error(error);
            return;
        }
        console.log('ApiPlayerJoin', res);
        this.initGame();
    }
    clearGame() {
        DataManager.Instance.stage = this.stage = this.node?.getChildByName("Stage");
        this.ui = this.node?.getChildByName("UI");
        this.stage.destroyAllChildren();
    }
    initGame() {
        this._JoyStickData = this.ui.getComponentInChildren(JoyStickManager);
        BattleController.setJoyStickData(this._JoyStickData);
        this.initMap();
        this.isFinish = true;
        EventManager.Instance.on(EventEnum.ClientSync, this.handleClientSync, this);
        NetworkManager.Instance.listenMsg(ApiMsgEnum.MsgServerSync, this.handleServerSync, this);
    }

    onDestroy(): void {
        EventManager.Instance.off(EventEnum.ClientSync, this.handleClientSync, this);
        NetworkManager.Instance.unListenMsg(ApiMsgEnum.MsgServerSync, this.handleServerSync, this);
    }

    async connectServer() {
        //连接服务器
        if (!(await NetworkManager.Instance.connect().catch(() => false))) {
            await new Promise((resolve) => setTimeout(resolve, 1000));//等待1秒
            await this.connectServer();
        }
    }
    initMap() {
        //地图初始化
        const mapPrefab = BattleController.initMap();
        const map = instantiate(mapPrefab);
        this.stage.addChild(map);
    }
    update(dt: number): void {
        if (!this.isFinish) return;
        this.renderActor();
        this.renderBullet();
        this.tick(dt);
    }
    tick(dt: number) {
        this.tickActor(dt);
        // DataManager.Instance.applyInput({
        //     type: InputTypeEnum.TimePast,
        //     dt
        // });
    }
    /**
     * @description 从state中获取已经在游戏中的玩家信息,然后触发他们的tick(更新玩家信息)
     * @param dt 
     */
    tickActor(dt: number) {
        for (const data of DataManager.Instance.state.actor) {
            const actor = DataManager.Instance.actorMap.get(data.id);
            if (actor) {
                actor.tick(dt);
            }
        }
    }
    renderActor() {
        const renderActorData = BattleController.renderActor();
        // const renderBulletData = BattleController.renderBullet();
        //如若为空，代表actorMap已经存在键值对(代表已经存在了该actor),则由Controller直接触发渲染,不需要Manager渲染
        if (!renderActorData) return;
        const { data, prefab } = renderActorData;
        const actor = instantiate(prefab);
        this.stage.addChild(actor);
        const am = actor.addComponent(ActorManager);
        BattleController.setActorManager(data.id, am);
        am.init(data);
        // console.log('here1');

    }
    /**
 * @description 渲染游戏中所有子弹的方法
 * 负责子弹的创建、初始化和状态更新
 */
    renderBullet() {
        const renderBulletData = BattleController.renderBullet();
        // 如果为空，代表bulletMap已经存在键值对(代表已经存在了该bullet),则由Controller直接触发渲染,不需要Manager渲染
        if (!renderBulletData) return;
        const { data } = renderBulletData;
        const bullet = ObjectPoolManager.Instance.get(data.bulletType)
        const bm = bullet.addComponent(BulletManager);
        BattleController.setBulletManager(data.id, bm);
        bm.init(data);
    }
    /**
     * @description 处理服务器同步的actor数据
     * @param data 服务器同步的actor数据
     */
    handleClientSync(input: clientInput) {
        const msg = {
            input,
            frameId: DataManager.Instance.frameID++,
        }
        NetworkManager.Instance.sentMsg(ApiMsgEnum.MsgClientSync, msg);
        if (input.type === InputTypeEnum.ActorMove) {
            DataManager.Instance.applyInput(input);
            this.pendingInputs.push(msg);
        }
    }
    handleServerSync({ inputs, lastFrameId }: IMsgServerSync) {
        DataManager.Instance.state = DataManager.Instance.lasteState;
        for (const input of inputs) {
            // 应用服务器输入 有Bug 移动出现问题
            DataManager.Instance.applyInput(input);
        }
        DataManager.Instance.lasteState = deepClone(DataManager.Instance.state);
        this.pendingInputs = this.pendingInputs.filter((item) => item.frameId > lastFrameId);
        for (const item of this.pendingInputs) {
            DataManager.Instance.applyInput(item.input);
        }
    }
}

