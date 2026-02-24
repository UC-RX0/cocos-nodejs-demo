import { _decorator, Animation, AnimationClip } from 'cc';
import { EntityTypeEnum, IActor, InputTypeEnum } from '../../Common';
import { EntityStateEnum, ParamsNameEnum } from '../../Enum';
import StateMachine, { getInitParamsTrigger } from '../../Base/StateMachine';
import State from '../../Base/State';
const { ccclass, property } = _decorator;

/**
 * @description 玩家状态机
 * 自己的理解:ActorStateMachine就是玩家自己的状态机, 凡是想使用动画系统的
 * 都必须在原有的UI控件基础上附带这个状态机信息 这个状态机系统的设定是使用了类混合树(不确定)
 * 就像创建动画系统一样 设置触发条件(Parames 状态名称 类型 数值) 设置状态机(StateMachine 总系统)
 * 子系统共有两个节点  子状态机(SubstateMachine 子系统附属于StateMachine)可包含state  state(子系统附属于SubstateMachine和stateMachine)
 * 可以理解为 单一状态机就设置为state 多状态就设置为SubstateMachine(含有state) 故我称之为类混合树
 * 其触发条件十分简单 首先是需要设置好状态机(参数 state substatemachine) 通过setParams
 * 触发总状态机 stateMachine的run方法 修改currentState选择当前状态机(state 或者是 subStateMachine 接着传递到state)
 * 来进行run方法(state为最终承接者) state采用对象轨道(改变对象的属性值)来完成动画系统
 * 
 *
 */
@ccclass('BulletStateMachine')
export class BulletStateMachine extends StateMachine {
    init(type: EntityTypeEnum) {
        this.type = type;
        this.animationComponent = this.node.addComponent(Animation);
        this.initParams();
        this.initStateMachines();
        this.initAnimationEvent();
    }

    initParams() {
        this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger());
    }

    initStateMachines() {
        this.stateMachines.set(ParamsNameEnum.Idle, new State(this, `${this.type}${EntityStateEnum.Idle}`, AnimationClip.WrapMode.Loop));
    }

    initAnimationEvent() { }

    run() {
        switch (this.currentState) {
            case this.stateMachines.get(ParamsNameEnum.Idle):
            default:
                this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
                break;
        }
    }
}


