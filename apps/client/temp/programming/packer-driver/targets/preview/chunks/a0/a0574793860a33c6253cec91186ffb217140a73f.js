System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, postOrder, buildTree, bfsCcNode, preOrder, deepClone;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "9c268QP+79AUoIUYNnvYVf4", "utils", undefined); // 树状节点形式


      /***
       * N叉树的倒序遍历
       */
      _export("postOrder", postOrder = function postOrder(root) {
        if (!root) {
          return [];
        }

        var stack = [root];
        var stack2 = [];
        var result = [];

        while (stack.length) {
          var node = stack.pop();
          stack2.push(node);

          for (var i = 0; i < node.children.length; i++) {
            stack.push(node.children[i]);
          }
        }

        while (stack2.length) {
          result.push(stack2.pop());
        }

        return result;
      });
      /**
       * 数组转树，返回根节点
       * @param nodes
       * @returns root
       */


      _export("buildTree", buildTree = _nodes => {
        // 防止修改有原数据
        var nodes = deepClone(_nodes);
        var nodeMap = new Map();
        var root = null; // 记录id和node数据的映射

        for (var node of nodes) {
          if (node.isRoot) {
            root = node;
          }

          nodeMap.set(node.id, node);
        } // 没有根节点


        if (!root) {
          return null;
        } // 把children中的Id换成真正的node数据


        for (var _node of nodes) {
          _node.children = _node.children.map(childId => nodeMap.get(childId));
        } //  返回根节点


        return root;
      });
      /***
       * BFS开始
       * 从当前节点开始层序遍历
       * 找不到再从scene节点开始层序遍历
       * dirtyNode代表需要跳过的节点，避免scene场景重复遍历curNode
       */


      _export("bfsCcNode", bfsCcNode = (root, targetUuid, dirtyUuid) => {
        var target = null;
        var queue = [root]; // 给while循环起名

        myWhile: while (queue.length) {
          var len = queue.length;

          for (var i = 0; i < len; i++) {
            var item = queue.pop();
            var uuid = item.uuid;

            if (uuid === targetUuid) {
              target = item; // 找到目标，直接退出while循环

              break myWhile;
            }

            for (var j = 0; j < item.children.length; j++) {
              var child = item.children[j]; // 跳过已经遍历过的节点

              if (dirtyUuid && child.uuid === dirtyUuid) {
                continue;
              }

              queue.unshift(child);
            }
          }
        }

        return target;
      });

      _export("preOrder", preOrder = function preOrder(root) {
        if (!root) {
          return [];
        }

        var stack = [root];
        var result = [];

        while (stack.length) {
          var item = stack.pop();

          for (var i = item.children.length - 1; i >= 0; i--) {
            stack.push(item.children[i]);
          }

          result.push(item);
        }

        return result;
      });
      /***
       * 深克隆
       */


      _export("deepClone", deepClone = obj => {
        if (typeof obj !== "object" || obj === null) {
          return obj;
        }

        var res = Array.isArray(obj) ? [] : {};

        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res[key] = deepClone(obj[key]);
          }
        }

        return res;
      });

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=a0574793860a33c6253cec91186ffb217140a73f.js.map