System.register(["cc", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cclegacy, AbortType, ParentNode, Composite;

  _export("Composite", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_) {
      AbortType = _unresolved_.AbortType;
    }, function (_unresolved_2) {
      ParentNode = _unresolved_2.ParentNode;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "85225uNPipBY4GxoKEmbBl6", "Composite", undefined);

      _export("Composite", Composite = class Composite extends ParentNode {
        constructor(...args) {
          super(...args);
          this.abortType = AbortType.None;
        }

      });

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=457d31d51956330eb2d653230ba425b3b8ecb611.js.map