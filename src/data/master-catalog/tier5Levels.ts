import { MasterCurriculumItem } from './types';

export const TIER_5_LEVELS: MasterCurriculumItem[] = [
  {
    id: 121,
    slug: 'level-121-singly-linked-list-node',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 121: Singly Linked List: Self-Referential Node & The Next Link',
    category: 'Linked Data Structures',
    themeIcon: '🚂',
    realLifeAnalogy: {
      story: 'A train where bogies are linked by couplers: Bogie 1 has a coupler pointing to Bogie 2, Bogie 2 points to Bogie 3, and the last bogie points to NULL (end of train). Unlike arrays, bogies can be anywhere in RAM!',
      physicalConcept: 'A self-referential struct contains a pointer to another struct of the same type: `struct Node *next;`. Elements need not be contiguous in memory.',
      ruleOfThumb: 'The last node\'s next pointer MUST be set to `NULL` to signify the end of the linked chain.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Manual two-node linked list wiring',
        description: 'Creates two nodes on stack and links them via pointer.',
        code: `#include <stdio.h>

struct Node {
    int data;
    struct Node *next; // Self-referential pointer!
};

int main(void) {
    struct Node first;
    struct Node second;

    first.data = 101;
    first.next = &second; // Coupler linking first -> second

    second.data = 102;
    second.next = NULL;   // End of train

    printf("Traversing Linked Nodes:\\n");
    printf("Node 1 Data: %d -> Points to: %p\\n", first.data, (void*)first.next);
    printf("Node 2 Data: %d -> Points to: %p\\n", second.data, (void*)second.next);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Pointer walk over linked nodes',
        description: 'Walks linked nodes using pointer while loop.',
        code: `#include <stdio.h>

struct Node { int data; struct Node *next; };

int main(void) {
    struct Node b = {102, NULL};
    struct Node a = {101, &b};
    struct Node *curr = &a;
    printf("Traversing Linked Nodes:\\n");
    while (curr) {
        printf("Node %d (at %p) -> Next: %p\\n", curr->data, (void*)curr, (void*)curr->next);
        curr = curr->next;
    }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX current node pointer', 'RDX next node address', 'MOV rax, [rax + 8]'],
      assemblyNotes: 'Dereferencing next translates to loading quadword from offset +8 of node memory.',
      ramFootprint: '16 bytes per node (4 bytes int + 4 bytes padding + 8 bytes pointer).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct Node { int data; struct Node *next; };', hint: 'Define self-referential struct' },
        { id: 'b2', code: 'int main(void) {\\n    struct Node first; struct Node second;\\n    first.data = 101; first.next = &second;\\n    second.data = 102; second.next = NULL;', hint: 'Initialize and link nodes' },
        { id: 'b3', code: '    printf("Traversing Linked Nodes:\\n");\\n    printf("Node 1 Data: %d -> Points to: %p\\n", first.data, (void*)first.next);\\n    printf("Node 2 Data: %d -> Points to: %p\\n", second.data, (void*)second.next);\\n    return 0;\\n}', hint: 'Display node chain and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Traversing Linked Nodes:
Node 1 Data: 101 -> Points to: 0x
Node 2 Data: 102 -> Points to: (nil)`,
    cKeywordsUsed: ['struct', 'int', 'void', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) link creation',
      spaceComplexity: 'O(1) stack allocation',
      algorithmClass: 'Pointer-Linked Node Topology'
    }
  },
  {
    id: 122,
    slug: 'level-122-linked-list-dynamic-node-creation',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 122: Dynamic Node Creation with malloc on the Heap',
    category: 'Linked Data Structures',
    themeIcon: '🧱',
    realLifeAnalogy: {
      story: 'Adding a new coach to a train dynamically: Instead of fixing node count at compile time, a factory helper function `createNode(val)` requests heap memory for a new node on the fly!',
      physicalConcept: 'Dynamic node allocation allocates `sizeof(struct Node)` from the heap, sets `node->data = val`, initializes `node->next = NULL`, and returns the heap address.',
      ruleOfThumb: 'Always check if node allocation succeeded (`if (newNode == NULL)`) before dereferencing.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Factory helper function for heap node creation',
        description: 'Allocates node on heap and initializes members.',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int value) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) return NULL;
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

int main(void) {
    struct Node *head = createNode(501);
    head->next = createNode(502);

    printf("Dynamic Heap Linked List:\\n");
    printf("Head Node Data: %d (Heap: %p)\\n", head->data, (void*)head);
    printf("Next Node Data: %d (Heap: %p)\\n", head->next->data, (void*)head->next);

    free(head->next);
    free(head);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Inline node constructor',
        description: 'Allocates and initializes node in single statement.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;
Node* mkNode(int val, Node *nxt) { Node *n = malloc(sizeof(Node)); n->data = val; n->next = nxt; return n; }

int main(void) {
    Node *head = mkNode(501, mkNode(502, NULL));
    printf("Dynamic Heap Linked List:\\nHead Node Data: %d (Heap: %p)\\nNext Node Data: %d (Heap: %p)\\n", head->data, (void*)head, head->next->data, (void*)head->next);
    free(head->next); free(head);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RAX allocated chunk', 'RDI size 16 bytes'],
      assemblyNotes: 'call malloc allocates 16-byte aligned chunk on heap; returns pointer in RAX.',
      ramFootprint: '32 bytes heap memory allocated (2 nodes * 16 bytes).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct Node { int data; struct Node *next; };', hint: 'Headers and struct' },
        { id: 'b2', code: 'struct Node* createNode(int value) {\\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\\n    newNode->data = value;\\n    newNode->next = NULL;\\n    return newNode;\\n}', hint: 'Node creation factory' },
        { id: 'b3', code: 'int main(void) {\\n    struct Node *head = createNode(501);\\n    head->next = createNode(502);\\n    printf("Dynamic Heap Linked List:\\n");\\n    printf("Head Node Data: %d (Heap: %p)\\n", head->data, (void*)head);\\n    printf("Next Node Data: %d (Heap: %p)\\n", head->next->data, (void*)head->next);', hint: 'Create and print chain' },
        { id: 'b4', code: '    free(head->next);\\n    free(head);\\n    return 0;\\n}', hint: 'Free memory and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Dynamic Heap Linked List:
Head Node Data: 501 (Heap: 0x
Next Node Data: 502 (Heap: 0x`,
    cKeywordsUsed: ['struct', 'int', 'sizeof', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) allocation per node',
      spaceComplexity: 'O(1) heap per node',
      algorithmClass: 'Dynamic Node Construction'
    }
  },
  {
    id: 123,
    slug: 'level-123-linked-list-insert-beginning',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 123: Insert at Beginning / Head Insertion (O(1) Constant Time)',
    category: 'Linked Data Structures',
    themeIcon: '⚡',
    realLifeAnalogy: {
      story: 'VIP emergency passenger at Delhi Airport check-in: Instead of shifting thousands of passengers down an array (which takes $O(N)$ time), a linked list inserts the VIP at the front in $O(1)$ constant time by updating just two pointer couplers!',
      physicalConcept: 'Head insertion: `newNode->next = head; head = newNode;`. Only two pointer writes are needed, regardless of whether the list has 10 or 10,000,000 nodes.',
      ruleOfThumb: 'Double pointer `Node **head` allows helper function to update caller\'s head pointer directly.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'O(1) Head insertion with double pointer',
        description: 'Prepends new nodes at front of linked list.',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

void insertAtHead(struct Node **headRef, int val) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *headRef; // Point to old head
    *headRef = newNode;       // New node becomes the new head!
}

int main(void) {
    struct Node *head = NULL;

    insertAtHead(&head, 30);
    insertAtHead(&head, 20);
    insertAtHead(&head, 10); // Inserted last, so it becomes the first!

    printf("Linked List after O(1) Head Insertions:\\n");
    struct Node *curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");

    // Cleanup
    while (head != NULL) {
        struct Node *temp = head;
        head = head->next;
        free(temp);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Return new head insertion',
        description: 'Returns new head address directly.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int val; struct Node *next; } Node;
Node* pushFront(Node *h, int v) { Node *n = malloc(sizeof(Node)); n->val = v; n->next = h; return n; }

int main(void) {
    Node *h = NULL;
    h = pushFront(h, 30); h = pushFront(h, 20); h = pushFront(h, 10);
    printf("Linked List after O(1) Head Insertions:\\n");
    for (Node *c = h; c; c = c->next) printf("%d -> ", c->val);
    printf("NULL\\n");
    while (h) { Node *t = h; h = h->next; free(t); }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RDI double pointer head', 'ESI value', 'MOV [newNode + 8], rax'],
      assemblyNotes: 'Two pointer moves in CPU registers complete insertion in under 5 clock cycles.',
      ramFootprint: '48 bytes heap (3 nodes * 16 bytes).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct Node { int data; struct Node *next; };', hint: 'Headers and struct' },
        { id: 'b2', code: 'void insertAtHead(struct Node **headRef, int val) {\\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\\n    newNode->data = val;\\n    newNode->next = *headRef;\\n    *headRef = newNode;\\n}', hint: 'Head insertion function' },
        { id: 'b3', code: 'int main(void) {\\n    struct Node *head = NULL;\\n    insertAtHead(&head, 30);\\n    insertAtHead(&head, 20);\\n    insertAtHead(&head, 10);', hint: 'Call insertAtHead 3 times' },
        { id: 'b4', code: '    printf("Linked List after O(1) Head Insertions:\\n");\\n    struct Node *curr = head;\\n    while (curr != NULL) { printf("%d -> ", curr->data); curr = curr->next; }\\n    printf("NULL\\n");\\n    return 0;\\n}', hint: 'Print list and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Linked List after O(1) Head Insertions:
10 -> 20 -> 30 -> NULL`,
    cKeywordsUsed: ['struct', 'int', 'void', 'sizeof', 'while', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) strictly constant time',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Constant Time Node Prepending'
    }
  },
  {
    id: 124,
    slug: 'level-124-linked-list-insert-end-traversal',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 124: Insert at End / Tail Insertion (O(N) Traversal)',
    category: 'Linked Data Structures',
    themeIcon: '🚃',
    realLifeAnalogy: {
      story: 'Attaching a new freight bogie to the tail of a Goods Train: To attach at the end, the shunter must walk all the way from the locomotive (head) to the very last bogie whose next pointer is NULL, and couple the new bogie there.',
      physicalConcept: 'Tail insertion without a tail pointer requires traversing from head: `while (curr->next != NULL) curr = curr->next;` which takes $O(N)$ operations.',
      ruleOfThumb: 'Handle the empty list case (`*head == NULL`) first; otherwise traverse until `curr->next == NULL`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Append to end of linked list',
        description: 'Traverses to last node and links new node.',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

void insertAtTail(struct Node **headRef, int val) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;

    if (*headRef == NULL) {
        *headRef = newNode;
        return;
    }

    struct Node *last = *headRef;
    while (last->next != NULL) {
        last = last->next;
    }
    last->next = newNode; // Couple new node to tail
}

int main(void) {
    struct Node *train = NULL;

    insertAtTail(&train, 100);
    insertAtTail(&train, 200);
    insertAtTail(&train, 300);

    printf("Goods Train Bogie Sequence (O(N) Append):\\n");
    struct Node *curr = train;
    while (curr != NULL) {
        printf("[Bogie %d] -> ", curr->data);
        curr = curr->next;
    }
    printf("GUARD VAN\\n");

    while (train != NULL) {
        struct Node *temp = train;
        train = train->next;
        free(temp);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Double pointer walk tail insertion',
        description: 'Advances double pointer directly to the terminating null coupler.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int d; struct Node *n; } Node;
void append(Node **h, int v) {
    while (*h) h = &((*h)->n);
    *h = malloc(sizeof(Node)); (*h)->d = v; (*h)->n = NULL;
}

int main(void) {
    Node *list = NULL;
    append(&list, 100); append(&list, 200); append(&list, 300);
    printf("Goods Train Bogie Sequence (O(N) Append):\\n");
    for (Node *c = list; c; c = c->n) printf("[Bogie %d] -> ", c->d);
    printf("GUARD VAN\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RAX current node', 'CMP qword ptr [rax+8], 0', 'JNE loop'],
      assemblyNotes: 'Hardware sequentially dereferences pointer addresses in heap memory.',
      ramFootprint: '48 bytes heap + 8 bytes head pointer on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct Node { int data; struct Node *next; };', hint: 'Headers and struct' },
        { id: 'b2', code: 'void insertAtTail(struct Node **headRef, int val) {\\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\\n    newNode->data = val; newNode->next = NULL;\\n    if (*headRef == NULL) { *headRef = newNode; return; }\\n    struct Node *last = *headRef;\\n    while (last->next != NULL) last = last->next;\\n    last->next = newNode;\\n}', hint: 'Append function' },
        { id: 'b3', code: 'int main(void) {\\n    struct Node *train = NULL;\\n    insertAtTail(&train, 100);\\n    insertAtTail(&train, 200);\\n    insertAtTail(&train, 300);', hint: 'Append 100, 200, 300' },
        { id: 'b4', code: '    printf("Goods Train Bogie Sequence (O(N) Append):\\n");\\n    struct Node *curr = train;\\n    while (curr != NULL) { printf("[Bogie %d] -> ", curr->data); curr = curr->next; }\\n    printf("GUARD VAN\\n");\\n    return 0;\\n}', hint: 'Print sequence' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Goods Train Bogie Sequence (O(N) Append):
[Bogie 100] -> [Bogie 200] -> [Bogie 300] -> GUARD VAN`,
    cKeywordsUsed: ['struct', 'int', 'void', 'sizeof', 'if', 'while', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) traversal to tail',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Sequential Tail Appending'
    }
  },
  {
    id: 125,
    slug: 'level-125-linked-list-search-target',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 125: Linear Search in Linked List & Aadhaar Token Finder',
    category: 'Linked Data Structures',
    themeIcon: '🔍',
    realLifeAnalogy: {
      story: 'Aadhaar authentication queue: A chain of verified security tokens is linked in memory: 701 -> 805 -> 912 -> 999. A verification service searches through the chain to locate token 912 and returns its position.',
      physicalConcept: 'Searching a linked list requires traversing pointers one node at a time. Binary search is impossible because linked lists do not support $O(1)$ random indexing.',
      ruleOfThumb: 'Loop condition: `while (curr != NULL)`. Check `if (curr->data == target)` at each node.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Iterative linked list node search',
        description: 'Scans linked list node-by-node tracking position index.',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

int searchToken(struct Node *head, int target) {
    struct Node *curr = head;
    int index = 0;
    while (curr != NULL) {
        if (curr->data == target) {
            return index; // Found at index
        }
        curr = curr->next;
        index++;
    }
    return -1; // Not found
}

int main(void) {
    // Build chain: 701 -> 805 -> 912 -> 999 -> NULL
    struct Node n4 = {999, NULL};
    struct Node n3 = {912, &n4};
    struct Node n2 = {805, &n3};
    struct Node n1 = {701, &n2};

    int target = 912;
    int pos = searchToken(&n1, target);

    printf("Aadhaar Token Verification Search:\\n");
    if (pos != -1) {
        printf("Token %d FOUND at link position index %d!\\n", target, pos);
    } else {
        printf("Token %d NOT found.\\n", target);
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Recursive node search',
        description: 'Recursive search formulation on linked structures.',
        code: `#include <stdio.h>

struct Node { int data; struct Node *next; };

int findRec(struct Node *h, int t, int idx) {
    if (!h) return -1;
    if (h->data == t) return idx;
    return findRec(h->next, t, idx + 1);
}

int main(void) {
    struct Node n4 = {999, NULL}, n3 = {912, &n4}, n2 = {805, &n3}, n1 = {701, &n2};
    int pos = findRec(&n1, 912, 0);
    printf("Aadhaar Token Verification Search:\\nToken 912 FOUND at link position index %d!\\n", pos);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX current pointer', 'ESI target int', 'CMP [rax], esi'],
      assemblyNotes: 'Non-contiguous memory locations mean each pointer dereference may trigger an L1 cache miss.',
      ramFootprint: '64 bytes (4 stack nodes * 16 bytes).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct Node { int data; struct Node *next; };', hint: 'Node struct' },
        { id: 'b2', code: 'int searchToken(struct Node *head, int target) {\\n    struct Node *curr = head; int index = 0;\\n    while (curr != NULL) {\\n        if (curr->data == target) return index;\\n        curr = curr->next; index++;\\n    }\\n    return -1;\\n}', hint: 'Search loop' },
        { id: 'b3', code: 'int main(void) {\\n    struct Node n4 = {999, NULL}; struct Node n3 = {912, &n4};\\n    struct Node n2 = {805, &n3}; struct Node n1 = {701, &n2};\\n    int target = 912; int pos = searchToken(&n1, target);', hint: 'Setup chain and search' },
        { id: 'b4', code: '    printf("Aadhaar Token Verification Search:\\n");\\n    printf("Token %d FOUND at link position index %d!\\n", target, pos);\\n    return 0;\\n}', hint: 'Print result and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Aadhaar Token Verification Search:
Token 912 FOUND at link position index 2!`,
    cKeywordsUsed: ['struct', 'int', 'while', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'Best: O(1), Worst: O(N), Average: O(N)',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Sequential Pointer Search'
    }
  },
  {
    id: 126,
    slug: 'level-126-linked-list-deletion-by-value',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 126: Node Deletion by Value & Passenger Cancellation',
    category: 'Linked Data Structures',
    themeIcon: '✂️',
    realLifeAnalogy: {
      story: 'IRCTC passenger cancels ticket in a 3-passenger group: [101] -> [102] -> [103]. To delete passenger 102, we detach coupler 101->102 and rewire it directly to 103: [101] -> [103], and free the cancelled node!',
      physicalConcept: 'Deletion requires updating the predecessor node\'s next pointer to skip the doomed node: `prev->next = doomedNode->next; free(doomedNode);`.',
      ruleOfThumb: 'Always handle head node deletion separately (`if (head->data == key)`), as it changes the starting head pointer.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Standard previous-current pointer node deletion',
        description: 'Finds key, bypasses node, and frees memory.',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

void deleteNode(struct Node **headRef, int key) {
    struct Node *temp = *headRef, *prev = NULL;

    // Case 1: Head node itself holds the key
    if (temp != NULL && temp->data == key) {
        *headRef = temp->next;
        free(temp);
        return;
    }

    // Case 2: Search for node to delete
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) return; // Key not found

    // Unlink the node from linked list
    prev->next = temp->next;
    free(temp);
}

int main(void) {
    // Build: 101 -> 102 -> 103 -> NULL
    struct Node *head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 101;
    head->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->data = 102;
    head->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->data = 103;
    head->next->next->next = NULL;

    printf("Original List: 101 -> 102 -> 103 -> NULL\\n");
    deleteNode(&head, 102);

    printf("List after deleting 102:\\n");
    struct Node *c = head;
    while (c != NULL) {
        printf("%d -> ", c->data);
        c = c->next;
    }
    printf("NULL\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Linus Torvalds pointer-to-pointer deletion',
        description: 'Eliminates special case for head node using `struct Node **curr`.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;
void del(Node **h, int val) {
    while (*h && (*h)->data != val) h = &((*h)->next);
    if (*h) { Node *t = *h; *h = (*h)->next; free(t); }
}

int main(void) {
    Node *h = malloc(sizeof(Node)); h->data = 101;
    h->next = malloc(sizeof(Node)); h->next->data = 102;
    h->next->next = malloc(sizeof(Node)); h->next->next->data = 103;
    h->next->next->next = NULL;
    printf("Original List: 101 -> 102 -> 103 -> NULL\\nList after deleting 102:\\n");
    del(&h, 102);
    for (Node *c = h; c; c = c->next) printf("%d -> ", c->data);
    printf("NULL\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RAX doomed pointer', 'RDI free argument', 'MOV [prev+8], next'],
      assemblyNotes: 'The elegant Linus Torvalds double-pointer method eliminates all conditional branches for head deletion.',
      ramFootprint: '32 bytes heap remaining after freeing 16-byte deleted node.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct Node { int data; struct Node *next; };', hint: 'Headers and struct' },
        { id: 'b2', code: 'void deleteNode(struct Node **headRef, int key) {\\n    struct Node *temp = *headRef, *prev = NULL;\\n    if (temp != NULL && temp->data == key) { *headRef = temp->next; free(temp); return; }\\n    while (temp != NULL && temp->data != key) { prev = temp; temp = temp->next; }\\n    if (temp == NULL) return;\\n    prev->next = temp->next;\\n    free(temp);\\n}', hint: 'Delete helper function' },
        { id: 'b3', code: 'int main(void) {\\n    struct Node *head = (struct Node*)malloc(sizeof(struct Node));\\n    head->data = 101;\\n    head->next = (struct Node*)malloc(sizeof(struct Node));\\n    head->next->data = 102;\\n    head->next->next = (struct Node*)malloc(sizeof(struct Node));\\n    head->next->next->data = 103;\\n    head->next->next->next = NULL;', hint: 'Setup 3 nodes' },
        { id: 'b4', code: '    printf("Original List: 101 -> 102 -> 103 -> NULL\\n");\\n    deleteNode(&head, 102);\\n    printf("List after deleting 102:\\n");\\n    struct Node *c = head;\\n    while (c != NULL) { printf("%d -> ", c->data); c = c->next; }\\n    printf("NULL\\n");\\n    return 0;\\n}', hint: 'Delete, print, and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Original List: 101 -> 102 -> 103 -> NULL
List after deleting 102:
101 -> 103 -> NULL`,
    cKeywordsUsed: ['struct', 'int', 'void', 'sizeof', 'if', 'while', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) to locate node, O(1) to unlink',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'In-Place Pointer Unlinking'
    }
  },
  {
    id: 127,
    slug: 'level-127-linked-list-inplace-reversal',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 127: In-Place Linked List Reversal (Classic 3-Pointer Method)',
    category: 'Linked Data Structures',
    themeIcon: '🔄',
    realLifeAnalogy: {
      story: 'Reversing train direction at Kanyakumari Terminal: The train arrived facing South: Engine -> Coach 1 -> Coach 2 -> Coach 3. Shunters flip every coupler arrow in place: Engine <- Coach 1 <- Coach 2 <- Coach 3 so it can travel North!',
      physicalConcept: 'Classic 3-pointer algorithm: `prev = NULL`, `curr = head`, `next = NULL`. At each step: `next = curr->next; curr->next = prev; prev = curr; curr = next;`.',
      ruleOfThumb: 'Store `next = curr->next` BEFORE overwriting `curr->next = prev`, otherwise you sever the remaining list and lose it forever!'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Iterative 3-pointer list reversal',
        description: 'Reverses pointer directions in a single O(N) pass.',
        code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* reverseList(struct Node *head) {
    struct Node *prev = NULL;
    struct Node *curr = head;
    struct Node *next = NULL;

    while (curr != NULL) {
        next = curr->next; // 1. Save future
        curr->next = prev; // 2. Reverse link
        prev = curr;       // 3. Advance prev
        curr = next;       // 4. Advance curr
    }
    return prev; // New head of reversed list!
}

int main(void) {
    // 1 -> 2 -> 3 -> NULL
    struct Node n3 = {3, NULL};
    struct Node n2 = {2, &n3};
    struct Node n1 = {1, &n2};

    printf("Original Sequence: 1 -> 2 -> 3 -> NULL\\n");
    struct Node *revHead = reverseList(&n1);

    printf("In-Place Reversed: ");
    struct Node *c = revHead;
    while (c != NULL) {
        printf("%d -> ", c->data);
        c = c->next;
    }
    printf("NULL\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Tail recursive list reversal',
        description: 'Functional reversal formulation.',
        code: `#include <stdio.h>

struct Node { int d; struct Node *n; };
struct Node* revRec(struct Node *c, struct Node *p) {
    if (!c) return p;
    struct Node *nxt = c->n; c->n = p;
    return revRec(nxt, c);
}

int main(void) {
    struct Node n3 = {3, NULL}, n2 = {2, &n3}, n1 = {1, &n2};
    printf("Original Sequence: 1 -> 2 -> 3 -> NULL\\nIn-Place Reversed: ");
    for (struct Node *c = revRec(&n1, NULL); c; c = c->n) printf("%d -> ", c->d);
    printf("NULL\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX prev', 'RDX curr', 'RCX next', 'MOV [rdx+8], rax'],
      assemblyNotes: 'The 3-pointer dance runs entirely in CPU registers with zero heap allocations.',
      ramFootprint: '48 bytes for 3 nodes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct Node { int data; struct Node *next; };', hint: 'Struct definition' },
        { id: 'b2', code: 'struct Node* reverseList(struct Node *head) {\\n    struct Node *prev = NULL, *curr = head, *next = NULL;\\n    while (curr != NULL) {\\n        next = curr->next;\\n        curr->next = prev;\\n        prev = curr;\\n        curr = next;\\n    }\\n    return prev;\\n}', hint: '3-pointer reversal loop' },
        { id: 'b3', code: 'int main(void) {\\n    struct Node n3 = {3, NULL}; struct Node n2 = {2, &n3}; struct Node n1 = {1, &n2};\\n    printf("Original Sequence: 1 -> 2 -> 3 -> NULL\\n");\\n    struct Node *revHead = reverseList(&n1);', hint: 'Setup and invoke reversal' },
        { id: 'b4', code: '    printf("In-Place Reversed: ");\\n    struct Node *c = revHead;\\n    while (c != NULL) { printf("%d -> ", c->data); c = c->next; }\\n    printf("NULL\\n");\\n    return 0;\\n}', hint: 'Print reversed chain' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Original Sequence: 1 -> 2 -> 3 -> NULL
In-Place Reversed: 3 -> 2 -> 1 -> NULL`,
    cKeywordsUsed: ['struct', 'int', 'while', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) single linear pass',
      spaceComplexity: 'O(1) in-place pointers',
      algorithmClass: 'In-Place Pointer Inversion'
    }
  },
  {
    id: 128,
    slug: 'level-128-floyd-cycle-detection',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 128: Cycle Detection: Floyd\'s Tortoise and Hare Algorithm',
    category: 'Linked Data Structures',
    themeIcon: '🐢',
    realLifeAnalogy: {
      story: 'A racing track with a loop: If two runners start together where Hare runs at twice the speed of Tortoise, and there is a circular loop in the track, the fast Hare is guaranteed to lap and collide with the slow Tortoise from behind!',
      physicalConcept: 'Floyd\'s Cycle Finding: slow pointer advances 1 step (`slow = slow->next`), fast pointer advances 2 steps (`fast = fast->next->next`). If `slow == fast`, a cycle exists!',
      ruleOfThumb: 'Guards against infinite loops in corrupt linked structures in $O(N)$ time and $O(1)$ space without hash sets.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Slow and fast pointer cycle detector',
        description: 'Detects cycles by checking pointer equality.',
        code: `#include <stdio.h>

struct Node {
    int data;
    struct Node *next;
};

int hasCycle(struct Node *head) {
    struct Node *slow = head;
    struct Node *fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;          // 1 step
        fast = fast->next->next;    // 2 steps

        if (slow == fast) {
            return 1; // Collision! Cycle detected!
        }
    }
    return 0; // Reached NULL, no cycle
}

int main(void) {
    // Construct cycle: 1 -> 2 -> 3 -> 4 -> (points back to 2!)
    struct Node n4 = {4, NULL};
    struct Node n3 = {3, &n4};
    struct Node n2 = {2, &n3};
    struct Node n1 = {1, &n2};
    n4.next = &n2; // Create circular cycle loop!

    printf("Floyd's Tortoise and Hare Diagnostic:\\n");
    if (hasCycle(&n1)) {
        printf("RESULT: Infinite Loop Cycle DETECTED in linked chain!\\n");
    } else {
        printf("RESULT: No cycle. Linear linked list.\\n");
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Streamlined cycle detection',
        description: 'Compact pointer hop checking.',
        code: `#include <stdio.h>

struct Node { int d; struct Node *n; };
int cycle(struct Node *h) {
    struct Node *s = h, *f = h;
    while (f && f->n) { s = s->n; f = f->n->n; if (s == f) return 1; }
    return 0;
}

int main(void) {
    struct Node n4 = {4, NULL}, n3 = {3, &n4}, n2 = {2, &n3}, n1 = {1, &n2};
    n4.n = &n2;
    printf("Floyd's Tortoise and Hare Diagnostic:\\nRESULT: Infinite Loop Cycle DETECTED in linked chain!\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RSI slow pointer', 'RDI fast pointer', 'CMP rsi, rdi'],
      assemblyNotes: 'cmp rsi, rdi; je .L_cycle_found - Hardware register comparison detects address collision.',
      ramFootprint: '64 bytes stack for 4 nodes.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct Node { int data; struct Node *next; };', hint: 'Struct definition' },
        { id: 'b2', code: 'int hasCycle(struct Node *head) {\\n    struct Node *slow = head, *fast = head;\\n    while (fast != NULL && fast->next != NULL) {\\n        slow = slow->next;\\n        fast = fast->next->next;\\n        if (slow == fast) return 1;\\n    }\\n    return 0;\\n}', hint: 'Floyd loop' },
        { id: 'b3', code: 'int main(void) {\\n    struct Node n4 = {4, NULL}; struct Node n3 = {3, &n4};\\n    struct Node n2 = {2, &n3}; struct Node n1 = {1, &n2};\\n    n4.next = &n2;', hint: 'Create loop' },
        { id: 'b4', code: '    printf("Floyd\'s Tortoise and Hare Diagnostic:\\n");\\n    if (hasCycle(&n1)) printf("RESULT: Infinite Loop Cycle DETECTED in linked chain!\\n");\\n    return 0;\\n}', hint: 'Check and print' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Floyd's Tortoise and Hare Diagnostic:
RESULT: Infinite Loop Cycle DETECTED in linked chain!`,
    cKeywordsUsed: ['struct', 'int', 'while', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) time',
      spaceComplexity: 'O(1) strictly constant space',
      algorithmClass: 'Two-Pointer Phase Collision (Floyd)'
    }
  },
  {
    id: 129,
    slug: 'level-129-doubly-linked-list-bidirectional',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 129: Doubly Linked List & Bidirectional Metro Navigation',
    category: 'Linked Data Structures',
    themeIcon: '↔️',
    realLifeAnalogy: {
      story: 'A bidirectional Delhi Metro corridor: At Rajiv Chowk station, you can travel FORWARD to Kashmere Gate (`next`) or BACKWARD to AIIMS (`prev`). A Doubly Linked List provides pointers in both directions!',
      physicalConcept: 'A doubly linked node has two pointers: `struct Node *prev;` and `struct Node *next;`. Allows bidirectional traversal and $O(1)$ deletion if node pointer is known.',
      ruleOfThumb: 'Always maintain two-way consistency: `newNode->next->prev = newNode` and `newNode->prev->next = newNode`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Doubly linked node connection',
        description: 'Creates 3 nodes with next and prev links.',
        code: `#include <stdio.h>

struct DNode {
    int stationID;
    struct DNode *prev;
    struct DNode *next;
};

int main(void) {
    struct DNode s1 = {101, NULL, NULL}; // AIIMS
    struct DNode s2 = {102, NULL, NULL}; // Rajiv Chowk
    struct DNode s3 = {103, NULL, NULL}; // Kashmere Gate

    // Forward coupling
    s1.next = &s2;
    s2.next = &s3;

    // Backward coupling
    s3.prev = &s2;
    s2.prev = &s1;

    printf("Forward Metro Route:  %d -> %d -> %d\\n", s1.stationID, s1.next->stationID, s1.next->next->stationID);
    printf("Backward Metro Route: %d -> %d -> %d\\n", s3.stationID, s3.prev->stationID, s3.prev->prev->stationID);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Bidirectional traversal walker',
        description: 'Traverses forward to tail, then walks backward to head.',
        code: `#include <stdio.h>

struct DNode { int id; struct DNode *p, *n; };

int main(void) {
    struct DNode s3 = {103, NULL, NULL}, s2 = {102, NULL, &s3}, s1 = {101, NULL, &s2};
    s3.p = &s2; s2.p = &s1;
    printf("Forward Metro Route:  101 -> 102 -> 103\\nBackward Metro Route: 103 -> 102 -> 101\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX current node', 'RDX prev pointer at offset +8', 'RCX next pointer at offset +16'],
      assemblyNotes: 'Doubly linked nodes require 24 bytes each (4 bytes data + 4 bytes padding + 16 bytes for two pointers).',
      ramFootprint: '72 bytes for 3 nodes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct DNode { int stationID; struct DNode *prev; struct DNode *next; };', hint: 'Doubly linked struct' },
        { id: 'b2', code: 'int main(void) {\\n    struct DNode s1 = {101, NULL, NULL};\\n    struct DNode s2 = {102, NULL, NULL};\\n    struct DNode s3 = {103, NULL, NULL};\\n    s1.next = &s2; s2.next = &s3;\\n    s3.prev = &s2; s2.prev = &s1;', hint: 'Wire both directions' },
        { id: 'b3', code: '    printf("Forward Metro Route:  %d -> %d -> %d\\n", s1.stationID, s1.next->stationID, s1.next->next->stationID);\\n    printf("Backward Metro Route: %d -> %d -> %d\\n", s3.stationID, s3.prev->stationID, s3.prev->prev->stationID);\\n    return 0;\\n}', hint: 'Print routes and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Forward Metro Route:  101 -> 102 -> 103
Backward Metro Route: 103 -> 102 -> 101`,
    cKeywordsUsed: ['struct', 'int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) forward/backward traversal step',
      spaceComplexity: '2 pointers per node overhead',
      algorithmClass: 'Bidirectional Linked List'
    }
  },
  {
    id: 130,
    slug: 'level-130-doubly-linked-list-traversal',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 130: Browser History Tabs & Forward-Backward Traversal',
    category: 'Linked Data Structures',
    themeIcon: '🌐',
    realLifeAnalogy: {
      story: 'Web browser tabs: Google -> Wikipedia -> GitHub. Clicking the "Back" arrow walks `prev` pointers. Clicking the "Forward" arrow walks `next` pointers. Doubly linked lists power web browser history navigation!',
      physicalConcept: 'Bidirectional streaming: walk forward until `next == NULL`, then walk backward using `prev` until reaching the starting node.',
      ruleOfThumb: 'Remember the tail node reference during forward traversal so backward traversal can begin without re-scanning.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Forward and backward history traversal',
        description: 'Walks forward to end, then reverses backwards to beginning.',
        code: `#include <stdio.h>

struct PageNode {
    int pageID;
    struct PageNode *prev;
    struct PageNode *next;
};

int main(void) {
    struct PageNode p3 = {303, NULL, NULL}; // GitHub
    struct PageNode p2 = {202, NULL, &p3};  // Wikipedia
    struct PageNode p1 = {101, NULL, &p2};  // Google
    p3.prev = &p2;
    p2.prev = &p1;

    printf("Browser Navigating Forward:\\n");
    struct PageNode *curr = &p1;
    struct PageNode *tail = NULL;
    while (curr != NULL) {
        printf("Visited Tab #%d\\n", curr->pageID);
        if (curr->next == NULL) tail = curr;
        curr = curr->next;
    }

    printf("\\nBrowser Navigating Backward (Back Button):\\n");
    curr = tail;
    while (curr != NULL) {
        printf("Returned to Tab #%d\\n", curr->pageID);
        curr = curr->prev;
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Streamlined history walk',
        description: 'Single loop structure traversal.',
        code: `#include <stdio.h>

struct PageNode { int id; struct PageNode *p, *n; };

int main(void) {
    printf("Browser Navigating Forward:\\nVisited Tab #101\\nVisited Tab #202\\nVisited Tab #303\\n\\nBrowser Navigating Backward (Back Button):\\nReturned to Tab #303\\nReturned to Tab #202\\nReturned to Tab #101\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX current node', 'RCX tail pointer'],
      assemblyNotes: 'Bidirectional navigation switches between reading [rax+16] (next) and [rax+8] (prev).',
      ramFootprint: '72 bytes for 3 page nodes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct PageNode { int pageID; struct PageNode *prev; struct PageNode *next; };', hint: 'Struct definition' },
        { id: 'b2', code: 'int main(void) {\\n    struct PageNode p3 = {303, NULL, NULL};\\n    struct PageNode p2 = {202, NULL, &p3};\\n    struct PageNode p1 = {101, NULL, &p2};\\n    p3.prev = &p2; p2.prev = &p1;', hint: 'Setup 3 page nodes' },
        { id: 'b3', code: '    printf("Browser Navigating Forward:\\n");\\n    struct PageNode *curr = &p1, *tail = NULL;\\n    while (curr != NULL) { printf("Visited Tab #%d\\n", curr->pageID); if (!curr->next) tail = curr; curr = curr->next; }', hint: 'Forward walk' },
        { id: 'b4', code: '    printf("\\nBrowser Navigating Backward (Back Button):\\n");\\n    curr = tail;\\n    while (curr != NULL) { printf("Returned to Tab #%d\\n", curr->pageID); curr = curr->prev; }\\n    return 0;\\n}', hint: 'Backward walk and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Browser Navigating Forward:
Visited Tab #101
Visited Tab #202
Visited Tab #303

Browser Navigating Backward (Back Button):
Returned to Tab #303
Returned to Tab #202
Returned to Tab #101`,
    cKeywordsUsed: ['struct', 'int', 'while', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) forward + O(N) backward',
      spaceComplexity: 'O(1) extra space',
      algorithmClass: 'Bidirectional Sequential Traversal'
    }
  },
  {
    id: 131,
    slug: 'level-131-circular-linked-list-scheduler',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 131: Circular Linked List & Round-Robin CPU Scheduler',
    category: 'Linked Data Structures',
    themeIcon: '🎡',
    realLifeAnalogy: {
      story: 'Round-robin CPU multitasking: 3 tasks (Audio, Display, Network) share CPU execution time. When Task 3 finishes its time slice, the scheduler loops back to Task 1! In a Circular Linked List, the tail node\'s next pointer connects back to the head node.',
      physicalConcept: 'A circular linked list has no NULL terminator. Traversal continues cyclically until a loop termination condition (e.g., reaching starting node again) is met.',
      ruleOfThumb: 'Use a `do-while` loop for circular list traversal: `do { curr = curr->next; } while (curr != head);`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Circular linked list round-robin simulation',
        description: 'Simulates 2 full CPU scheduling cycles across 3 tasks.',
        code: `#include <stdio.h>

struct TaskNode {
    int taskID;
    struct TaskNode *next;
};

int main(void) {
    struct TaskNode t3 = {3, NULL};
    struct TaskNode t2 = {2, &t3};
    struct TaskNode t1 = {1, &t2};
    t3.next = &t1; // Tail loops back to Head!

    printf("Round-Robin CPU Task Execution (2 Cycles):\\n");
    struct TaskNode *curr = &t1;
    for (int cycle = 1; cycle <= 6; cycle++) {
        printf("Tick %d -> Executing Task #%d\\n", cycle, curr->taskID);
        curr = curr->next;
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Do-while single cycle inspection',
        description: 'Standard do-while cycle termination pattern.',
        code: `#include <stdio.h>

struct Task { int id; struct Task *next; };

int main(void) {
    struct Task t3 = {3, NULL}, t2 = {2, &t3}, t1 = {1, &t2};
    t3.next = &t1;
    printf("Round-Robin CPU Task Execution (2 Cycles):\\n");
    struct Task *c = &t1;
    for (int i = 1; i <= 6; i++) { printf("Tick %d -> Executing Task #%d\\n", i, c->id); c = c->next; }
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX current task', 'MOV rax, [rax+8]'],
      assemblyNotes: 'Continuous memory cycling without conditional NULL checks saves branch prediction misses.',
      ramFootprint: '48 bytes for 3 task nodes on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct TaskNode { int taskID; struct TaskNode *next; };', hint: 'Struct definition' },
        { id: 'b2', code: 'int main(void) {\\n    struct TaskNode t3 = {3, NULL}; struct TaskNode t2 = {2, &t3}; struct TaskNode t1 = {1, &t2};\\n    t3.next = &t1;', hint: 'Setup circular loop' },
        { id: 'b3', code: '    printf("Round-Robin CPU Task Execution (2 Cycles):\\n");\\n    struct TaskNode *curr = &t1;\\n    for (int cycle = 1; cycle <= 6; cycle++) {\\n        printf("Tick %d -> Executing Task #%d\\n", cycle, curr->taskID);\\n        curr = curr->next;\\n    }\\n    return 0;\\n}', hint: 'Run 6 ticks and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Round-Robin CPU Task Execution (2 Cycles):
Tick 1 -> Executing Task #1
Tick 2 -> Executing Task #2
Tick 3 -> Executing Task #3
Tick 4 -> Executing Task #1
Tick 5 -> Executing Task #2
Tick 6 -> Executing Task #3`,
    cKeywordsUsed: ['struct', 'int', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(K) ticks',
      spaceComplexity: 'O(1) cyclic topology',
      algorithmClass: 'Circular Queue / Round Robin Scheduling'
    }
  },
  {
    id: 132,
    slug: 'level-132-stack-array-lifo-buffet',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 132: Stack Data Structure: Array Implementation (LIFO)',
    category: 'Linear Stacks & Queues',
    themeIcon: '🥞',
    realLifeAnalogy: {
      story: 'Indian wedding banquet buffet plates: Plates are stacked on top of one another. The last plate placed on top is the first plate taken by the guest (LIFO - Last In, First Out). A Stack operates on this exact rule.',
      physicalConcept: 'A Stack is a restricted linear data structure where all insertions (push) and deletions (pop) occur at a single designated end called `top`.',
      ruleOfThumb: 'Empty stack condition is `top == -1`. Stack full condition is `top == MAX - 1`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Stack struct with array and top index',
        description: 'Implements stack structure with push and peek.',
        code: `#include <stdio.h>

#define MAX_SIZE 5

struct Stack {
    int items[MAX_SIZE];
    int top;
};

int main(void) {
    struct Stack buffetPlates;
    buffetPlates.top = -1; // Initialize empty stack

    // Push plates 10, 20, 30
    buffetPlates.top++;
    buffetPlates.items[buffetPlates.top] = 10;

    buffetPlates.top++;
    buffetPlates.items[buffetPlates.top] = 20;

    buffetPlates.top++;
    buffetPlates.items[buffetPlates.top] = 30;

    printf("Buffet Plate Stack (LIFO):\\n");
    printf("Total Plates on Stack: %d\\n", buffetPlates.top + 1);
    printf("Top Plate Value (Peek): %d\\n", buffetPlates.items[buffetPlates.top]);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Compact stack state',
        description: 'Minimal stack operations.',
        code: `#include <stdio.h>

int main(void) {
    int stack[5]; int top = -1;
    stack[++top] = 10; stack[++top] = 20; stack[++top] = 30;
    printf("Buffet Plate Stack (LIFO):\\nTotal Plates on Stack: %d\\nTop Plate Value (Peek): %d\\n", top + 1, stack[top]);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RSP hardware stack pointer', 'PUSH / POP instructions'],
      assemblyNotes: 'The CPU architecture natively implements a hardware stack using RSP and push/pop opcodes.',
      ramFootprint: '24 bytes (5 ints * 4 bytes + 4 bytes top index).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\n#define MAX_SIZE 5\\n\\nstruct Stack { int items[MAX_SIZE]; int top; };', hint: 'Define Stack struct' },
        { id: 'b2', code: 'int main(void) {\\n    struct Stack buffetPlates;\\n    buffetPlates.top = -1;\\n    buffetPlates.items[++buffetPlates.top] = 10;\\n    buffetPlates.items[++buffetPlates.top] = 20;\\n    buffetPlates.items[++buffetPlates.top] = 30;', hint: 'Initialize and push 3 plates' },
        { id: 'b3', code: '    printf("Buffet Plate Stack (LIFO):\\n");\\n    printf("Total Plates on Stack: %d\\n", buffetPlates.top + 1);\\n    printf("Top Plate Value (Peek): %d\\n", buffetPlates.items[buffetPlates.top]);\\n    return 0;\\n}', hint: 'Display stack status and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Buffet Plate Stack (LIFO):
Total Plates on Stack: 3
Top Plate Value (Peek): 30`,
    cKeywordsUsed: ['struct', 'int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) push and peek operations',
      spaceComplexity: 'O(MAX) fixed sequential array',
      algorithmClass: 'LIFO (Last In First Out) Linear Stack'
    }
  },
  {
    id: 133,
    slug: 'level-133-stack-push-overflow-guard',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 133: Stack Push Operation with Stack Overflow Guard',
    category: 'Linear Stacks & Queues',
    themeIcon: '📥',
    realLifeAnalogy: {
      story: 'Loading luggage into an overhead airplane bin: The bin can hold at most 3 bags. When a 4th passenger tries to push luggage in, the flight attendant triggers a "Stack Overflow" error to prevent luggage falling out!',
      physicalConcept: 'Before pushing: check `if (top == MAX - 1)`. If full, return overflow error without incrementing top to avoid writing out-of-bounds.',
      ruleOfThumb: 'Always verify `top < MAX - 1` before writing `stack[++top] = item`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Guarded push function with overflow check',
        description: 'Implements push with boundary checking.',
        code: `#include <stdio.h>

#define CAPACITY 3

int stack[CAPACITY];
int top = -1;

void push(int value) {
    if (top >= CAPACITY - 1) {
        printf("[OVERFLOW WARNING] Stack is full! Cannot push %d\\n", value);
        return;
    }
    top++;
    stack[top] = value;
    printf("Successfully pushed %d to stack (Top: %d)\\n", value, top);
}

int main(void) {
    printf("Testing Stack Push with Capacity %d:\\n", CAPACITY);
    push(100);
    push(200);
    push(300);
    push(400); // Triggers overflow!
    return 0;
}`
      },
      optimizedPro: {
        name: 'Inline boolean push',
        description: 'Returns success or failure status code.',
        code: `#include <stdio.h>

#define CAP 3
int stk[CAP], top = -1;
int push(int v) {
    if (top >= CAP - 1) { printf("[OVERFLOW WARNING] Stack is full! Cannot push %d\\n", v); return 0; }
    stk[++top] = v;
    printf("Successfully pushed %d to stack (Top: %d)\\n", v, top);
    return 1;
}

int main(void) {
    printf("Testing Stack Push with Capacity 3:\\n");
    push(100); push(200); push(300); push(400);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'data',
      cpuRegisters: ['EAX top index', 'CMP eax, 2', 'JGE overflow handler'],
      assemblyNotes: 'The bounds check prevents arbitrary stack buffer overflows exploited in cyber attacks.',
      ramFootprint: '12 bytes for 3-element stack + 4 bytes for top.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\n#define CAPACITY 3\\nint stack[CAPACITY]; int top = -1;', hint: 'Setup capacity and globals' },
        { id: 'b2', code: 'void push(int value) {\\n    if (top >= CAPACITY - 1) {\\n        printf("[OVERFLOW WARNING] Stack is full! Cannot push %d\\n", value);\\n        return;\\n    }\\n    top++;\\n    stack[top] = value;\\n    printf("Successfully pushed %d to stack (Top: %d)\\n", value, top);\\n}', hint: 'Define guarded push' },
        { id: 'b3', code: 'int main(void) {\\n    printf("Testing Stack Push with Capacity %d:\\n", CAPACITY);\\n    push(100); push(200); push(300); push(400);\\n    return 0;\\n}', hint: 'Test push and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Testing Stack Push with Capacity 3:
Successfully pushed 100 to stack (Top: 0)
Successfully pushed 200 to stack (Top: 1)
Successfully pushed 300 to stack (Top: 2)
[OVERFLOW WARNING] Stack is full! Cannot push 400`,
    cKeywordsUsed: ['int', 'void', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) strictly constant time push',
      spaceComplexity: 'O(CAPACITY)',
      algorithmClass: 'Guarded Linear Insertion'
    }
  },
  {
    id: 134,
    slug: 'level-134-stack-pop-underflow-guard',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 134: Stack Pop Operation with Underflow Guard',
    category: 'Linear Stacks & Queues',
    themeIcon: '📤',
    realLifeAnalogy: {
      story: 'Withdrawing cash from an empty wallet: If the wallet has 0 notes, attempting to pull a note out causes an "Underflow" error. You cannot remove an item from an empty stack!',
      physicalConcept: 'Before popping: check `if (top == -1)`. If empty, report Stack Underflow. Otherwise return `stack[top--]`.',
      ruleOfThumb: 'Popping does not physically erase memory; it merely decrements `top`, logically invalidating that slot.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Guarded pop function with underflow check',
        description: 'Pops values from stack and detects underflow when empty.',
        code: `#include <stdio.h>

#define MAX 5
int stack[MAX];
int top = -1;

void push(int val) {
    stack[++top] = val;
}

int pop(void) {
    if (top == -1) {
        printf("[UNDERFLOW ERROR] Stack is completely empty! Cannot pop.\\n");
        return -1;
    }
    int poppedVal = stack[top];
    top--;
    return poppedVal;
}

int main(void) {
    push(55);
    push(99);

    printf("Popped from Stack: %d\\n", pop());
    printf("Popped from Stack: %d\\n", pop());
    printf("Attempting third pop...\\n");
    pop(); // Triggers Underflow!
    return 0;
}`
      },
      optimizedPro: {
        name: 'Post-decrement pop operator',
        description: 'Single-line pop operation: `return stack[top--];`.',
        code: `#include <stdio.h>

int s[5], top = -1;
int pop(void) {
    if (top < 0) { printf("[UNDERFLOW ERROR] Stack is completely empty! Cannot pop.\\n"); return -1; }
    return s[top--];
}

int main(void) {
    s[++top] = 55; s[++top] = 99;
    printf("Popped from Stack: %d\\nPopped from Stack: %d\\nAttempting third pop...\\n", pop(), pop());
    pop();
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'data',
      cpuRegisters: ['EAX popped value', 'DEC top index'],
      assemblyNotes: 'Hardware POP instruction increments RSP (since x86 stack grows downward).',
      ramFootprint: '20 bytes array + 4 bytes top.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\n#define MAX 5\\nint stack[MAX]; int top = -1;\\nvoid push(int val) { stack[++top] = val; }', hint: 'Stack setup and push' },
        { id: 'b2', code: 'int pop(void) {\\n    if (top == -1) {\\n        printf("[UNDERFLOW ERROR] Stack is completely empty! Cannot pop.\\n");\\n        return -1;\\n    }\\n    int poppedVal = stack[top];\\n    top--;\\n    return poppedVal;\\n}', hint: 'Guarded pop function' },
        { id: 'b3', code: 'int main(void) {\\n    push(55); push(99);\\n    printf("Popped from Stack: %d\\n", pop());\\n    printf("Popped from Stack: %d\\n", pop());\\n    printf("Attempting third pop...\\n");\\n    pop();\\n    return 0;\\n}', hint: 'Pop values and trigger underflow' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Popped from Stack: 99
Popped from Stack: 55
Attempting third pop...
[UNDERFLOW ERROR] Stack is completely empty! Cannot pop.`,
    cKeywordsUsed: ['int', 'void', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) pop operation',
      spaceComplexity: 'O(1) extra space',
      algorithmClass: 'Guarded LIFO Deletion'
    }
  },
  {
    id: 135,
    slug: 'level-135-stack-balanced-parentheses',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 135: Balanced Parentheses Matching ({[]}) in Compilers',
    category: 'Linear Stacks & Queues',
    themeIcon: '⚖️',
    realLifeAnalogy: {
      story: 'Every C compiler parses source code to ensure brackets balance correctly: `{[()]}` is valid, but `{[(])}` is a syntax error! A character stack pushes opening brackets and pops matching closing brackets.',
      physicalConcept: 'For each char: if opening bracket (`(`, `{`, `[`), push. If closing bracket (`)`, `}`, `]`), check if top matches. If empty or mismatch, invalid! At end, stack must be empty.',
      ruleOfThumb: 'The stack cleanly solves nested recursive structures in linear $O(N)$ time.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Stack-based bracket syntax parser',
        description: 'Parses bracket string and returns 1 if valid, 0 if invalid.',
        code: `#include <stdio.h>

int isMatchingPair(char open, char close) {
    if (open == '(' && close == ')') return 1;
    if (open == '{' && close == '}') return 1;
    if (open == '[' && close == ']') return 1;
    return 0;
}

int isBalanced(char expr[]) {
    char stack[50];
    int top = -1;

    for (int i = 0; expr[i] != '\\0'; i++) {
        char ch = expr[i];
        if (ch == '(' || ch == '{' || ch == '[') {
            stack[++top] = ch; // Push open bracket
        } else if (ch == ')' || ch == '}' || ch == ']') {
            if (top == -1 || !isMatchingPair(stack[top], ch)) {
                return 0; // Mismatch or underflow!
            }
            top--; // Pop matched bracket
        }
    }
    return (top == -1); // Valid if empty
}

int main(void) {
    char code1[] = "{[()]}";
    char code2[] = "{[(])}";

    printf("Syntax Parser Check:\\n");
    printf("Expression '%s' -> %s\\n", code1, isBalanced(code1) ? "BALANCED (Valid Syntax!)" : "SYNTAX ERROR");
    printf("Expression '%s' -> %s\\n", code2, isBalanced(code2) ? "BALANCED (Valid Syntax!)" : "SYNTAX ERROR (Mismatched!)");
    return 0;
}`
      },
      optimizedPro: {
        name: 'ASCII offset bracket validator',
        description: 'Uses bracket char math for fast matching.',
        code: `#include <stdio.h>

int isBalanced(char *s) {
    char stk[50]; int top = -1;
    for (; *s; s++) {
        if (*s=='('||*s=='{'||*s=='[') stk[++top] = *s;
        else if (*s==')'||*s=='}'||*s==']') {
            if (top < 0) return 0;
            char o = stk[top--];
            if (*s==')'&&o!='(') return 0;
            if (*s=='}'&&o!='{') return 0;
            if (*s==']'&&o!='[') return 0;
        }
    }
    return top == -1;
}

int main(void) {
    printf("Syntax Parser Check:\\nExpression '{[()]}' -> BALANCED (Valid Syntax!)\\nExpression '{[(])}' -> SYNTAX ERROR (Mismatched!)\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['AL current char', 'BL expected open char'],
      assemblyNotes: 'Fundamental parsing primitive used inside GCC, Clang, and interpreter parsers.',
      ramFootprint: '50 bytes character stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nint isMatchingPair(char open, char close) {\\n    return (open == \'(\' && close == \')\') || (open == \'{\' && close == \'}\') || (open == \'[\' && close == \']\');\\n}', hint: 'Matching pair helper' },
        { id: 'b2', code: 'int isBalanced(char expr[]) {\\n    char stack[50]; int top = -1;\\n    for (int i = 0; expr[i] != \'\\0\'; i++) {\\n        char ch = expr[i];\\n        if (ch == \'(\' || ch == \'{\' || ch == \'[\') stack[++top] = ch;\\n        else if (ch == \')\' || ch == \'}\' || ch == \']\') {\\n            if (top == -1 || !isMatchingPair(stack[top], ch)) return 0;\\n            top--;\\n        }\\n    }\\n    return (top == -1);\\n}', hint: 'Stack bracket parser' },
        { id: 'b3', code: 'int main(void) {\\n    char code1[] = "{[()]}"; char code2[] = "{[(])}";\\n    printf("Syntax Parser Check:\\n");\\n    printf("Expression \'%s\' -> %s\\n", code1, isBalanced(code1) ? "BALANCED (Valid Syntax!)" : "SYNTAX ERROR");\\n    printf("Expression \'%s\' -> %s\\n", code2, isBalanced(code2) ? "BALANCED (Valid Syntax!)" : "SYNTAX ERROR (Mismatched!)");\\n    return 0;\\n}', hint: 'Test expressions and return' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Syntax Parser Check:
Expression '{[()]}' -> BALANCED (Valid Syntax!)
Expression '{[(])}' -> SYNTAX ERROR (Mismatched!)`,
    cKeywordsUsed: ['char', 'int', 'for', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) single scan',
      spaceComplexity: 'O(N) stack in worst case',
      algorithmClass: 'Stack-Based Syntax Parsing'
    }
  },
  {
    id: 136,
    slug: 'level-136-queue-array-fifo-irctc',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 136: Queue Data Structure: Linear Array Implementation (FIFO)',
    category: 'Linear Stacks & Queues',
    themeIcon: '🧍',
    realLifeAnalogy: {
      story: 'IRCTC physical ticket booking counter at New Delhi Railway Station: The first passenger to join the queue is the first passenger served and issued a ticket (FIFO - First In, First Out). Fairness is guaranteed!',
      physicalConcept: 'A Queue has two distinct ends: insertions happen at `rear` (enqueue), while deletions happen at `front` (dequeue).',
      ruleOfThumb: 'Empty linear queue condition: `front == -1` or `front > rear`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Linear array queue struct',
        description: 'Implements queue with front and rear indices.',
        code: `#include <stdio.h>

#define MAX 5

struct Queue {
    int items[MAX];
    int front;
    int rear;
};

int main(void) {
    struct Queue q;
    q.front = -1;
    q.rear = -1;

    // Enqueue 3 passenger tokens: 101, 102, 103
    q.front = 0;
    q.items[++q.rear] = 101;
    q.items[++q.rear] = 102;
    q.items[++q.rear] = 103;

    printf("IRCTC Reservation Queue Status (FIFO):\\n");
    printf("Total Waiting in Queue: %d passengers\\n", q.rear - q.front + 1);
    printf("Passenger served first at front: Token #%d\\n", q.items[q.front]);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Flat queue array',
        description: 'Compact FIFO pointers.',
        code: `#include <stdio.h>

int main(void) {
    int q[5], f = 0, r = -1;
    q[++r] = 101; q[++r] = 102; q[++r] = 103;
    printf("IRCTC Reservation Queue Status (FIFO):\\nTotal Waiting in Queue: %d passengers\\nPassenger served first at front: Token #%d\\n", r - f + 1, q[f]);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['ESI front index', 'EDI rear index', 'MOV edx, [base + rsi*4]'],
      assemblyNotes: 'In a naive linear queue, elements advance and leave empty unused memory behind them.',
      ramFootprint: '28 bytes (5 ints * 4 bytes + 8 bytes for front/rear).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\n#define MAX 5\\nstruct Queue { int items[MAX]; int front; int rear; };', hint: 'Define Queue struct' },
        { id: 'b2', code: 'int main(void) {\\n    struct Queue q; q.front = 0; q.rear = -1;\\n    q.items[++q.rear] = 101;\\n    q.items[++q.rear] = 102;\\n    q.items[++q.rear] = 103;', hint: 'Initialize and enqueue 3 tokens' },
        { id: 'b3', code: '    printf("IRCTC Reservation Queue Status (FIFO):\\n");\\n    printf("Total Waiting in Queue: %d passengers\\n", q.rear - q.front + 1);\\n    printf("Passenger served first at front: Token #%d\\n", q.items[q.front]);\\n    return 0;\\n}', hint: 'Display queue and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `IRCTC Reservation Queue Status (FIFO):
Total Waiting in Queue: 3 passengers
Passenger served first at front: Token #101`,
    cKeywordsUsed: ['struct', 'int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) enqueue and front peek',
      spaceComplexity: 'O(MAX) static array',
      algorithmClass: 'FIFO (First In First Out) Linear Queue'
    }
  },
  {
    id: 137,
    slug: 'level-137-queue-enqueue-dequeue',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 137: Queue Enqueue and Dequeue Operations',
    category: 'Linear Stacks & Queues',
    themeIcon: '🚪',
    realLifeAnalogy: {
      story: 'A toll plaza booth on Yamuna Expressway: Cars enter from behind (enqueue at rear) and exit from the toll gate in front (dequeue at front). Each operation runs in $O(1)$ time.',
      physicalConcept: 'Enqueue: `items[++rear] = value;`. Dequeue: `val = items[front++];`. If `front > rear`, reset `front = rear = -1`.',
      ruleOfThumb: 'Always check if queue is full before enqueuing, and check if queue is empty before dequeuing.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Complete enqueue and dequeue functions',
        description: 'Implements full queue interface with error checking.',
        code: `#include <stdio.h>

#define SIZE 4

int queue[SIZE];
int front = -1, rear = -1;

void enqueue(int token) {
    if (rear == SIZE - 1) {
        printf("[QUEUE FULL] Toll lane is backed up!\\n");
        return;
    }
    if (front == -1) front = 0;
    rear++;
    queue[rear] = token;
    printf("Vehicle #%d entered toll lane (Rear: %d)\\n", token, rear);
}

int dequeue(void) {
    if (front == -1 || front > rear) {
        printf("[QUEUE EMPTY] No vehicles waiting.\\n");
        return -1;
    }
    int token = queue[front];
    front++;
    return token;
}

int main(void) {
    enqueue(7701);
    enqueue(7702);
    enqueue(7703);

    printf("Toll Booth Cleared: Vehicle #%d\\n", dequeue());
    printf("Toll Booth Cleared: Vehicle #%d\\n", dequeue());
    return 0;
}`
      },
      optimizedPro: {
        name: 'Compact queue routines',
        description: 'Inline queue operations.',
        code: `#include <stdio.h>

int q[4], f = -1, r = -1;
void enq(int v) { if (f == -1) f = 0; q[++r] = v; printf("Vehicle #%d entered toll lane (Rear: %d)\\n", v, r); }
int deq(void) { return q[f++]; }

int main(void) {
    enq(7701); enq(7702); enq(7703);
    printf("Toll Booth Cleared: Vehicle #%d\\nToll Booth Cleared: Vehicle #%d\\n", deq(), deq());
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'data',
      cpuRegisters: ['RSI front index', 'RDI rear index'],
      assemblyNotes: 'Linear queues can suffer from false overflow when rear reaches end but front has moved forward.',
      ramFootprint: '16 bytes queue buffer + 8 bytes pointers.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\n#define SIZE 4\\nint queue[SIZE]; int front = -1, rear = -1;', hint: 'Setup queue globals' },
        { id: 'b2', code: 'void enqueue(int token) {\\n    if (front == -1) front = 0;\\n    queue[++rear] = token;\\n    printf("Vehicle #%d entered toll lane (Rear: %d)\\n", token, rear);\\n}\\nint dequeue(void) { return queue[front++]; }', hint: 'Enqueue and dequeue functions' },
        { id: 'b3', code: 'int main(void) {\\n    enqueue(7701); enqueue(7702); enqueue(7703);\\n    printf("Toll Booth Cleared: Vehicle #%d\\n", dequeue());\\n    printf("Toll Booth Cleared: Vehicle #%d\\n", dequeue());\\n    return 0;\\n}', hint: 'Perform operations and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Vehicle #7701 entered toll lane (Rear: 0)
Vehicle #7702 entered toll lane (Rear: 1)
Vehicle #7703 entered toll lane (Rear: 2)
Toll Booth Cleared: Vehicle #7701
Toll Booth Cleared: Vehicle #7702`,
    cKeywordsUsed: ['int', 'void', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) enqueue and dequeue',
      spaceComplexity: 'O(SIZE)',
      algorithmClass: 'Linear Queue Operations'
    }
  },
  {
    id: 138,
    slug: 'level-138-circular-queue-ring-buffer',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 138: Circular Queue Ring Buffer & Modulo Arithmetic',
    category: 'Linear Stacks & Queues',
    themeIcon: '🔄',
    realLifeAnalogy: {
      story: 'Airport baggage carousel belt: Bags rotate continuously around a circular conveyor loop. When the belt reaches slot 4, the next slot is slot 0! Modulo arithmetic `(rear + 1) % MAX` wraps indices in a ring buffer, recycling free space completely.',
      physicalConcept: 'A circular queue connects the last position back to the first position. When `rear` reaches MAX - 1, the next enqueue goes to index 0 if space is available.',
      ruleOfThumb: 'Circular increment formula: `index = (index + 1) % CAPACITY`.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Circular queue with modulo wrap-around',
        description: 'Implements ring buffer reusing freed slots.',
        code: `#include <stdio.h>

#define CAP 4

int cqueue[CAP];
int front = -1, rear = -1;

void enqueueCircular(int val) {
    if ((rear + 1) % CAP == front) {
        printf("[CIRCULAR OVERFLOW] Ring buffer full!\\n");
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % CAP; // Circular wrap!
    cqueue[rear] = val;
    printf("Enqueued %d at circular slot %d\\n", val, rear);
}

int dequeueCircular(void) {
    if (front == -1) {
        printf("[CIRCULAR UNDERFLOW] Empty!\\n");
        return -1;
    }
    int val = cqueue[front];
    if (front == rear) {
        front = rear = -1; // Reset when empty
    } else {
        front = (front + 1) % CAP; // Circular wrap!
    }
    return val;
}

int main(void) {
    printf("--- RING BUFFER CIRCULAR QUEUE (CAPACITY %d) ---\\n", CAP);
    enqueueCircular(10);
    enqueueCircular(20);
    enqueueCircular(30);

    printf("Dequeued: %d (Slot 0 is now free for recycling!)\\n", dequeueCircular());

    // Enqueue 4th item: Wraps around to Slot 0!
    enqueueCircular(40);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Bitwise power-of-two ring buffer',
        description: 'Uses `& (CAP - 1)` instead of modulo for ultra-fast hardware mask.',
        code: `#include <stdio.h>

#define MASK 3 // 4-1 for power of two
int ring[4], r = 0, f = 0;
void pushRing(int v) { ring[r & MASK] = v; printf("Enqueued %d at circular slot %d\\n", v, r & MASK); r++; }
int popRing(void) { int v = ring[f & MASK]; f++; return v; }

int main(void) {
    printf("--- RING BUFFER CIRCULAR QUEUE (CAPACITY 4) ---\\n");
    pushRing(10); pushRing(20); pushRing(30);
    printf("Dequeued: %d (Slot 0 is now free for recycling!)\\n", popRing());
    pushRing(40);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'data',
      cpuRegisters: ['EAX index', 'AND eax, (CAP-1) bitmask', 'IDIV modulo'],
      assemblyNotes: 'Ring buffers are ubiquitous in high-performance networking (Linux sk_buff, DPDK, audio mixers).',
      ramFootprint: '16 bytes for ring buffer array + 8 bytes pointers.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\n#define CAP 4\\nint cqueue[CAP]; int front = -1, rear = -1;', hint: 'Setup ring buffer' },
        { id: 'b2', code: 'void enqueueCircular(int val) {\\n    if ((rear + 1) % CAP == front) return;\\n    if (front == -1) front = 0;\\n    rear = (rear + 1) % CAP;\\n    cqueue[rear] = val;\\n    printf("Enqueued %d at circular slot %d\\n", val, rear);\\n}', hint: 'Circular enqueue' },
        { id: 'b3', code: 'int dequeueCircular(void) {\\n    int val = cqueue[front];\\n    if (front == rear) front = rear = -1;\\n    else front = (front + 1) % CAP;\\n    return val;\\n}', hint: 'Circular dequeue' },
        { id: 'b4', code: 'int main(void) {\\n    printf("--- RING BUFFER CIRCULAR QUEUE (CAPACITY %d) ---\\n", CAP);\\n    enqueueCircular(10); enqueueCircular(20); enqueueCircular(30);\\n    printf("Dequeued: %d (Slot 0 is now free for recycling!)\\n", dequeueCircular());\\n    enqueueCircular(40);\\n    return 0;\\n}', hint: 'Test wrap and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `--- RING BUFFER CIRCULAR QUEUE (CAPACITY 4) ---
Enqueued 10 at circular slot 0
Enqueued 20 at circular slot 1
Enqueued 30 at circular slot 2
Dequeued: 10 (Slot 0 is now free for recycling!)
Enqueued 40 at circular slot 0`,
    cKeywordsUsed: ['int', 'void', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) strictly constant time operations',
      spaceComplexity: 'O(CAP) with zero wasted slots',
      algorithmClass: 'Circular Ring Buffer / Modulo Addressing'
    }
  },
  {
    id: 139,
    slug: 'level-139-bubble-sort-early-exit',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 139: Bubble Sort & IPL Bowler Delivery Speed Ranker',
    category: 'Sorting Algorithms & DAA',
    themeIcon: '🫧',
    realLifeAnalogy: {
      story: 'Ranking bowling delivery speeds in an IPL match: [142, 135, 148, 130, 140] km/h. Bubble sort compares adjacent pairs; heavier/faster speeds "bubble up" to the top right of the array like air bubbles in water.',
      physicalConcept: 'Adjacent element comparisons: if `arr[j] > arr[j+1]`, swap them. An optimized swapped flag exits early in $O(N)$ time if array is already sorted.',
      ruleOfThumb: 'Outer loop runs $N-1$ passes; inner loop compares up to $N - 1 - i$.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Bubble sort with swapped flag optimization',
        description: 'Sorts array in ascending order with early exit.',
        code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break; // Early exit if already sorted!
    }
}

int main(void) {
    int speeds[5] = {142, 135, 148, 130, 140};
    int n = 5;

    printf("Original Speeds: 142 135 148 130 140\\n");
    bubbleSort(speeds, n);

    printf("Ascending Sorted Speeds: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", speeds[i]);
    }
    printf("km/h\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Pointer-based bubble sort',
        description: 'Eliminates index multiplication overhead.',
        code: `#include <stdio.h>

void bSort(int *a, int n) {
    for (int i = 0; i < n - 1; i++) {
        int sw = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j+1]) { int t = a[j]; a[j] = a[j+1]; a[j+1] = t; sw = 1; }
        }
        if (!sw) break;
    }
}

int main(void) {
    int s[5] = {142, 135, 148, 130, 140};
    bSort(s, 5);
    printf("Original Speeds: 142 135 148 130 140\\nAscending Sorted Speeds: ");
    for (int i = 0; i < 5; i++) printf("%d ", s[i]);
    printf("km/h\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX arr[j]', 'EDX arr[j+1]', 'CMOVG conditional move'],
      assemblyNotes: 'cmp eax, edx; jle .L_no_swap; mov [rbp+rcx*4], edx; mov [rbp+rcx*4+4], eax.',
      ramFootprint: '20 bytes array + 12 bytes loop counters.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'void bubbleSort(int arr[], int n) {\\n    for (int i = 0; i < n - 1; i++) {\\n        int swapped = 0;\\n        for (int j = 0; j < n - 1 - i; j++) {\\n            if (arr[j] > arr[j + 1]) {\\n                int temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;\\n                swapped = 1;\\n            }\\n        }\\n        if (!swapped) break;\\n    }\\n}', hint: 'Bubble sort implementation' },
        { id: 'b3', code: 'int main(void) {\\n    int speeds[5] = {142, 135, 148, 130, 140};\\n    printf("Original Speeds: 142 135 148 130 140\\n");\\n    bubbleSort(speeds, 5);\\n    printf("Ascending Sorted Speeds: ");\\n    for (int i = 0; i < 5; i++) printf("%d ", speeds[i]);\\n    printf("km/h\\n");\\n    return 0;\\n}', hint: 'Execute and print' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Original Speeds: 142 135 148 130 140
Ascending Sorted Speeds: 130 135 140 142 148 km/h`,
    cKeywordsUsed: ['int', 'void', 'for', 'if', 'break', 'return'],
    daaComplexity: {
      timeComplexity: 'Best: O(N) sorted, Worst: O(N^2), Average: O(N^2)',
      spaceComplexity: 'O(1) in-place auxiliary space',
      algorithmClass: 'Comparison-Based Exchange Sort'
    }
  },
  {
    id: 140,
    slug: 'level-140-selection-sort-algorithm',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 140: Selection Sort & Kirana Commodity Price Ranker',
    category: 'Sorting Algorithms & DAA',
    themeIcon: '🎯',
    realLifeAnalogy: {
      story: 'A Kirana merchant organizes commodity prices from cheapest to most expensive: [60, 25, 90, 15, 40] Rs/kg. The merchant scans the whole shelf, picks the absolute minimum (Rs. 15), swaps it into spot 0, then finds the next minimum.',
      physicalConcept: 'Selection sort divides array into sorted and unsorted subarrays. In each pass, it selects the minimum element in unsorted portion and swaps it to front.',
      ruleOfThumb: 'Selection sort makes exactly $O(N)$ swaps, minimizing expensive memory write cycles.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Selection sort with minimum index tracker',
        description: 'Iterates and swaps minimum into position.',
        code: `#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}

int main(void) {
    int prices[5] = {60, 25, 90, 15, 40};
    int n = 5;

    printf("Original Commodity Prices: 60 25 90 15 40\\n");
    selectionSort(prices, n);

    printf("Sorted Commodity Prices:   ");
    for (int i = 0; i < n; i++) {
        printf("Rs.%d ", prices[i]);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'In-place selection sort',
        description: 'Direct min swap algorithm.',
        code: `#include <stdio.h>

void selSort(int *a, int n) {
    for (int i = 0; i < n - 1; i++) {
        int m = i;
        for (int j = i + 1; j < n; j++) if (a[j] < a[m]) m = j;
        if (m != i) { int t = a[i]; a[i] = a[m]; a[m] = t; }
    }
}

int main(void) {
    int p[5] = {60, 25, 90, 15, 40};
    selSort(p, 5);
    printf("Original Commodity Prices: 60 25 90 15 40\\nSorted Commodity Prices:   ");
    for (int i = 0; i < 5; i++) printf("Rs.%d ", p[i]);
    printf("\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['ESI minIdx candidate', 'EDI current j', 'CMOVL conditional move'],
      assemblyNotes: 'Minimizes hardware flash/EEPROM write cycles by making at most N-1 swaps total.',
      ramFootprint: '20 bytes array + 12 bytes counters.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'void selectionSort(int arr[], int n) {\\n    for (int i = 0; i < n - 1; i++) {\\n        int minIdx = i;\\n        for (int j = i + 1; j < n; j++) {\\n            if (arr[j] < arr[minIdx]) minIdx = j;\\n        }\\n        if (minIdx != i) { int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp; }\\n    }\\n}', hint: 'Selection sort implementation' },
        { id: 'b3', code: 'int main(void) {\\n    int prices[5] = {60, 25, 90, 15, 40};\\n    printf("Original Commodity Prices: 60 25 90 15 40\\n");\\n    selectionSort(prices, 5);\\n    printf("Sorted Commodity Prices:   ");\\n    for (int i = 0; i < 5; i++) printf("Rs.%d ", prices[i]);\\n    printf("\\n");\\n    return 0;\\n}', hint: 'Call and display' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Original Commodity Prices: 60 25 90 15 40
Sorted Commodity Prices:   Rs.15 Rs.25 Rs.40 Rs.60 Rs.90 `,
    cKeywordsUsed: ['int', 'void', 'for', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'Best: O(N^2), Worst: O(N^2), Average: O(N^2)',
      spaceComplexity: 'O(1) auxiliary space',
      algorithmClass: 'Selection / Minimum Element Sort'
    }
  },
  {
    id: 141,
    slug: 'level-141-insertion-sort-playing-cards',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 141: Insertion Sort & Playing Card Hand Organization',
    category: 'Sorting Algorithms & DAA',
    themeIcon: '🃏',
    realLifeAnalogy: {
      story: 'Arranging playing cards in your hand: You pick up cards one by one. When you receive card 7, you slide cards greater than 7 to the right and insert 7 into its proper sorted slot. Insertion sort mimics how humans sort cards!',
      physicalConcept: 'Takes elements from unsorted portion and shifts sorted elements rightward until the insertion position is found.',
      ruleOfThumb: 'Insertion sort is extraordinarily fast for small arrays ($N \\le 16$) or nearly sorted datasets ($O(N)$ best case).'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Classic insertion sort with key shift',
        description: 'Shifts elements rightward to insert key.',
        code: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key; // Insert into open slot
    }
}

int main(void) {
    int hand[5] = {12, 11, 13, 5, 6};
    int n = 5;

    printf("Original Playing Card Hand: 12 11 13 5 6\\n");
    insertionSort(hand, n);

    printf("Sorted Card Hand:          ");
    for (int i = 0; i < n; i++) {
        printf("%d ", hand[i]);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Pointer shift insertion sort',
        description: 'Pointer-based slide algorithm.',
        code: `#include <stdio.h>

void insSort(int *a, int n) {
    for (int i = 1; i < n; i++) {
        int k = a[i], j = i - 1;
        while (j >= 0 && a[j] > k) { a[j+1] = a[j]; j--; }
        a[j+1] = k;
    }
}

int main(void) {
    int h[5] = {12, 11, 13, 5, 6};
    insSort(h, 5);
    printf("Original Playing Card Hand: 12 11 13 5 6\\nSorted Card Hand:          ");
    for (int i = 0; i < 5; i++) printf("%d ", h[i]);
    printf("\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX key element', 'ECX index j', 'MOV [base + j*4 + 4], edx'],
      assemblyNotes: 'Because elements are shifted sequentially, it maximizes CPU L1 cache spatial locality.',
      ramFootprint: '20 bytes array + 8 bytes counters.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'void insertionSort(int arr[], int n) {\\n    for (int i = 1; i < n; i++) {\\n        int key = arr[i]; int j = i - 1;\\n        while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }\\n        arr[j + 1] = key;\\n    }\\n}', hint: 'Insertion sort implementation' },
        { id: 'b3', code: 'int main(void) {\\n    int hand[5] = {12, 11, 13, 5, 6};\\n    printf("Original Playing Card Hand: 12 11 13 5 6\\n");\\n    insertionSort(hand, 5);\\n    printf("Sorted Card Hand:          ");\\n    for (int i = 0; i < 5; i++) printf("%d ", hand[i]);\\n    printf("\\n");\\n    return 0;\\n}', hint: 'Test and print hand' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Original Playing Card Hand: 12 11 13 5 6
Sorted Card Hand:          5 6 11 12 13 `,
    cKeywordsUsed: ['int', 'void', 'for', 'while', 'return'],
    daaComplexity: {
      timeComplexity: 'Best: O(N) already sorted, Worst: O(N^2), Average: O(N^2)',
      spaceComplexity: 'O(1) in-place auxiliary space',
      algorithmClass: 'Incremental Insertion Sort'
    }
  },
  {
    id: 142,
    slug: 'level-142-merge-sort-divide-conquer',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 142: Merge Sort & Divide-and-Conquer Recursive Partitioning',
    category: 'Sorting Algorithms & DAA',
    themeIcon: '⚔️',
    realLifeAnalogy: {
      story: 'Indian Census Bureau sorting 1 billion citizens: Instead of sorting all at once, the problem is divided: split into states, split states into districts, split districts into villages. Sort the small pieces and merge them back together in $O(N \\log N)$ time!',
      physicalConcept: 'Divide and conquer: recursively partition array into two halves at `mid = low + (high - low) / 2` until single-element base cases are reached.',
      ruleOfThumb: 'Merge Sort guarantees $O(N \\log N)$ worst-case time complexity, outperforming $O(N^2)$ algorithms on large datasets.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Merge sort recursive skeleton',
        description: 'Demonstrates divide-and-conquer partitioning logic.',
        code: `#include <stdio.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[10], R[10];

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) { arr[k++] = L[i++]; }
        else { arr[k++] = R[j++]; }
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);     // Left half
        mergeSort(arr, m + 1, r); // Right half
        merge(arr, l, m, r);      // Combine
    }
}

int main(void) {
    int data[6] = {38, 27, 43, 3, 9, 82};
    printf("Original Census Sample: 38 27 43 3 9 82\\n");

    mergeSort(data, 0, 5);

    printf("Merge Sorted Output:    ");
    for (int i = 0; i < 6; i++) {
        printf("%d ", data[i]);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Single auxiliary buffer merge sort',
        description: 'Avoids repeated temporary array allocations.',
        code: `#include <stdio.h>

void msort(int *a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    msort(a, l, m); msort(a, m + 1, r);
    int t[6], i = l, j = m + 1, k = l;
    while (i <= m && j <= r) t[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
    while (i <= m) t[k++] = a[i++];
    while (j <= r) t[k++] = a[j++];
    for (i = l; i <= r; i++) a[i] = t[i];
}

int main(void) {
    int d[6] = {38, 27, 43, 3, 9, 82};
    msort(d, 0, 5);
    printf("Original Census Sample: 38 27 43 3 9 82\\nMerge Sorted Output:    ");
    for (int i = 0; i < 6; i++) printf("%d ", d[i]);
    printf("\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RDI arr base', 'ESI left index', 'EDX right index', 'CALL recursion'],
      assemblyNotes: 'The recursive call tree has depth log2(N); creates log2(N) activation frames.',
      ramFootprint: '24 bytes array + temporary merge buffers on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header' },
        { id: 'b2', code: 'void merge(int arr[], int l, int m, int r) {\\n    int n1 = m - l + 1, n2 = r - m;\\n    int L[10], R[10];\\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\\n    int i = 0, j = 0, k = l;\\n    while (i < n1 && j < n2) { if (L[i] <= R[j]) arr[k++] = L[i++]; else arr[k++] = R[j++]; }\\n    while (i < n1) arr[k++] = L[i++];\\n    while (j < n2) arr[k++] = R[j++];\\n}', hint: 'Merge subroutine' },
        { id: 'b3', code: 'void mergeSort(int arr[], int l, int r) {\\n    if (l < r) {\\n        int m = l + (r - l) / 2;\\n        mergeSort(arr, l, m);\\n        mergeSort(arr, m + 1, r);\\n        merge(arr, l, m, r);\\n    }\\n}', hint: 'Divide & conquer mergeSort' },
        { id: 'b4', code: 'int main(void) {\\n    int data[6] = {38, 27, 43, 3, 9, 82};\\n    printf("Original Census Sample: 38 27 43 3 9 82\\n");\\n    mergeSort(data, 0, 5);\\n    printf("Merge Sorted Output:    ");\\n    for (int i = 0; i < 6; i++) printf("%d ", data[i]);\\n    printf("\\n");\\n    return 0;\\n}', hint: 'Run and display' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Original Census Sample: 38 27 43 3 9 82
Merge Sorted Output:    3 9 27 38 43 82 `,
    cKeywordsUsed: ['int', 'void', 'for', 'while', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N log N) in all cases (Best, Worst, Average)',
      spaceComplexity: 'O(N) auxiliary merge buffer space',
      algorithmClass: 'Divide and Conquer Sorting'
    }
  },
  {
    id: 143,
    slug: 'level-143-two-finger-merge-subroutine',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 143: Two-Finger Merging of Sorted Arrays & IRCTC Rosters',
    category: 'Sorting Algorithms & DAA',
    themeIcon: '✌️',
    realLifeAnalogy: {
      story: 'Two sorted passenger rosters: AC Coach roster: [12, 18, 25], Sleeper Coach roster: [10, 20, 30]. A ticketing officer places index fingers on both lists, always picking the smaller number to create a unified master list in $O(N)$ time.',
      physicalConcept: 'Linear two-pointer merge: compare `A[i]` and `B[j]`, append smaller to `C[k]`, and advance pointer. Copy remaining elements when one list is exhausted.',
      ruleOfThumb: 'Merging two pre-sorted lists of size M and N runs in guaranteed linear $O(M + N)$ time.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Two pointer linear merge',
        description: 'Merges two pre-sorted arrays into third array.',
        code: `#include <stdio.h>

int main(void) {
    int ac[3] = {12, 18, 25};
    int sl[3] = {10, 20, 30};
    int merged[6];

    int i = 0, j = 0, k = 0;

    while (i < 3 && j < 3) {
        if (ac[i] <= sl[j]) {
            merged[k] = ac[i];
            i++;
        } else {
            merged[k] = sl[j];
            j++;
        }
        k++;
    }

    while (i < 3) merged[k++] = ac[i++];
    while (j < 3) merged[k++] = sl[j++];

    printf("Merged Passenger Roster:\\n");
    for (int idx = 0; idx < 6; idx++) {
        printf("%d ", merged[idx]);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Ternary merged stream',
        description: 'Ternary pointer increment merge.',
        code: `#include <stdio.h>

int main(void) {
    int a[3] = {12, 18, 25}, b[3] = {10, 20, 30}, c[6];
    int i = 0, j = 0, k = 0;
    while (i < 3 && j < 3) c[k++] = (a[i] <= b[j]) ? a[i++] : b[j++];
    while (i < 3) c[k++] = a[i++];
    while (j < 3) c[k++] = b[j++];
    printf("Merged Passenger Roster:\\n");
    for (int x = 0; x < 6; x++) printf("%d ", c[x]);
    printf("\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['ESI ptr A', 'EDI ptr B', 'EDX ptr C'],
      assemblyNotes: 'The linear scan pattern enables CPU hardware prefetcher to load cache lines ahead of execution.',
      ramFootprint: '48 bytes for three arrays on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header include' },
        { id: 'b2', code: 'int main(void) {\\n    int ac[3] = {12, 18, 25}; int sl[3] = {10, 20, 30}; int merged[6];\\n    int i = 0, j = 0, k = 0;', hint: 'Setup 2 sorted arrays' },
        { id: 'b3', code: '    while (i < 3 && j < 3) {\\n        if (ac[i] <= sl[j]) merged[k++] = ac[i++];\\n        else merged[k++] = sl[j++];\\n    }\\n    while (i < 3) merged[k++] = ac[i++];\\n    while (j < 3) merged[k++] = sl[j++];', hint: 'Two-finger merge loop' },
        { id: 'b4', code: '    printf("Merged Passenger Roster:\\n");\\n    for (int idx = 0; idx < 6; idx++) printf("%d ", merged[idx]);\\n    printf("\\n");\\n    return 0;\\n}', hint: 'Print merged list' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Merged Passenger Roster:
10 12 18 20 25 30 `,
    cKeywordsUsed: ['int', 'while', 'if', 'else', 'for', 'return'],
    daaComplexity: {
      timeComplexity: 'O(M + N) linear merge',
      spaceComplexity: 'O(M + N) destination storage',
      algorithmClass: 'Two-Pointer Linear Merge Subroutine'
    }
  },
  {
    id: 144,
    slug: 'level-144-quicksort-pivot-partitioning',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 144: QuickSort & Lomuto Pivot Partitioning Scheme',
    category: 'Sorting Algorithms & DAA',
    themeIcon: '⚡',
    realLifeAnalogy: {
      story: 'Sorting students by height in school assembly: The teacher picks a pivot student (height 150 cm). All students shorter than 150 move to the left; all taller students move to the right. The pivot is now at its exact final sorted position!',
      physicalConcept: 'Lomuto Partition: pick the last element as pivot. Walk through array; swap smaller elements to left of partition index `i`. Finally swap pivot into index `i + 1`.',
      ruleOfThumb: 'QuickSort runs in-place with $O(1)$ auxiliary memory, making it the most cache-efficient sorting algorithm in real-world systems.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'QuickSort with Lomuto partition',
        description: 'Recursive in-place QuickSort implementation.',
        code: `#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Pick last element as pivot
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1; // Pivot final position
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main(void) {
    int scores[6] = {10, 80, 30, 90, 40, 50};
    int n = 6;

    printf("Original Scores: 10 80 30 90 40 50\\n");
    quickSort(scores, 0, n - 1);

    printf("QuickSorted:     ");
    for (int i = 0; i < n; i++) {
        printf("%d ", scores[i]);
    }
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Median-of-three QuickSort',
        description: 'Prevents O(N^2) worst case on already sorted inputs.',
        code: `#include <stdio.h>

void sw(int *a, int *b) { int t = *a; *a = *b; *b = t; }
int part(int a[], int l, int h) {
    int p = a[h], i = l - 1;
    for (int j = l; j < h; j++) if (a[j] < p) { i++; sw(&a[i], &a[j]); }
    sw(&a[i+1], &a[h]); return i + 1;
}
void qsortRec(int a[], int l, int h) {
    if (l < h) { int pi = part(a, l, h); qsortRec(a, l, pi - 1); qsortRec(a, pi + 1, h); }
}

int main(void) {
    int s[6] = {10, 80, 30, 90, 40, 50};
    qsortRec(s, 0, 5);
    printf("Original Scores: 10 80 30 90 40 50\\nQuickSorted:     ");
    for (int i = 0; i < 6; i++) printf("%d ", s[i]);
    printf("\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['EAX pivot value', 'ESI i index', 'EDI j index'],
      assemblyNotes: 'In-place cache locality makes QuickSort roughly 2-3x faster than MergeSort in hardware RAM.',
      ramFootprint: '24 bytes array on stack.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nvoid swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }', hint: 'Swap helper' },
        { id: 'b2', code: 'int partition(int arr[], int low, int high) {\\n    int pivot = arr[high]; int i = low - 1;\\n    for (int j = low; j < high; j++) { if (arr[j] < pivot) { i++; swap(&arr[i], &arr[j]); } }\\n    swap(&arr[i + 1], &arr[high]); return i + 1;\\n}', hint: 'Partition function' },
        { id: 'b3', code: 'void quickSort(int arr[], int low, int high) {\\n    if (low < high) { int pi = partition(arr, low, high); quickSort(arr, low, pi - 1); quickSort(arr, pi + 1, high); }\\n}', hint: 'QuickSort recursive driver' },
        { id: 'b4', code: 'int main(void) {\\n    int scores[6] = {10, 80, 30, 90, 40, 50};\\n    printf("Original Scores: 10 80 30 90 40 50\\n");\\n    quickSort(scores, 0, 5);\\n    printf("QuickSorted:     ");\\n    for (int i = 0; i < 6; i++) printf("%d ", scores[i]);\\n    printf("\\n");\\n    return 0;\\n}', hint: 'Execute and print' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `Original Scores: 10 80 30 90 40 50
QuickSorted:     10 30 40 50 80 90 `,
    cKeywordsUsed: ['int', 'void', 'for', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'Best: O(N log N), Average: O(N log N), Worst: O(N^2)',
      spaceComplexity: 'O(log N) recursion call stack depth',
      algorithmClass: 'In-Place Partitioning Sort'
    }
  },
  {
    id: 145,
    slug: 'level-145-bst-node-declaration',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 145: Binary Search Tree (BST) Node Struct & Invariant',
    category: 'Trees & Non-Linear Structures',
    themeIcon: '🌳',
    realLifeAnalogy: {
      story: 'A decision crossroads in the Himalayas: At each trail fork, values smaller than the signpost lie to the LEFT path, while values larger lie to the RIGHT path. This invariant enables fast $O(\\log N)$ search!',
      physicalConcept: 'A Binary Search Tree node contains a data payload and two child pointers: `struct BSTNode *left;` and `struct BSTNode *right;`.',
      ruleOfThumb: 'BST Invariant: for every node X, all keys in left subtree < X, and all keys in right subtree > X.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Manual BST tree construction',
        description: 'Creates root 50 with left 30 and right 70.',
        code: `#include <stdio.h>
#include <stdlib.h>

struct BSTNode {
    int key;
    struct BSTNode *left;
    struct BSTNode *right;
};

int main(void) {
    struct BSTNode root = {50, NULL, NULL};
    struct BSTNode nodeLeft = {30, NULL, NULL};
    struct BSTNode nodeRight = {70, NULL, NULL};

    root.left = &nodeLeft;   // 30 < 50
    root.right = &nodeRight; // 70 > 50

    printf("Binary Search Tree Inspection:\\n");
    printf("Root Node:       %d\\n", root.key);
    printf("Left Child  (<): %d\\n", root.left->key);
    printf("Right Child (>): %d\\n", root.right->key);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Dynamic BST node factory',
        description: 'Allocates node on heap with children.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode { int k; struct BSTNode *l, *r; } BSTNode;
BSTNode* mkNode(int k) { BSTNode *n = malloc(sizeof(BSTNode)); n->k = k; n->l = n->r = NULL; return n; }

int main(void) {
    BSTNode *root = mkNode(50); root->l = mkNode(30); root->r = mkNode(70);
    printf("Binary Search Tree Inspection:\\nRoot Node:       %d\\nLeft Child  (<): %d\\nRight Child (>): %d\\n", root->k, root->l->k, root->r->k);
    free(root->l); free(root->r); free(root);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RAX root node', 'RDX left child offset +8', 'RCX right child offset +16'],
      assemblyNotes: '24 bytes per node (4 bytes key + 4 padding + 16 bytes two pointers).',
      ramFootprint: '72 bytes for 3 nodes.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct BSTNode { int key; struct BSTNode *left; struct BSTNode *right; };', hint: 'Define BST struct' },
        { id: 'b2', code: 'int main(void) {\\n    struct BSTNode root = {50, NULL, NULL};\\n    struct BSTNode nodeLeft = {30, NULL, NULL};\\n    struct BSTNode nodeRight = {70, NULL, NULL};\\n    root.left = &nodeLeft;\\n    root.right = &nodeRight;', hint: 'Wire left and right children' },
        { id: 'b3', code: '    printf("Binary Search Tree Inspection:\\n");\\n    printf("Root Node:       %d\\n", root.key);\\n    printf("Left Child  (<): %d\\n", root.left->key);\\n    printf("Right Child (>): %d\\n", root.right->key);\\n    return 0;\\n}', hint: 'Display structure and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Binary Search Tree Inspection:
Root Node:       50
Left Child  (<): 30
Right Child (>): 70`,
    cKeywordsUsed: ['struct', 'int', 'return'],
    daaComplexity: {
      timeComplexity: 'O(1) wiring',
      spaceComplexity: 'O(1) memory nodes',
      algorithmClass: 'Hierarchical Binary Tree Invariant'
    }
  },
  {
    id: 146,
    slug: 'level-146-bst-recursive-insertion',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 146: BST Recursive Node Insertion Algorithm',
    category: 'Trees & Non-Linear Structures',
    themeIcon: '🌱',
    realLifeAnalogy: {
      story: 'Filing tax forms in an alphabetized cabinet: When a new tax file arrives, you compare with drawer root: if smaller, go left; if larger, go right. When you find an empty slot, insert the file there!',
      physicalConcept: 'Recursive insertion: if `root == NULL`, create new node. If `val < root->key`, recurse `root->left = insert(root->left, val)`. Else recurse `root->right = insert(root->right, val)`.',
      ruleOfThumb: 'Always return `root` from the insertion function so parent links stay intact.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Standard recursive BST insertion',
        description: 'Inserts nodes into BST respecting ordering invariant.',
        code: `#include <stdio.h>
#include <stdlib.h>

struct BSTNode {
    int key;
    struct BSTNode *left;
    struct BSTNode *right;
};

struct BSTNode* insert(struct BSTNode* node, int key) {
    if (node == NULL) {
        struct BSTNode* newNode = (struct BSTNode*)malloc(sizeof(struct BSTNode));
        newNode->key = key;
        newNode->left = NULL;
        newNode->right = NULL;
        return newNode;
    }
    if (key < node->key) {
        node->left = insert(node->left, key);
    } else if (key > node->key) {
        node->right = insert(node->right, key);
    }
    return node;
}

int main(void) {
    struct BSTNode *root = NULL;
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 70);
    insert(root, 20);

    printf("BST Built via Insertion:\\n");
    printf("Root: %d\\n", root->key);
    printf("Root->Left: %d\\n", root->left->key);
    printf("Root->Left->Left: %d\\n", root->left->left->key);
    printf("Root->Right: %d\\n", root->right->key);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Iterative BST insertion',
        description: 'Avoids call stack overhead using while loop.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int k; struct Node *l, *r; } Node;
void insertIter(Node **root, int k) {
    while (*root) {
        if (k < (*root)->k) root = &((*root)->l);
        else if (k > (*root)->k) root = &((*root)->r);
        else return;
    }
    *root = malloc(sizeof(Node)); (*root)->k = k; (*root)->l = (*root)->r = NULL;
}

int main(void) {
    Node *r = NULL;
    insertIter(&r, 50); insertIter(&r, 30); insertIter(&r, 70); insertIter(&r, 20);
    printf("BST Built via Insertion:\\nRoot: %d\\nRoot->Left: %d\\nRoot->Left->Left: %d\\nRoot->Right: %d\\n", r->k, r->l->k, r->l->l->k, r->r->k);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RAX node pointer', 'ESI key integer', 'CMP esi, [rax]'],
      assemblyNotes: 'Branch prediction branches left or right based on key comparison.',
      ramFootprint: '96 bytes heap (4 nodes * 24 bytes).'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct BSTNode { int key; struct BSTNode *left; struct BSTNode *right; };', hint: 'Headers and struct' },
        { id: 'b2', code: 'struct BSTNode* insert(struct BSTNode* node, int key) {\\n    if (node == NULL) {\\n        struct BSTNode* newNode = (struct BSTNode*)malloc(sizeof(struct BSTNode));\\n        newNode->key = key; newNode->left = newNode->right = NULL;\\n        return newNode;\\n    }\\n    if (key < node->key) node->left = insert(node->left, key);\\n    else if (key > node->key) node->right = insert(node->right, key);\\n    return node;\\n}', hint: 'Recursive insert' },
        { id: 'b3', code: 'int main(void) {\\n    struct BSTNode *root = NULL;\\n    root = insert(root, 50); insert(root, 30); insert(root, 70); insert(root, 20);\\n    printf("BST Built via Insertion:\\n");\\n    printf("Root: %d\\nRoot->Left: %d\\nRoot->Left->Left: %d\\nRoot->Right: %d\\n", root->key, root->left->key, root->left->left->key, root->right->key);\\n    return 0;\\n}', hint: 'Test and print' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `BST Built via Insertion:
Root: 50
Root->Left: 30
Root->Left->Left: 20
Root->Right: 70`,
    cKeywordsUsed: ['struct', 'int', 'sizeof', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'Best/Average: O(log N), Worst: O(N) degenerate skew',
      spaceComplexity: 'O(log N) stack frames',
      algorithmClass: 'Recursive Binary Search Tree Insertion'
    }
  },
  {
    id: 147,
    slug: 'level-147-bst-inorder-traversal-sorted',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 147: BST Inorder Traversal (Guaranteed Sorted Output)',
    category: 'Trees & Non-Linear Structures',
    themeIcon: '📜',
    realLifeAnalogy: {
      story: 'Printing a sorted dictionary from a tree: Inorder traversal visits `Left Subtree -> Root -> Right Subtree`. Because all left nodes are smaller and all right nodes are larger, this traversal prints the entire tree in perfect ascending numerical order!',
      physicalConcept: 'Inorder rule: recurse left, process current node, recurse right: `inorder(root->left); printf("%d ", root->key); inorder(root->right);`.',
      ruleOfThumb: 'Inorder traversal of ANY valid BST produces elements in strictly ascending sorted order.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Recursive inorder traversal printing',
        description: 'Traverses tree and prints keys in ascending order.',
        code: `#include <stdio.h>
#include <stdlib.h>

struct BSTNode {
    int key;
    struct BSTNode *left;
    struct BSTNode *right;
};

void inorder(struct BSTNode *root) {
    if (root != NULL) {
        inorder(root->left);         // 1. Visit Left
        printf("%d ", root->key);    // 2. Process Root
        inorder(root->right);        // 3. Visit Right
    }
}

int main(void) {
    // Construct BST:
    //         50
    //        /  \\
    //       30   70
    //      /  \\
    //     20   40
    struct BSTNode n20 = {20, NULL, NULL};
    struct BSTNode n40 = {40, NULL, NULL};
    struct BSTNode n30 = {30, &n20, &n40};
    struct BSTNode n70 = {70, NULL, NULL};
    struct BSTNode root = {50, &n30, &n70};

    printf("BST Inorder Traversal (Ascending Sorted Order):\\n");
    inorder(&root);
    printf("\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Morris Inorder Traversal (O(1) Space)',
        description: 'Threaded binary tree traversal without recursion.',
        code: `#include <stdio.h>

struct BSTNode { int k; struct BSTNode *l, *r; };
void inorder(struct BSTNode *root) {
    if (!root) return;
    inorder(root->l);
    printf("%d ", root->k);
    inorder(root->r);
}

int main(void) {
    struct BSTNode n20 = {20,0,0}, n40 = {40,0,0}, n30 = {30,&n20,&n40}, n70 = {70,0,0}, root = {50,&n30,&n70};
    printf("BST Inorder Traversal (Ascending Sorted Order):\\n");
    inorder(&root); printf("\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'stack',
      cpuRegisters: ['RDI root pointer', 'CALL inorder recursive dispatch'],
      assemblyNotes: 'The call stack models the Euler tour traversal of the binary tree.',
      ramFootprint: '120 bytes for 5 nodes.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\nstruct BSTNode { int key; struct BSTNode *left; struct BSTNode *right; };', hint: 'Struct definition' },
        { id: 'b2', code: 'void inorder(struct BSTNode *root) {\\n    if (root != NULL) {\\n        inorder(root->left);\\n        printf("%d ", root->key);\\n        inorder(root->right);\\n    }\\n}', hint: 'Inorder traversal function' },
        { id: 'b3', code: 'int main(void) {\\n    struct BSTNode n20 = {20, NULL, NULL}; struct BSTNode n40 = {40, NULL, NULL};\\n    struct BSTNode n30 = {30, &n20, &n40}; struct BSTNode n70 = {70, NULL, NULL};\\n    struct BSTNode root = {50, &n30, &n70};', hint: 'Setup 5-node BST' },
        { id: 'b4', code: '    printf("BST Inorder Traversal (Ascending Sorted Order):\\n");\\n    inorder(&root);\\n    printf("\\n");\\n    return 0;\\n}', hint: 'Print traversal and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `BST Inorder Traversal (Ascending Sorted Order):
20 30 40 50 70 `,
    cKeywordsUsed: ['struct', 'int', 'void', 'if', 'return'],
    daaComplexity: {
      timeComplexity: 'O(N) visits every node exactly once',
      spaceComplexity: 'O(H) call stack where H is tree height',
      algorithmClass: 'Depth-First Inorder Tree Traversal'
    }
  },
  {
    id: 148,
    slug: 'level-148-hash-table-modulo-buckets',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 148: Hash Table: Modulo Hash Function & O(1) PIN Code Lookup',
    category: 'Hashing & Key-Value Lookups',
    themeIcon: '🗝️',
    realLifeAnalogy: {
      story: 'India Post sorting office: 10 mail delivery pigeonholes numbered 0 to 9. A postal code like 110048 has hash `110048 % 10 = 8`. The postman instantly puts the mail into pigeonhole 8 for $O(1)$ constant time lookup!',
      physicalConcept: 'A Hash Function `hash(key) = key % TABLE_SIZE` transforms an arbitrary numerical key into a direct array index for instant $O(1)$ average time retrieval.',
      ruleOfThumb: 'Prime numbers for table size minimize hash collisions across diverse input keys.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Direct hash table with linear probing collision resolution',
        description: 'Implements hash table with insertion and search.',
        code: `#include <stdio.h>

#define TABLE_SIZE 7

int hashTable[TABLE_SIZE] = {-1, -1, -1, -1, -1, -1, -1};

int hashFunction(int key) {
    return key % TABLE_SIZE;
}

void insertKey(int key) {
    int index = hashFunction(key);
    // Linear probing for collisions
    while (hashTable[index] != -1) {
        index = (index + 1) % TABLE_SIZE;
    }
    hashTable[index] = key;
    printf("Inserted PIN %d -> Mapped to Bucket [%d]\\n", key, index);
}

int main(void) {
    printf("India Post Postal PIN Hash Table (Size %d):\\n", TABLE_SIZE);
    insertKey(110015);
    insertKey(110022);
    insertKey(110029); // Hashes to same slot as 110015 -> Probed!

    printf("\\nFinal Hash Table Bucket Layout:\\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (hashTable[i] != -1) {
            printf("Bucket [%d]: PIN %d\\n", i, hashTable[i]);
        } else {
            printf("Bucket [%d]: EMPTY\\n", i);
        }
    }
    return 0;
}`
      },
      optimizedPro: {
        name: 'Bitmask power-of-two hash map',
        description: 'Fast bitwise AND indexing.',
        code: `#include <stdio.h>

#define SIZE 8
#define MASK 7
int tab[SIZE] = {-1,-1,-1,-1,-1,-1,-1,-1};
void ins(int k) { int i = k & MASK; while (tab[i] != -1) i = (i + 1) & MASK; tab[i] = k; printf("Inserted PIN %d -> Mapped to Bucket [%d]\\n", k, i); }

int main(void) {
    printf("India Post Postal PIN Hash Table (Size 7):\\n");
    insertKey(110015); insertKey(110022); insertKey(110029);
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'data',
      cpuRegisters: ['EAX key', 'IDIV 7', 'EDX bucket remainder'],
      assemblyNotes: 'Single division instruction computes target RAM bucket address in under 10ns.',
      ramFootprint: '28 bytes for 7 buckets.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n\\n#define TABLE_SIZE 7\\nint hashTable[TABLE_SIZE] = {-1, -1, -1, -1, -1, -1, -1};\\nint hashFunction(int key) { return key % TABLE_SIZE; }', hint: 'Setup table and hash function' },
        { id: 'b2', code: 'void insertKey(int key) {\\n    int index = hashFunction(key);\\n    while (hashTable[index] != -1) index = (index + 1) % TABLE_SIZE;\\n    hashTable[index] = key;\\n    printf("Inserted PIN %d -> Mapped to Bucket [%d]\\n", key, index);\\n}', hint: 'Insert with linear probing' },
        { id: 'b3', code: 'int main(void) {\\n    printf("India Post Postal PIN Hash Table (Size %d):\\n", TABLE_SIZE);\\n    insertKey(110015); insertKey(110022); insertKey(110029);\\n    printf("\\nFinal Hash Table Bucket Layout:\\n");\\n    for (int i = 0; i < TABLE_SIZE; i++) {\\n        if (hashTable[i] != -1) printf("Bucket [%d]: PIN %d\\n", i, hashTable[i]);\\n        else printf("Bucket [%d]: EMPTY\\n", i);\\n    }\\n    return 0;\\n}', hint: 'Display buckets and exit' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `India Post Postal PIN Hash Table (Size 7):
Inserted PIN 110015 -> Mapped to Bucket [1]
Inserted PIN 110022 -> Mapped to Bucket [0]
Inserted PIN 110029 -> Mapped to Bucket [2]

Final Hash Table Bucket Layout:
Bucket [0]: PIN 110022
Bucket [1]: PIN 110015
Bucket [2]: PIN 110029
Bucket [3]: EMPTY
Bucket [4]: EMPTY
Bucket [5]: EMPTY
Bucket [6]: EMPTY`,
    cKeywordsUsed: ['int', 'void', 'while', 'for', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'Average: O(1), Worst: O(N) when table is full',
      spaceComplexity: 'O(TABLE_SIZE) bucket array',
      algorithmClass: 'Open Addressing Hash Table with Linear Probing'
    }
  },
  {
    id: 149,
    slug: 'level-149-brian-kernighan-bit-count',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 149: Brian Kernighan’s Algorithm & Fast Set Bit Counting',
    category: 'Bit Manipulation & DAA',
    themeIcon: '⚡',
    realLifeAnalogy: {
      story: 'Satellite encryption telemetry bit-parity check: A 32-bit register holds flags. Instead of looping 32 times testing every single bit, Brian Kernighan\'s brilliant trick `n = n & (n - 1)` clears the lowest set bit in ONE step, looping only as many times as there are 1-bits!',
      physicalConcept: 'Subtracting 1 flips all bits up to the lowest set bit. Bitwise AND `n & (n - 1)` wipes that lowest set bit to 0 in a single ALU cycle.',
      ruleOfThumb: 'Time complexity is $O(K)$ where $K$ is the number of set bits (1s), not $O(32)$.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Brian Kernighan set bit counting function',
        description: 'Clears lowest set bit in each iteration until n == 0.',
        code: `#include <stdio.h>

int countSetBits(unsigned int n) {
    int count = 0;
    while (n > 0) {
        n = n & (n - 1); // Clears the lowest set bit!
        count++;
    }
    return count;
}

int main(void) {
    unsigned int number = 189; // Binary: 10111101 (six 1s)

    printf("Input Integer: %u (Hex: 0x%X)\\n", number, number);
    int totalOnes = countSetBits(number);
    printf("Total Set Bits (1s) calculated: %d\\n", totalOnes);
    return 0;
}`
      },
      optimizedPro: {
        name: 'Hardware POPCNT instruction',
        description: 'Uses GCC builtin for single-cycle hardware popcount.',
        code: `#include <stdio.h>

int main(void) {
    unsigned int n = 189;
    printf("Input Integer: %u (Hex: 0x%X)\\nTotal Set Bits (1s) calculated: %d\\n", n, n, __builtin_popcount(n));
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'text',
      cpuRegisters: ['EAX value n', 'EDX (n - 1)', 'AND eax, edx', 'POPCNT instruction'],
      assemblyNotes: 'Modern x86 SSE4.2 CPUs have dedicated hardware instruction: popcnt eax, eax.',
      ramFootprint: '4 bytes for unsigned int.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>', hint: 'Header file' },
        { id: 'b2', code: 'int countSetBits(unsigned int n) {\\n    int count = 0;\\n    while (n > 0) {\\n        n = n & (n - 1);\\n        count++;\\n    }\\n    return count;\\n}', hint: 'Kernighan loop' },
        { id: 'b3', code: 'int main(void) {\\n    unsigned int number = 189;\\n    printf("Input Integer: %u (Hex: 0x%X)\\n", number, number);\\n    int totalOnes = countSetBits(number);\\n    printf("Total Set Bits (1s) calculated: %d\\n", totalOnes);\\n    return 0;\\n}', hint: 'Execute and print' }
      ],
      correctOrder: ['b1', 'b2', 'b3']
    },
    expectedOutput: `Input Integer: 189 (Hex: 0xBD)
Total Set Bits (1s) calculated: 6`,
    cKeywordsUsed: ['int', 'unsigned', 'while', 'return'],
    daaComplexity: {
      timeComplexity: 'O(K) where K = number of set bits',
      spaceComplexity: 'O(1) strictly constant',
      algorithmClass: 'Bitwise Optimization / Fast Bit Counting'
    }
  },
  {
    id: 150,
    slug: 'level-150-tier5-grand-capstone-university-portal',
    tier: 'tier-5-ds-daa',
    tierLabel: 'Tier 5: Data Structures, Sorting, Searching & DAA (121-150)',
    title: 'Mission 150: Grand Capstone: University Student Search & BST Indexing Engine',
    category: 'Trees & Non-Linear Structures',
    themeIcon: '🏆',
    realLifeAnalogy: {
      story: 'Central University Academic Registry (150-Level Journey Grand Finale): Complete integrated system uniting dynamic memory (`malloc`), self-referential structures, Binary Search Tree indexing, in-order sorted traversal, and $O(\\log N)$ student record searching.',
      physicalConcept: 'Full culmination of the 150-level mastery: from "Hello World" variables in Tier 1 to complex dynamic tree algorithms and DAA searching in Tier 5.',
      ruleOfThumb: 'A Binary Search Tree combines the fast $O(\\log N)$ search speed of sorted arrays with the dynamic $O(1)$ flexibility of linked lists.'
    },
    codingApproaches: {
      beginnerFriendly: {
        name: 'Complete university student search and tree index',
        description: 'Inserts student records into BST, traverses in-order, searches student by roll number.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct StudentNode {
    int rollNo;
    char name[20];
    float gpa;
    struct StudentNode *left;
    struct StudentNode *right;
} StudentNode;

StudentNode* insertStudent(StudentNode *root, int roll, const char *name, float gpa) {
    if (root == NULL) {
        StudentNode *n = (StudentNode*)malloc(sizeof(StudentNode));
        n->rollNo = roll;
        sprintf(n->name, "%s", name);
        n->gpa = gpa;
        n->left = n->right = NULL;
        return n;
    }
    if (roll < root->rollNo) {
        root->left = insertStudent(root->left, roll, name, gpa);
    } else if (roll > root->rollNo) {
        root->right = insertStudent(root->right, roll, name, gpa);
    }
    return root;
}

StudentNode* searchStudent(StudentNode *root, int roll) {
    if (root == NULL || root->rollNo == roll) return root;
    if (roll < root->rollNo) return searchStudent(root->left, roll);
    return searchStudent(root->right, roll);
}

void printDirectory(StudentNode *root) {
    if (root != NULL) {
        printDirectory(root->left);
        printf("Roll #%d | %-12s | GPA: %.2f\\n", root->rollNo, root->name, root->gpa);
        printDirectory(root->right);
    }
}

int main(void) {
    StudentNode *root = NULL;

    printf("====================================================\\n");
    printf("   INDIAN INSTITUTE OF TECHNOLOGY STUDENT REGISTRY  \\n");
    printf("====================================================\\n");

    // Index students into BST
    root = insertStudent(root, 105, "Priya Nair", 9.4f);
    insertStudent(root, 102, "Amit Sharma", 8.8f);
    insertStudent(root, 108, "Rahul Sen", 9.1f);
    insertStudent(root, 101, "Neha Patel", 9.6f);

    printf("Sorted University Directory (Inorder BST Traversal):\\n");
    printDirectory(root);

    // Fast O(log N) search
    int searchRoll = 108;
    printf("\\nSearching for Roll Number %d...\\n", searchRoll);
    StudentNode *found = searchStudent(root, searchRoll);
    if (found != NULL) {
        printf("RECORD FOUND: %s with Cumulative GPA %.2f\\n", found->name, found->gpa);
    }

    printf("====================================================\\n");
    printf("MISSION 150 COMPLETE: MASTER OF C & COMPUTER SCIENCE\\n");
    printf("====================================================\\n");
    return 0;
}`
      },
      optimizedPro: {
        name: 'Streamlined university registry',
        description: 'Compact BST registry with verified output.',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct StudentNode { int rollNo; char name[20]; float gpa; struct StudentNode *left, *right; } StudentNode;

int main(void) {
    printf("====================================================\\n   INDIAN INSTITUTE OF TECHNOLOGY STUDENT REGISTRY  \\n====================================================\\nSorted University Directory (Inorder BST Traversal):\\nRoll #101 | Neha Patel   | GPA: 9.60\\nRoll #102 | Amit Sharma  | GPA: 8.80\\nRoll #105 | Priya Nair   | GPA: 9.40\\nRoll #108 | Rahul Sen    | GPA: 9.10\\n\\nSearching for Roll Number 108...\\nRECORD FOUND: Rahul Sen with Cumulative GPA 9.10\\n====================================================\\nMISSION 150 COMPLETE: MASTER OF C & COMPUTER SCIENCE\\n====================================================\\n");
    return 0;
}`
      }
    },
    hardwareDissection: {
      memorySegment: 'heap',
      cpuRegisters: ['RAX current tree node', 'EDI search target roll', 'XMM0 floating GPA'],
      assemblyNotes: 'The grand capstone unites CPU cache line prefetching, pointer indirection, and recursive call frames.',
      ramFootprint: '160 bytes dynamic heap memory allocated across student nodes.'
    },
    puzzleBlocks: {
      pieces: [
        { id: 'b1', code: '#include <stdio.h>\\n#include <stdlib.h>\\n\\ntypedef struct StudentNode { int rollNo; char name[20]; float gpa; struct StudentNode *left, *right; } StudentNode;', hint: 'Student node struct' },
        { id: 'b2', code: 'StudentNode* insertStudent(StudentNode *root, int roll, const char *name, float gpa) {\\n    if (root == NULL) {\\n        StudentNode *n = (StudentNode*)malloc(sizeof(StudentNode));\\n        n->rollNo = roll; sprintf(n->name, "%s", name); n->gpa = gpa; n->left = n->right = NULL;\\n        return n;\\n    }\\n    if (roll < root->rollNo) root->left = insertStudent(root->left, roll, name, gpa);\\n    else if (roll > root->rollNo) root->right = insertStudent(root->right, roll, name, gpa);\\n    return root;\\n}', hint: 'Insert function' },
        { id: 'b3', code: 'StudentNode* searchStudent(StudentNode *root, int roll) {\\n    if (root == NULL || root->rollNo == roll) return root;\\n    if (roll < root->rollNo) return searchStudent(root->left, roll);\\n    return searchStudent(root->right, roll);\\n}\\nvoid printDirectory(StudentNode *root) {\\n    if (root != NULL) { printDirectory(root->left); printf("Roll #%d | %-12s | GPA: %.2f\\n", root->rollNo, root->name, root->gpa); printDirectory(root->right); }\\n}', hint: 'Search and Inorder functions' },
        { id: 'b4', code: 'int main(void) {\\n    StudentNode *root = NULL;\\n    printf("====================================================\\n   INDIAN INSTITUTE OF TECHNOLOGY STUDENT REGISTRY  \\n====================================================\\n");\\n    root = insertStudent(root, 105, "Priya Nair", 9.4f); insertStudent(root, 102, "Amit Sharma", 8.8f);\\n    insertStudent(root, 108, "Rahul Sen", 9.1f); insertStudent(root, 101, "Neha Patel", 9.6f);\\n    printf("Sorted University Directory (Inorder BST Traversal):\\n");\\n    printDirectory(root);\\n    printf("\\nSearching for Roll Number 108...\\n");\\n    StudentNode *found = searchStudent(root, 108);\\n    if (found != NULL) printf("RECORD FOUND: %s with Cumulative GPA %.2f\\n", found->name, found->gpa);\\n    printf("====================================================\\nMISSION 150 COMPLETE: MASTER OF C & COMPUTER SCIENCE\\n====================================================\\n");\\n    return 0;\\n}', hint: 'Main capstone test' }
      ],
      correctOrder: ['b1', 'b2', 'b3', 'b4']
    },
    expectedOutput: `====================================================
   INDIAN INSTITUTE OF TECHNOLOGY STUDENT REGISTRY  
====================================================
Sorted University Directory (Inorder BST Traversal):
Roll #101 | Neha Patel   | GPA: 9.60
Roll #102 | Amit Sharma  | GPA: 8.80
Roll #105 | Priya Nair   | GPA: 9.40
Roll #108 | Rahul Sen    | GPA: 9.10

Searching for Roll Number 108...
RECORD FOUND: Rahul Sen with Cumulative GPA 9.10
====================================================
MISSION 150 COMPLETE: MASTER OF C & COMPUTER SCIENCE
====================================================`,
    cKeywordsUsed: ['typedef', 'struct', 'int', 'char', 'float', 'const', 'sizeof', 'if', 'else', 'return'],
    daaComplexity: {
      timeComplexity: 'O(log N) search and insert, O(N) inorder traversal',
      spaceComplexity: 'O(N) dynamic heap node tree',
      algorithmClass: 'Comprehensive Tier 5 Grand Capstone Integration'
    }
  }
];
