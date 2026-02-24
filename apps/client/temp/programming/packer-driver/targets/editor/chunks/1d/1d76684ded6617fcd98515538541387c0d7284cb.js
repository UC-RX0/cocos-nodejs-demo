System.register(["cc", "__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cclegacy, Node, ParentNode;

  _export("ParentNode", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_) {
      Node = _unresolved_.Node;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "3a225N9xWNI3Z0Zhf1KuSRw", "ParentNode", undefined);

      _export("ParentNode", ParentNode = class ParentNode extends Node {
        get index() {
          return this._index;
        }

        set index(data) {
          this._index = data;
        }

        constructor(children) {
          super();
          this.children = [];
          this._index = 0;
          this.children = children;
        }

        setChildren(children) {
          this.children = children;
        }

        onConditionalAbort(childIndex) {}

        decorate(status) {
          return status;
        } //并行节点的状态不由某个子节点状态决定，而是由多个共同决定，所以重新计算status


        overrideStatus(status) {
          return status;
        }

        canRunParallelChildren() {
          return false;
        }

        onChildStarted() {}

      });

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=1d76684ded6617fcd98515538541387c0d7284cb.js.map