/** 
 * 这是A*算法的简单实操
 * 这是地图节点信息类
 * A*计算公式为
 * f = g + h
 * g：从起点到当前节点的实际代价
 * h：从当前节点到终点的估计代价
 * f：g值和h值的总和，用于评估当前节点的优先级
 */
export enum AStartNodeStatus {
    Walk,
    Block
}

export default class AStartNode {
    // 节点的父节点，用于回溯路径
    private _parent: AStartNode | null = null;
    // 节点的g值，即从起点到当前节点的实际代价
    private _g: number = 0;
    // 节点的h值，即从当前节点到终点的估计代价
    private _h: number = 0;
    // 节点的f值，即g值和h值的总和
    private _f: number = 0;
    constructor(
        // 节点在地图中的x坐标
        private _x: number,
        // 节点在地图中的y坐标
        private _y: number,
        // 节点的状态，是否可走或障碍物
        private _type: AStartNodeStatus,

    ) {
    }
    public get x() {
        return this._x
    }
    public get y() {
        return this._y
    }
    public get type() {
        return this._type
    }
    public get parent(): AStartNode | null {
        return this._parent
    }
    public get g() {
        return this._g
    }
    public get h() {
        return this._h
    }
    public get f() {
        return this._f
    }
    public set parent(value: AStartNode | null) {
        this._parent = value
    }
    public set g(value: number) {
        this._g = value
    }
    public set h(value: number) {
        this._h = value
    }
    public set f(value: number) {
        this._f = value
    }


}