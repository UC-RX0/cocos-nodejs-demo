System.register(["cc", "__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cclegacy, NodeStatus, Node;

  _export("Node", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_) {
      NodeStatus = _unresolved_.NodeStatus;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "c7097+9bgFBfqhGIY3upeDx", "Node", undefined);

      _export("Node", Node = class Node {
        constructor() {
          // 从json文件得到的节点数据
          this.data = {};
          this._status = NodeStatus.Inactive;
        }

        get status() {
          return this._status;
        }

        set status(newStatus) {
          this._status = newStatus;
        }

        onStart() {
          this.status = NodeStatus.Running;
        }

        onUpdate() {
          return NodeStatus.Failure;
        }

        onEnd() {
          this.status = NodeStatus.Inactive;
        }

      });

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=c362580b44843bbb697c45eac9f749d3fac87430.js.map