System.register(["cc", "__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cclegacy, Composite, nodeClsMap, buildTree, postOrder, BehaviorSource;

  _export("BehaviorSource", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_) {
      Composite = _unresolved_.Composite;
    }, function (_unresolved_2) {
      nodeClsMap = _unresolved_2.nodeClsMap;
    }, function (_unresolved_3) {
      buildTree = _unresolved_3.buildTree;
      postOrder = _unresolved_3.postOrder;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "cdad3Xyg2ZFT6lYWByTPKv6", "BehaviorSource", undefined);

      /***
       * 主要用来解析json文件生成行为树对象
       */
      _export("BehaviorSource", BehaviorSource = class BehaviorSource {
        constructor() {
          this.rootNode = null;
        }

        parse(content = {}) {
          try {
            // root节点已存在，代表已经成功解析过
            if (this.rootNode) {
              return;
            }

            const nodes = content.nodes;

            if (!(nodes != null && nodes.length)) {
              throw new Error("节点数据不存在");
            }

            const nodesMap = new Map();

            for (const node of nodes) {
              nodesMap.set(node.id, node);
            }
            /***
             *  建树（数据层面）
             */


            const root = buildTree(nodes);

            if (!root) {
              throw new Error("根节点不存在");
            }
            /***
             *  建树（对象层面）
             */


            const postOrderNodes = postOrder(root); // 节点id和对象的映射

            const nodeIdInstanceMap = new Map(); // 倒序遍历

            for (let i = 0; i < postOrderNodes.length; i++) {
              var _node$children;

              const node = postOrderNodes[i]; // 获取节点对应的class

              const cls = nodeClsMap.get(node.type);

              if (!cls) {
                throw new Error("节点class不存在");
              } // 实例化


              const instance = new cls();
              const nodeData = nodesMap.get(node.id); // 保存node data

              instance.data = nodeData; // composite设置设置abortType

              if (instance instanceof Composite) {
                instance.abortType = nodeData.abortType;
              } // 父节点


              if ((_node$children = node.children) != null && _node$children.length) {
                // 倒序遍历可以保证子节点的初始化在父节点之前
                const children = node.children.map(child => nodeIdInstanceMap.get(child.id));
                instance.setChildren(children);
              }

              nodeIdInstanceMap.set(node.id, instance); // 最后一项是根节点

              if (i === postOrderNodes.length - 1) {
                this.rootNode = instance;
              }
            }
          } catch (e) {
            console.error(e);
          }
        }

      });

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=e41c354732a97b48cf89089ab716271a6768817c.js.map