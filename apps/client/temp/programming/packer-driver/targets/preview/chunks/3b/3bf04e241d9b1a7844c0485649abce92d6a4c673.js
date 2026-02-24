System.register(["cc", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cclegacy, Decorator, NodeStatus, btclass, _dec, _class, Inverter;

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
      _cclegacy._RF.push({}, "09372ttMVdF9ZgJIXwFNv9u", "Inverter", undefined);

      _export("Inverter", Inverter = (_dec = btclass("Inverter"), _dec(_class = class Inverter extends Decorator {
        canExecute() {
          return this.status === NodeStatus.Inactive || this.status === NodeStatus.Running;
        }

        onChildExecuted(status, _) {
          this.status = status;
        }

        decorate(status) {
          switch (status) {
            case NodeStatus.Success:
              return NodeStatus.Failure;

            case NodeStatus.Failure:
              return NodeStatus.Success;

            default:
              return status;
          }
        }

      }) || _class));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=3bf04e241d9b1a7844c0485649abce92d6a4c673.js.map