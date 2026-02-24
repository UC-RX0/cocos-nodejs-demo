import { _decorator, Animation, Component } from "cc";

import { FsmParamTypeEnum } from "../Enum";
const { ccclass } = _decorator;
import State from "./State";
import SubStateMachine from "./SubStateMachine";
import { EntityTypeEnum } from "../Common";

type ParamsValueType = boolean | number;//联合类型用作状态的转换

export interface IParamsValue {
  type: FsmParamTypeEnum;
  value: ParamsValueType;
}
//定义了translate 的形态
export const getInitParamsTrigger = () => {
  return {
    type: FsmParamTypeEnum.Trigger,
    value: false,
  };
};
export const getInitParamsNumber = () => {
  return {
    type: FsmParamTypeEnum.Number,
    value: 0,
  };
};
/***
* 流动图
* 1.entity的state或者direction改变触发setter
* 2.setter里触发fsm的setParams方法
 * 3.setParams执行run方法（run方法由子类重写）
 * 4.run方法会更改currentState，然后触发currentState的setter
* 5-1.如果currentState是子状态机，继续执行他的run方法，run方法又会设置子状态机的currentState，触发子状态run方法
* 5-2.如果是子状态，run方法就是播放动画
*/
//混合树 状态机 子状态机 translate   状态机与状态机之间存在转换 状态机与子状态机也存在转换
/***
 * 有限状态机基类 状态机之间的总处理中心 根据状态机的名字调用对应的状态机
 */
@ccclass("StateMachine")
export default abstract class StateMachine extends Component {
  /***
     * 当前状态 
     */
  private _currentState: State | SubStateMachine = null;
  params: Map<string, IParamsValue> = new Map();//用于存储转换条件
  stateMachines: Map<string, SubStateMachine | State> = new Map();//用于存储状态机和对应方向的子状态机
  animationComponent: Animation;
  type: EntityTypeEnum;//是谁的状态机在做

  getParams(paramName: string) {
    if (this.params.has(paramName)) {
      return this.params.get(paramName).value;
    }
  }

  setParams(paramName: string, value: ParamsValueType) {
    if (this.params.has(paramName)) {
      //设置状态机之间的translate的值 根据名字和类型调整状态机与状态机之间的转换
      this.params.get(paramName).value = value;
      //执行状态机
      this.run();
      //状态机之间如果是双向的 应该是前往下一个状态之后(执行完当前状态机所对应的动画)返回到上一个状态机
      //即使是初始状态start 与idle 之间也是无限触发状态才对 只是每次播放完idle动画 回到start状态后 都会再次回到idle状态机中
      this.resetTrigger();
    } else {
      console.error(`状态机${this.type}中不存在参数${paramName}`);
      return;
    }

  }

  get currentState() {
    return this._currentState;
  }

  set currentState(newState) {
    if (!newState) {
      return;
    }
    this._currentState = newState;
    this._currentState.run();
  }

  /***
   * 清空所有trigger
   */
  resetTrigger() {
    for (const [, value] of this.params) {
      if (value.type === FsmParamTypeEnum.Trigger) {
        value.value = false;
      }
    }
  }

  /***
   * 由子类重写，方法目标是根据当前状态和参数修改currentState
   */
  abstract init(...args: any[]): void;
  abstract run(): void;
}
