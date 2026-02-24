import { buildTree } from './../../../../extensions/Behavior Eden/src/runtime/core/utils';
import { _decorator, instantiate, IVec2 } from 'cc';
import DataManager from '../../Global/DataManager';
import { EntityTypeEnum, IActor, IBullet, InputTypeEnum } from '../../Common';
import { EntityManager } from '../../Base/EntityManager';

import { EntityStateEnum, EventEnum, PrefabPathEnum } from '../../Enum';
import { WeaponManager } from '../Weapon/WeaponManager';
import { rad2Angle } from '../../Utils';

import EventManager from '../../Global/EventManager';
import { ExplosionStateMachine } from './ExplosionStateMachine';
const { ccclass, property } = _decorator;

@ccclass('ExplosionManager')
/** 
 * @description 爆炸管理器 
 * 
*/
export class ExplosionManager extends EntityManager {
    type: EntityTypeEnum
    /**
     * @description 初始化玩家信息
     * @param data 
     */
    init(type: EntityTypeEnum, { x, y }: IVec2) {
        this.type = type;
        this.node.setPosition(x, y)
        this.fsm = this.addComponent(ExplosionStateMachine);//添加状态机组件 多态
        this.fsm.init(type);//初始化状态机
        this.state = EntityStateEnum.Idle;//设置初始状态
    }
}


