System.register(["cc", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cclegacy, Composite, NodeStatus, btclass, _dec, _class, Selector;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_) {
      Composite = _unresolved_.Composite;
      NodeStatus = _unresolved_.NodeStatus;
    }, function (_unresolved_2) {
      btclass = _unresolved_2.btclass;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "c74d0JxBJVAPo3We+hUhI4x", "Selector", undefined);

      _export("default", Selector = (_dec = btclass("Selector"), _dec(_class = class Selector extends Composite {
        onStart() {
          super.onStart();
          this.index = 0;
        }

        canExecute() {
          return this.index < this.children.length && this.status !== NodeStatus.Success;
        }

        onChildExecuted(status, _) {
          switch (status) {
            case NodeStatus.Success:
              this.status = NodeStatus.Success;
              break;

            case NodeStatus.Failure:
              this.index++;

              if (this.index >= this.children.length) {
                this.status = NodeStatus.Failure;
              } else {
                this.status = NodeStatus.Running;
              }

              break;

            case NodeStatus.Running:
              this.status = NodeStatus.Running;
              break;

            default:
              break;
          }
        }

        onConditionalAbort(index) {
          this.index = index;
          this.status = NodeStatus.Inactive;
        }

      }) || _class));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=2793b0a7d87ba82fa578d538b55cebcbdda49fa2.js.map