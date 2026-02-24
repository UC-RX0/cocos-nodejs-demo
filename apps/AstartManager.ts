
import AStartNode, { AStartNodeStatus } from "./AStartNode";


export interface Vec2 {
    x: number,
    y: number
}


export default class AStartManager {

    private static _Instance: AStartManager;
    public static get Instance(): AStartManager {
        if (this._Instance == null) {
            this._Instance = new AStartManager()
        }
        return this._Instance
    }
    // 地图节点信息矩阵
    private _map: AStartNode[][] = []
    // 地图宽度
    private _width: number = 2000
    // 地图高度
    private _height: number = 2000
    // 开放列表，用于存储待评估的节点
    private _openList: Array<AStartNode> = []
    // 关闭列表，用于存储已评估的节点
    private _closeList: Array<AStartNode> = []
    private _volume: number = 0
    private _col: number = 0
    /**
     * @description 传入单位网格 自动计算出需要划分成多少行多少列
     * @param x 网格宽度    
     * @param y 网格高度
     */
    public initMap(map: AStartNode[][]) {
        // 初始化地图节点信息矩阵
        this._map = map
        if (this._map.length === 0) {
            console.log("地图节点信息矩阵为空")
            return
        }
    }

    /**
     * 查找从起点到终点的路径
     * @param startX 起点的x坐标
     * @param startY 起点的y坐标
     * @param endX 终点的x坐标
     * @param endY 终点的y坐标
     * @returns 从起点到终点的路径节点数组
     */
    public findPath(startPos: Vec2, endPos: Vec2) {
        if (startPos === endPos || this._map[startPos.x][startPos.y].type === AStartNodeStatus.Block || this._map[endPos.x][endPos.y].type === AStartNodeStatus.Block) {
            console.log("起点和终点相同或有障碍物")
            return null
        }
        // 初始化起点和终点节点
        this._volume = this._map[0].length;
        this._col = this._map.length;
        const nodeWidth = this._width / this._volume
        const nodeHeight = this._height / this._col
        // 计算起点和终点节点的坐标
        const startNodeX = Math.floor(startPos.x / nodeWidth)
        const startNodeY = Math.floor(startPos.y / nodeHeight)
        const endNodeX = Math.floor(endPos.x / nodeWidth)
        const endNodeY = Math.floor(endPos.y / nodeHeight)
        if (startNodeX < 0 || startNodeX >= this._volume || startNodeY < 0 || startNodeY >= this._col ||
            endNodeX < 0 || endNodeX >= this._volume || endNodeY < 0 || endNodeY >= this._col) {
            console.log("起点或终点坐标超出地图范围")
            return null
        }
        // 清空开放列表和关闭列表
        this.clear();
        // 计算普通情况 即不是边界的情况
        let startPoint = this._map[startNodeX][startNodeY]
        startPoint.parent = null
        startPoint.g = 0
        startPoint.h = Math.abs(startPoint.x - endNodeX) + Math.abs(startPoint.y - endNodeY)
        startPoint.f = startPoint.g + startPoint.h
        this._openList.push(startPoint)
        this._closeList.push(startPoint)
        // 计算八个方向的节点
        while (true) {
            if (this._openList.length === 0) {
                console.log("没有路径")
                return null
            }
            this.setNodeInfo(this._map[startPoint.x][startPoint.y - 1 > 0 ? startPoint.y - 1 : 0], startPoint, { endNodeX, endNodeY })//上
            this.setNodeInfo(this._map[startPoint.x][startPoint.y + 1 < this._col ? startPoint.y + 1 : this._col - 1], startPoint, { endNodeX, endNodeY })//下
            this.setNodeInfo(this._map[startPoint.x - 1 > 0 ? startPoint.x - 1 : 0][startPoint.y], startPoint, { endNodeX, endNodeY })//左
            this.setNodeInfo(this._map[startPoint.x + 1 < this._volume ? startPoint.x + 1 : this._volume - 1][startPoint.y], startPoint, { endNodeX, endNodeY })//右
            this.setNodeInfo(this._map[startPoint.x - 1 > 0 ? startPoint.x - 1 : 0][startPoint.y - 1 > 0 ? startPoint.y - 1 : 0], startPoint, { endNodeX, endNodeY })//左上
            this.setNodeInfo(this._map[startPoint.x + 1 < this._volume ? startPoint.x + 1 : this._volume - 1][startPoint.y - 1 > 0 ? startPoint.y - 1 : 0], startPoint, { endNodeX, endNodeY })//右上
            this.setNodeInfo(this._map[startPoint.x - 1 > 0 ? startPoint.x - 1 : 0][startPoint.y + 1 < this._col ? startPoint.y + 1 : this._col - 1], startPoint, { endNodeX, endNodeY })//左下
            this.setNodeInfo(this._map[startPoint.x + 1 < this._volume ? startPoint.x + 1 : this._volume - 1][startPoint.y + 1 < this._col ? startPoint.y + 1 : this._col - 1], startPoint, { endNodeX, endNodeY })//右下
            //根据f值排序 降序排序
            this._openList.sort((a, b) => b.f - a.f)
            let endPoint = this._openList[this._openList.length - 1]
            this._openList.splice(this._openList.length - 1, 1)
            // 从开放列表中取出f值最小的节点作为当前节点
            this._closeList.push(endPoint)
            // 如果当前节点不是终点 则继续while循环
            if (startPoint.x !== endNodeX && startPoint.y !== endNodeY) {
                startPoint = endPoint
            }
            else {
                // 如果当前节点是终点 则返回路径
                let path: AStartNode[] = []
                let current: AStartNode = endPoint
                while (current.parent !== null) {
                    path.push(current)
                    current = current.parent
                }
                path.push(current)
                path.reverse()
                return path
            }
        }
    }
    /**
     * 设置节点的信息，包括父节点、g值、h值和f值 要在这个方法里完成openList的筛选和添加
     * @param node 要设置信息的节点
     * @param parent 节点的父节点
     * @param param2 包含终点坐标的对象
     * @returns 设置了信息的节点
     */
    setNodeInfo(node: AStartNode, parent: AStartNode, { endNodeX, endNodeY }: { endNodeX: number, endNodeY: number }) {
        // 如果节点不是可走状态 或者 节点已经在开放列表中 则直接返回
        if (node.type !== AStartNodeStatus.Walk || this._openList.includes(node)) {
            console.log('这个节点是障碍物,或者已经在开放列表中')
            return
        }
        if ((node.x > parent.x && node.y === parent.y)) {
            node.g = parent.g + 1
        } else if (node.x === parent.x && node.y > parent.y) {
            node.g = parent.g + 1
        } else if (node.x < parent.x && node.y === parent.y) {
            node.g = parent.g + 1
        } else if (node.x === parent.x && node.y < parent.y) {
            node.g = parent.g + 1
        } else if (node.x > parent.x && node.y > parent.y) {
            node.g = parent.g + 1.4
        } else if (node.x < parent.x && node.y < parent.y) {
            node.g = parent.g + 1.4
        } else if (node.x < parent.x && node.y > parent.y) {
            node.g = parent.g + 1.4
        } else if (node.x > parent.x && node.y < parent.y) {
            node.g = parent.g + 1.4
        }
        node.parent = parent
        node.h = Math.abs(node.x - endNodeX) + Math.abs(node.y - endNodeY)
        node.f = node.g + node.h
        this._openList.push(node)
    }

    public clear() {
        this._openList = []
        this._closeList = []
    }
}