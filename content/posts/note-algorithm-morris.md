---
title: "Algorithm Notes: Morris"
date: "2021-01-01"
excerpt: ""
kind: post
tags:
  - Algorithm Notes
  - Study Notes
comments: true
---

### Special Topic: Morris Algorithm Morris 算法 在二叉树遍历问题的应用

**在DFS前中后序遍历二叉树中，相比使用栈（递归或者非递归使用了自定义的栈）的思想（空间换时间）来说，Morris算法是一种使用时间换取空间的算法。**

#### Morris 算法：

与递归和使用栈空间遍历的思想不同，Morris 算法使用二叉树中的叶节点的right指针来保存后面将要访问的节点的信息，当这个right指针使用完成之后，再将它置为null，但是在访问过程中有些节点会访问两次，所以与递归的空间换时间的思路不同，Morris则是使用时间换空间的思想。


1. 用 Morris 算法进行中序遍历(Inorder Traversal)：

思路

如果当前节点的左孩子为空，则输出当前节点并将其右孩子作为当前节点。

如果当前节点的左孩子不为空，在当前节点的左子树中找到当前节点在中序遍历下的前驱节点。

如果前驱节点的右孩子为空，将它的右孩子设置为当前节点。当前节点更新为当前节点的左孩子。

如果前驱节点的右孩子为当前节点，将它的右孩子重新设为空（恢复树的形状）。输出当前节点。当前节点更新为当前节点的右孩子。

重复1、2两步直到当前节点为空。

```python
class Solution:
    """
    @param root: A Tree
    @return: Inorder in ArrayList which contains node values.
    """
    def inorderTraversal(self, root):
        nums = []
        cur = None
    
        while root:
            if root.left:
                cur = root.left
                while cur.right and cur.right != root:
                    cur = cur.right
                
                if cur.right == root:
                    nums.append(root.val)
                    cur.right = None
                    root = root.right
                else:
                    cur.right = root
                    root = root.left
            else:
                nums.append(root.val)
                root = root.right
                
        return nums
        

```

2. 用 Morris 算法实现先序遍历(Preorder Traversal):

思路

如果当前节点的左孩子为空，则输出当前节点并将其右孩子作为当前节点
。
如果当前节点的左孩子不为空，在当前节点的左子树中找到当前节点在中序遍历下的前驱节点。

如果前驱节点的右孩子为空，将它的右孩子设置为当前节点。输出当前节点（与中序遍历唯一一点不同）。当前节点更新为当前节点的左孩子。

如果前驱节点的右孩子为当前节点，将它的右孩子重新设为空。当前节点更新为当前节点的右孩子。

重复1、2两步直到当前节点为空。

```python
class Solution:
    """
    @param root: A Tree
    @return: Preorder in ArrayList which contains node values.
    """
    def preorderTraversal(self, root):
        nums = []
        cur = None
        
        while root:
            if root.left:
                cur = root.left
                while cur.right and cur.right != root:
                    cur = cur.right
                if cur.right == root:
                    cur.right = None
                    root = root.right
                else:
                    nums.append(root.val)
                    cur.right = root
                    root = root.left
            else:
                nums.append(root.val)
                root = root.right
                
        return nums

```

3. 用 Morris 算法实现后序遍历(Postorder Traversal)

后序遍历其实可以看作是和前序遍历左右对称的，此处，我们同样可以利用这个性质，基于前序遍历的算法，可以很快得到后序遍历的结果。我们只需要将前序遍历中所有的左孩子和右孩子进行交换就可以了。

```python
class Solution:
    """
    @param root: A Tree
    @return: Postorder in ArrayList which contains node values.
    """
    def postorderTraversal(self, root):
        nums = []
        cur = None

        while root:
            if root.right != None:
                cur = root.right
                while cur.left and cur.left != root:
                    cur = cur.left
                if cur.left == root:
                    cur.left = None
                    root = root.left
                else:
                    nums.append(root.val)
                    cur.left = root
                    root = root.right
            else:
                nums.append(root.val)
                root = root.left
                
        nums.reverse()
        return nums
        
```


练习题目：

[LeetCode-144 Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)

[LeetCode-145 Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)

[LeetCode-94 Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
