export const codingProblemsData = [
    {
        id: 'code_1',
        title: 'Two Sum',
        subject: 'DSA',
        difficulty: 'easy',
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
        constraints: '• 2 <= nums.length <= 10^4\n• -10^9 <= nums[i] <= 10^9\n• -10^9 <= target <= 10^9\n• Only one valid answer exists.',
        expectedApproach: 'Use a Hash Map to store complement values `(target - nums[i]) -> index`. This reduces time complexity from brute force O(n²) to O(n) with O(n) space complexity.',
        solution: `// Java Solution - O(n) Time, O(n) Space
import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}`,
        compilerUrl: 'https://www.jdoodle.com/online-java-compiler/'
    },
    {
        id: 'code_2',
        title: 'Reverse a Linked List',
        subject: 'DSA',
        difficulty: 'easy',
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        input: 'head = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        example: 'Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]',
        constraints: '• The number of nodes in the list is the range [0, 5000].\n• -5000 <= Node.val <= 5000',
        expectedApproach: 'Iterative approach: Maintain three pointers (`prev = null`, `curr = head`, `next = null`). In each step, save `curr.next`, redirect `curr.next` to `prev`, then advance `prev` and `curr`.',
        solution: `// Java Solution - O(n) Time, O(1) Space
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
        compilerUrl: 'https://www.jdoodle.com/online-java-compiler/'
    },
    {
        id: 'code_3',
        title: 'LRU Cache (Design Pattern & DS)',
        subject: 'OOP',
        difficulty: 'medium',
        description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement LRUCache with `get(key)` and `put(key, value)` both running in O(1) average time complexity.',
        input: 'LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); get(2);',
        output: '[null, null, null, 1, null, -1]',
        example: 'LRUCache lRUCache = new LRUCache(2);\nlRUCache.put(1, 1); // cache is {1=1}\nlRUCache.put(2, 2); // cache is {1=1, 2=2}\nlRUCache.get(1);    // return 1\nlRUCache.put(3, 3); // LRU key 2 evicted, cache is {1=1, 3=3}\nlRUCache.get(2);    // returns -1 (not found)',
        constraints: '• 1 <= capacity <= 3000\n• 0 <= key <= 10^4\n• 0 <= value <= 10^5\n• At most 2 * 10^5 calls will be made to get and put.',
        expectedApproach: 'Combine a Doubly Linked List (for O(1) node addition to head and removal from tail) with a Hash Map (for O(1) key-to-node lookup).',
        solution: `// Java Solution - O(1) Get and Put
import java.util.HashMap;
import java.util.Map;

class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }
    
    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insertToHead(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            map.remove(tail.prev.key);
            remove(tail.prev);
        }
        Node newNode = new Node(key, value);
        insertToHead(newNode);
        map.put(key, newNode);
    }
    
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void insertToHead(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}`,
        compilerUrl: 'https://www.jdoodle.com/online-java-compiler/'
    },
    {
        id: 'code_4',
        title: 'Thread-Safe Singleton Pattern',
        subject: 'Java',
        difficulty: 'medium',
        description: 'Implement a thread-safe Singleton design pattern in Java using the Double-Checked Locking (DCL) principle with volatile modifier.',
        input: 'Concurrent calls to Singleton.getInstance()',
        output: 'Single unique instance guaranteed across all threads',
        example: 'Singleton s1 = Singleton.getInstance();\nSingleton s2 = Singleton.getInstance();\nassert(s1 == s2);',
        constraints: '• High concurrency scenario\n• Lazy initialization required\n• Minimal synchronization overhead',
        expectedApproach: 'Use a private constructor, a private static volatile instance variable, and synchronize only during initial instantiation with a double-check to prevent race conditions.',
        solution: `// Java Double-Checked Locking Singleton
public class Singleton {
    // volatile prevents instruction reordering
    private static volatile Singleton instance;

    // Private constructor prevents instantiation
    private Singleton() {
        if (instance != null) {
            throw new RuntimeException("Use getInstance() method to create");
        }
    }

    public static Singleton getInstance() {
        if (instance == null) { // First check (no locking overhead after init)
            synchronized (Singleton.class) {
                if (instance == null) { // Second check under lock
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}`,
        compilerUrl: 'https://www.jdoodle.com/online-java-compiler/'
    },
    {
        id: 'code_5',
        title: 'Detect Cycle in a Directed Graph',
        subject: 'DSA',
        difficulty: 'hard',
        description: 'Given a directed graph represented as an adjacency list, return true if there is a cycle in the graph, otherwise return false.',
        input: 'V = 4, edges = [[0, 1], [1, 2], [2, 3], [3, 1]]',
        output: 'true',
        example: 'Node 1 -> 2 -> 3 -> 1 forms a cycle. Output: true',
        constraints: '• 1 <= V <= 10^5\n• 0 <= E <= 10^5',
        expectedApproach: 'Use DFS with recursion stack tracking (or Kahn\'s Algorithm with in-degrees). If an already visited node is currently in the active recursion stack, a back-edge and cycle exists.',
        solution: `// Java DFS Cycle Detection
import java.util.*;

public class GraphCycle {
    public boolean hasCycle(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        boolean[] inStack = new boolean[V];

        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (dfs(i, adj, visited, inStack)) return true;
            }
        }
        return false;
    }

    private boolean dfs(int u, List<List<Integer>> adj, boolean[] visited, boolean[] inStack) {
        visited[u] = true;
        inStack[u] = true;

        for (int v : adj.get(u)) {
            if (!visited[v] && dfs(v, adj, visited, inStack)) return true;
            else if (inStack[v]) return true; // Back-edge found!
        }

        inStack[u] = false; // backtrack
        return false;
    }
}`,
        compilerUrl: 'https://www.jdoodle.com/online-java-compiler/'
    }
];
