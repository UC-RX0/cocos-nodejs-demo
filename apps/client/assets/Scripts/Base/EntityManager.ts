import { _decorator, Component } from "cc";
import { EntityStateEnum } from "../Enum";
import StateMachine from "./StateMachine";
const { ccclass, property } = _decorator;

/**
 * @description 实体状态机基类 凡是想要使用状态机的实体都需要继承这个类 中间连接状态机与实体
 * 
 */
@ccclass("EntityManager")
export abstract class EntityManager extends Component {
  fsm: StateMachine;
  private _state: EntityStateEnum;

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
    this.fsm.setParams(newState, true);
  }

  abstract init(...args: any[]): void;
}
