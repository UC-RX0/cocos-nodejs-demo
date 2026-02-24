import { buildTree } from './../../../../extensions/Behavior Eden/src/runtime/core/utils';
import { _decorator, instantiate, Node, ProgressBar, Sprite, Color, Tween, Vec3 } from 'cc';
import DataManager, { MAX_HP } from '../../Global/DataManager';
import { EntityTypeEnum, IActor, InputTypeEnum, toFix } from '../../Common';
import { EntityManager } from '../../Base/EntityManager';
import { ActorStateMachine } from './ActorStateMachine';
import { EntityStateEnum, EventEnum, PrefabPathEnum } from '../../Enum';
import { WeaponManager } from '../Weapon/WeaponManager';
import { rad2Angle } from '../../Utils';
import EventManager from '../../Global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('ActorManager')
/** 
 * @description 玩家管理器 
 * 
*/
export class ActorManager extends EntityManager {
    private wm: WeaponManager
    bulletType: EntityTypeEnum
    private id: number
    private hpBar: ProgressBar
    private targetPos: Vec3 = undefined
    private tw: Tween<Node>;
    /**
     * @description 初始化玩家信息
     * @param data 
     */
    init(data: IActor) {
        this.node.active = false;
        this.id = data.id;
        this.bulletType = data.bulletType;
        this.fsm = this.addComponent(ActorStateMachine);//添加状态机组件 多态
        this.fsm.init(data.Type);//初始化状态机
        this.state = EntityStateEnum.Idle;//设置初始状态
        this.hpBar = this.node.getChildByName('Hp').getComponent(ProgressBar);
        const weaponPrefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Weapon1);
        if (weaponPrefab) {
            const weaponNode = instantiate(weaponPrefab);
            weaponNode.parent = this.node;
            weaponNode.setPosition(0, 0);
            this.wm = weaponNode.addComponent(WeaponManager);
            this.wm.init(data);
        }
    }

    tick(dt): void {
        if (this.id !== DataManager.Instance.playerID) return;//不是当前玩家 不处理
        const { x, y } = DataManager.Instance.jm.input;

        if (DataManager.Instance.jm.input.length()) {
            EventManager.Instance.emit(EventEnum.ClientSync, {
                id: DataManager.Instance.playerID,
                type: InputTypeEnum.ActorMove,
                direction: {
                    x: x,
                    y: y
                },
                dt
            })

        } else {
            this.state = EntityStateEnum.Idle;
        }
    }
    /**
     * @description 渲染玩家信息
     * @param data 
     */
    render(data: IActor) {
        this.renderPosition(data);
        this.renderAngle(data);
        this.renderHp(data);
    }
    renderPosition(data: IActor) {
        const { position } = data
        const newPos = new Vec3(position.x, position.y);
        if (!this.targetPos) {
            this.node.active = true;
            this.node.setPosition(newPos);
            this.targetPos = new Vec3(newPos);
        } else if (!this.targetPos.equals(newPos)) {
            this.tw?.stop();
            this.node.setPosition(this.targetPos);
            this.targetPos.set(newPos);
            this.state = EntityStateEnum.Run;
            this.tw = new Tween(this.node)
                .to(0.1, { position: this.targetPos })
                .call(() => {
                    this.state = EntityStateEnum.Idle;
                })
                .start();
        }
    }
    renderAngle(data: IActor) {
        const { direction } = data
        if (direction.x !== 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
            this.hpBar.node.setScale(direction.x > 0 ? 1 : -1, 1);
        }
        const side = Math.sign(direction.x ** 2 + direction.y ** 2);
        const angle = rad2Angle(Math.asin(direction.y / side));
        this.wm.node.setRotationFromEuler(0, 0, angle);
    }
    renderHp(data: IActor) {
        this.hpBar.progress = data.hp / MAX_HP;
        if (data.hp <= 0) {
            DataManager.Instance.actorMap.delete(this.id);
            DataManager.Instance.state.actor.splice(DataManager.Instance.state.actor.findIndex(a => a.id === this.id), 1);
            this.node.destroy();
        }
    }
}


