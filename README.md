# Data Structures Visualiser

This guide provides an overview of the basic operations for different data structures: simple linked list (SLL), binary heap, binary search tree (BST), and hash table.

## [Simple Linked List (SLL)](https://www.geeksforgeeks.org/data-structures/linked-list/?ref=lbp)

### Operations and Complexity:

1. **Insertion**: 
   - At the beginning: O(1)
   - At the end: O(n)
   - At a specified position: O(n)

2. **Deletion**: 
   - By value: O(n)
   - By position: O(n)

3. **Traversal**: O(n)

4. **Search**: O(n)

5. **Concatenation**: O(1) if maintaining a reference to the tail of the first list, otherwise O(n).

6. **Reversal**: O(n)

## [Binary Heap](https://www.geeksforgeeks.org/binary-heap/)

### Operations and Complexity:

1. **Insertion**: O(log n) 

2. **Deletion**: O(log n) 

3. **Heapify**: O(n)

4. **Extract Minimum/Maximum**: O(log n) 

5. **Merge**: O(n)

## [Binary Search Tree (BST)](https://www.geeksforgeeks.org/binary-search-tree-data-structure/)

### Operations and Complexity:

1. **Insertion**: 
   - Average case: O(log n)
   - Worst case (unbalanced tree): O(n)

2. **Deletion**: 
   - Average case: O(log n)
   - Worst case (unbalanced tree): O(n)

3. **Traversal**: 
   - In-order: O(n)
   - Pre-order: O(n)
   - Post-order: O(n)

4. **Search**: 
   - Average case: O(log n)
   - Worst case (unbalanced tree): O(n)

5. **Minimum/Maximum**: O(log n) for balanced trees, O(n) for unbalanced trees.

6. **Successor/Predecessor**: O(log n) for balanced trees, O(n) for unbalanced trees.

## [Hash Table](https://www.geeksforgeeks.org/hash-table-data-structure/)

### Operations and Complexity:

1. **Insertion**: 
   - Average case: O(1)
   - Worst case (due to collisions): O(n)

2. **Deletion**: 
   - Average case: O(1)
   - Worst case (due to collisions): O(n)

3. **Search**: 
   - Average case: O(1)
   - Worst case (due to collisions): O(n)

4. **Collision Resolution**: Depends on the method used (e.g., chaining, open addressing).

5. **Load Factor Management**: O(1) amortized for dynamic resizing.

6. **Resizing**: O(n) when resizing is triggered, but happens infrequently.

Each data structure has its own set of operations tailored to its specific characteristics and use cases, with complexities that should be considered when choosing the appropriate structure for a given problem.

