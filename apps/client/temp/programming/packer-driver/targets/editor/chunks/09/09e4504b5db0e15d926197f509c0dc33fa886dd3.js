System.register(["cc", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cclegacy, Composite, NodeStatus, btclass, _dec, _class, Parallel;

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
      _cclegacy._RF.push({}, "f641davAXBHlqSAQpQZTRnF", "Parallel", undefined);

      _export("default", Parallel = (_dec = btclass("Parallel"), _dec(_class = class Parallel extends Composite {
        constructor(...args) {
          super(...args);
          this.executionStatus = [];
        }

        onStart() {
          super.onStart();
          this.index = 0;
          this.executionStatus = this.children.map(() => NodeStatus.Inactive);
        }

        canRunParallelChildren() {
          return true;
        }

        onChildStarted() {
          this.executionStatus[this.index] = NodeStatus.Running;
          this.index++;
        }

        canExecute() {
          return this.index < this.children.length;
        }

        onChildExecuted(status, index) {
          this.executionStatus[index] = status;
        }

        overrideStatus(_) {
          let childrenComplete = true;

          for (let i = 0; i < this.executionStatus.length; i++) {
            if (this.executionStatus[i] == NodeStatus.Running) {
              childrenComplete = false;
            } else if (this.executionStatus[i] == NodeStatus.Failure) {
              return NodeStatus.Failure;
            }
          }

          return childrenComplete ? NodeStatus.Success : NodeStatus.Running;
        }

        onConditionalAbort(childIndex) {
          this.index = 0;
          this.executionStatus = this.executionStatus.map(() => NodeStatus.Inactive);
        }

      }) || _class));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=09e4504b5db0e15d926197f509c0dc33fa886dd3.js.map