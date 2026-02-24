System.register(["cc", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cclegacy, Decorator, NodeStatus, btclass, _dec, _class, UntilSuccess;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_) {
      Decorator = _unresolved_.Decorator;
      NodeStatus = _unresolved_.NodeStatus;
    }, function (_unresolved_2) {
      btclass = _unresolved_2.btclass;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "1e0f5tAZdlDVpxkqa2vPyjN", "UntilSuccess", undefined);

      _export("UntilSuccess", UntilSuccess = (_dec = btclass("UntilSuccess"), _dec(_class = class UntilSuccess extends Decorator {
        canExecute() {
          return this.status == NodeStatus.Inactive || this.status == NodeStatus.Failure;
        }

        onChildExecuted(status, _) {
          this.status = status;
        }

      }) || _class));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=e51af1ac93baa0002cda36887712f6d8651506be.js.map