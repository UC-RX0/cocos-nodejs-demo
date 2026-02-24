System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, NodeStatus, AbortType;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "0f03bNBXjlGcrcSaTEmrIPP", "index", undefined);

      _export("NodeStatus", NodeStatus = /*#__PURE__*/function (NodeStatus) {
        NodeStatus[NodeStatus["Inactive"] = 0] = "Inactive";
        NodeStatus[NodeStatus["Running"] = 1] = "Running";
        NodeStatus[NodeStatus["Success"] = 2] = "Success";
        NodeStatus[NodeStatus["Failure"] = 3] = "Failure";
        return NodeStatus;
      }({}));

      _export("AbortType", AbortType = /*#__PURE__*/function (AbortType) {
        AbortType[AbortType["None"] = 0] = "None";
        AbortType[AbortType["LowerPriority"] = 1] = "LowerPriority";
        AbortType[AbortType["Self"] = 2] = "Self";
        AbortType[AbortType["Both"] = 3] = "Both";
        return AbortType;
      }({}));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=281aaa76f3df45433ebcbc1720070b2f9f864e35.js.map