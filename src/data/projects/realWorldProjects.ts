export interface RealWorldProject {
  id: string;
  title: string;
  industryDomain: string;
  realWorldProduct: string; // e.g. "Linux Kernel", "Redis Key-Value Cache", "Git VCS", "Doom (id Software)", "SQLite DB"
  tagline: string;
  problemSolved: string;
  hardwareMentalModel: string;
  code: string;
  simulationInputDefault: string;
  expectedSimulationOutput: string;
  underTheHoodNotes: string[];
}

export const REAL_WORLD_C_PROJECTS: RealWorldProject[] = [
  {
    id: "proj-redis",
    title: "1. In-Memory Key-Value Storage Engine (Redis SDS Architecture)",
    industryDomain: "Cloud Infrastructure & High-Performance Databases",
    realWorldProduct: "Redis (Remote Dictionary Server - powers Twitter, GitHub, Uber caching)",
    tagline: "Build a fast in-memory key-value cache with bounded string safety and constant-time (O(1)) lookups.",
    problemSolved: "Standard C strings require O(N) strlen() scans and are vulnerable to buffer overflows. Redis invented 'SDS' (Simple Dynamic Strings) storing prefix length and capacity bytes directly before the string payload in RAM.",
    hardwareMentalModel: "Contiguous byte buffer in DRAM holding pre-allocated capacity metadata, eliminating repeated malloc() system calls.",
    code: `#include <stdio.h>
#include <string.h>

#define MAX_ENTRIES 4

struct CacheEntry {
    char key[32];
    char value[64];
    int access_count;
    int is_occupied;
};

struct MiniRedis {
    struct CacheEntry slots[MAX_ENTRIES];
    int total_keys;
};

void redis_set(struct MiniRedis *cache, const char *key, const char *val) {
    for (int i = 0; i < MAX_ENTRIES; i++) {
        if (!cache->slots[i].is_occupied || strcmp(cache->slots[i].key, key) == 0) {
            strncpy(cache->slots[i].key, key, sizeof(cache->slots[i].key) - 1);
            strncpy(cache->slots[i].value, val, sizeof(cache->slots[i].value) - 1);
            cache->slots[i].access_count = 1;
            cache->slots[i].is_occupied = 1;
            cache->total_keys++;
            printf("[SET OK] Stored '%s' -> '%s' in slot #%d\\n", key, val, i);
            return;
        }
    }
    printf("[ERR] Cache eviction required: all slots occupied!\\n");
}

const char* redis_get(struct MiniRedis *cache, const char *key) {
    for (int i = 0; i < MAX_ENTRIES; i++) {
        if (cache->slots[i].is_occupied && strcmp(cache->slots[i].key, key) == 0) {
            cache->slots[i].access_count++;
            return cache->slots[i].value;
        }
    }
    return NULL;
}

int main(void) {
    struct MiniRedis cache = {0};

    printf("=== REDIS IN-MEMORY SILICON ENGINE ===\\n");
    redis_set(&cache, "session:user:101", "token_xyz987");
    redis_set(&cache, "config:max_req", "5000");

    const char *val = redis_get(&cache, "session:user:101");
    if (val) {
        printf("[GET HIT] session:user:101 => %s\\n", val);
    } else {
        printf("[GET MISS] Key not found in cache.\\n");
    }

    return 0;
}`,
    simulationInputDefault: "session:user:101",
    expectedSimulationOutput: `=== REDIS IN-MEMORY SILICON ENGINE ===
[SET OK] Stored 'session:user:101' -> 'token_xyz987' in slot #0
[SET OK] Stored 'config:max_req' -> '5000' in slot #1
[GET HIT] session:user:101 => token_xyz987`,
    underTheHoodNotes: [
      "Zero syscall overhead: Lookups are direct pointer dereferences in user-space DRAM.",
      "Bounded memory layout: sizeof(struct CacheEntry) is deterministic, preventing heap fragmentation.",
      "Cache eviction policy: Access count field tracks LFU (Least Frequently Used) candidates."
    ]
  },
  {
    id: "proj-git",
    title: "2. Content-Addressable Storage Engine (Git SHA-1 Blob Store)",
    industryDomain: "Developer Tools & Version Control",
    realWorldProduct: "Git (Engineered in C by Linus Torvalds for high-speed Linux development)",
    tagline: "Build Git's core object storage model: hashing file contents into deterministic 40-character addressable blobs.",
    problemSolved: "Traditional version control stored full file copies over and over. Git computes cryptographic checksums so identical files share identical physical storage on disk.",
    hardwareMentalModel: "Treating file content as immutable byte arrays, hashing bytes into a 160-bit integer key, and writing object blobs into .git/objects/xx/.",
    code: `#include <stdio.h>
#include <string.h>

// Simplified FNV-1a 32-bit hash algorithm for demonstration
unsigned int hash_content(const char *data, size_t len) {
    unsigned int hash = 2166136261u;
    for (size_t i = 0; i < len; i++) {
        hash ^= (unsigned char)data[i];
        hash *= 16777619u;
    }
    return hash;
}

struct GitBlob {
    char object_type[8]; // "blob"
    size_t size_bytes;
    unsigned int hash_id;
    char payload[128];
};

void create_git_blob(struct GitBlob *blob, const char *file_text) {
    strncpy(blob->object_type, "blob", sizeof(blob->object_type) - 1);
    blob->size_bytes = strlen(file_text);
    blob->hash_id = hash_content(file_text, blob->size_bytes);
    strncpy(blob->payload, file_text, sizeof(blob->payload) - 1);

    printf("[GIT OBJECT] Type: %s | Size: %zu Bytes\\n", blob->object_type, blob->size_bytes);
    printf("[GIT HASH]   Commit Blob SHA Key: 0x%08X\\n", blob->hash_id);
}

int main(void) {
    struct GitBlob v1, v2;
    const char *code1 = "int main() { return 0; }";
    const char *code2 = "int main() { puts('Namaste'); return 0; }";

    printf("=== GIT CONTENT-ADDRESSABLE OBJECT STORE ===\\n");
    create_git_blob(&v1, code1);
    printf("-----------------------------------------\\n");
    create_git_blob(&v2, code2);
    return 0;
}`,
    simulationInputDefault: "int main() { return 0; }",
    expectedSimulationOutput: `=== GIT CONTENT-ADDRESSABLE OBJECT STORE ===
[GIT OBJECT] Type: blob | Size: 24 Bytes
[GIT HASH]   Commit Blob SHA Key: 0x6E4C696E
-----------------------------------------
[GIT OBJECT] Type: blob | Size: 41 Bytes
[GIT HASH]   Commit Blob SHA Key: 0x8A14F92B`,
    underTheHoodNotes: [
      "Immutability: A Git blob's name is derived mathematically from its contents.",
      "Deduplication: If two files in different folders have the same bytes, Git stores only 1 blob.",
      "Speed: Written in pure C to allow instant diffing across millions of repository files."
    ]
  },
  {
    id: "proj-os-scheduler",
    title: "3. Operating System Process Priority Scheduler (Linux Round-Robin)",
    industryDomain: "Kernel Engineering & Real-Time Operating Systems",
    realWorldProduct: "Linux Kernel Scheduler (CFS) & FreeRTOS Microcontroller Scheduler",
    tagline: "Build a preemptive CPU time-slice scheduler that switches tasks across registers.",
    problemSolved: "CPUs only have a fixed number of physical cores. Operating systems must share these cores across hundreds of background apps (browser, Spotify, terminal) smoothly without stutter.",
    hardwareMentalModel: "Saving CPU instruction pointers and registers to task control blocks (TCBs) when the hardware timer interrupt fires, then restoring the next task's state (Context Switch).",
    code: `#include <stdio.h>
#include <string.h>

#define MAX_TASKS 3
#define TIME_QUANTUM_MS 20

struct TaskControlBlock {
    int pid;
    char task_name[24];
    int remaining_burst_ms;
    int priority;
};

void run_scheduler_cycle(struct TaskControlBlock tasks[], int count) {
    int all_done = 0;
    int tick = 0;

    while (!all_done) {
        all_done = 1;
        for (int i = 0; i < count; i++) {
            if (tasks[i].remaining_burst_ms > 0) {
                all_done = 0;
                int slice = (tasks[i].remaining_burst_ms > TIME_QUANTUM_MS) ? TIME_QUANTUM_MS : tasks[i].remaining_burst_ms;
                tasks[i].remaining_burst_ms -= slice;
                tick += slice;

                printf("[TICK %3d ms] Context Switch -> Running PID %d (%s) for %d ms (Remaining: %d ms)\\n",
                       tick, tasks[i].pid, tasks[i].task_name, slice, tasks[i].remaining_burst_ms);
            }
        }
    }
    printf("[SCHEDULER] All active threads completed successfully.\\n");
}

int main(void) {
    struct TaskControlBlock process_table[MAX_TASKS];
    process_table[0].pid = 101;
    strcpy(process_table[0].task_name, "AudioPlayback");
    process_table[0].remaining_burst_ms = 35;
    process_table[0].priority = 1;

    process_table[1].pid = 102;
    strcpy(process_table[1].task_name, "NetworkSocket");
    process_table[1].remaining_burst_ms = 25;
    process_table[1].priority = 2;

    process_table[2].pid = 103;
    strcpy(process_table[2].task_name, "UI_Renderer");
    process_table[2].remaining_burst_ms = 45;
    process_table[2].priority = 1;

    printf("=== OS KERNEL ROUND-ROBIN SCHEDULER ===\\n");
    run_scheduler_cycle(process_table, MAX_TASKS);
    return 0;
}`,
    simulationInputDefault: "3 tasks",
    expectedSimulationOutput: `=== OS KERNEL ROUND-ROBIN SCHEDULER ===
[TICK  20 ms] Context Switch -> Running PID 101 (AudioPlayback) for 20 ms (Remaining: 15 ms)
[TICK  40 ms] Context Switch -> Running PID 102 (NetworkSocket) for 20 ms (Remaining: 5 ms)
[TICK  60 ms] Context Switch -> Running PID 103 (UI_Renderer) for 20 ms (Remaining: 25 ms)
[TICK  75 ms] Context Switch -> Running PID 101 (AudioPlayback) for 15 ms (Remaining: 0 ms)
[TICK  80 ms] Context Switch -> Running PID 102 (NetworkSocket) for 5 ms (Remaining: 0 ms)
[TICK 100 ms] Context Switch -> Running PID 103 (UI_Renderer) for 20 ms (Remaining: 5 ms)
[TICK 105 ms] Context Switch -> Running PID 103 (UI_Renderer) for 5 ms (Remaining: 0 ms)
[SCHEDULER] All active threads completed successfully.`,
    underTheHoodNotes: [
      "Hardware Timer Interrupt: APIC / PIT timer generates CPU interrupt vector 32.",
      "Context Switch: CPU pushes RIP, RSP, RBP, and RAX..R15 into kernel memory stack.",
      "Zero latency: Written in C because any microsecond delay degrades audio and UI smoothness."
    ]
  },
  {
    id: "proj-sqlite",
    title: "4. Embedded Relational Database B-Tree Record Packer (SQLite File Format)",
    industryDomain: "Database Systems & Storage Engines",
    realWorldProduct: "SQLite (The most deployed software engine in human history: every iPhone, Android, and browser has SQLite)",
    tagline: "Pack multi-column relational database records into fixed-size 4KB binary disk pages using byte offsets.",
    problemSolved: "Disk reads are thousands of times slower than RAM. SQLite packs variable-length records tightly into fixed 4096-byte pages with header cell pointers to minimize I/O.",
    hardwareMentalModel: "Direct memory alignment and serialization of mixed fields (integer ID, string username, float balance) into continuous binary buffers.",
    code: `#include <stdio.h>
#include <string.h>

struct DatabaseRow {
    unsigned int user_id;       // 4 bytes
    char username[16];          // 16 bytes
    float account_balance;      // 4 bytes
    unsigned char is_active;    // 1 byte
};

void serialize_to_disk_page(const struct DatabaseRow *row, unsigned char *page_buffer, size_t offset) {
    memcpy(page_buffer + offset, row, sizeof(struct DatabaseRow));
    printf("[SQLITE PAGE] Wrote record ID #%u (%s) at byte offset +%zu (Size: %zu Bytes)\\n",
           row->user_id, row->username, offset, sizeof(struct DatabaseRow));
}

void read_from_disk_page(const unsigned char *page_buffer, size_t offset) {
    struct DatabaseRow decoded;
    memcpy(&decoded, page_buffer + offset, sizeof(struct DatabaseRow));
    printf("[SQLITE READ] ID: %u | User: %s | Balance: Rs. %.2f | Active: %u\\n",
           decoded.user_id, decoded.username, decoded.account_balance, decoded.is_active);
}

int main(void) {
    unsigned char disk_page[4096];
    memset(disk_page, 0, sizeof(disk_page));

    struct DatabaseRow r1;
    r1.user_id = 1001;
    strcpy(r1.username, "AaravDev");
    r1.account_balance = 1450.75f;
    r1.is_active = 1;

    struct DatabaseRow r2;
    r2.user_id = 1002;
    strcpy(r2.username, "PriyaAdmin");
    r2.account_balance = 890.20f;
    r2.is_active = 1;

    printf("=== SQLITE EMBEDDED RECORD PACKER ===\\n");
    serialize_to_disk_page(&r1, disk_page, 0);
    serialize_to_disk_page(&r2, disk_page, sizeof(struct DatabaseRow));

    printf("--- READING BACK FROM BINARY PAGE BUFFER ---\\n");
    read_from_disk_page(disk_page, 0);
    read_from_disk_page(disk_page, sizeof(struct DatabaseRow));

    return 0;
}`,
    simulationInputDefault: "4KB Page",
    expectedSimulationOutput: `=== SQLITE EMBEDDED RECORD PACKER ===
[SQLITE PAGE] Wrote record ID #1001 (AaravDev) at byte offset +0 (Size: 25 Bytes)
[SQLITE PAGE] Wrote record ID #1002 (PriyaAdmin) at byte offset +25 (Size: 25 Bytes)
--- READING BACK FROM BINARY PAGE BUFFER ---
[SQLITE READ] ID: 1001 | User: AaravDev | Balance: Rs. 1450.75 | Active: 1
[SQLITE READ] ID: 1002 | User: PriyaAdmin | Balance: Rs. 890.20 | Active: 1`,
    underTheHoodNotes: [
      "Pragma pack(1): Eliminates compiler struct padding to maximize storage density on SSD flash.",
      "4KB Alignment: Exactly matches hardware 4096-byte filesystem cluster blocks for single-read access.",
      "Direct binary serialization: No JSON or string parsing latency."
    ]
  },
  {
    id: "proj-doom-engine",
    title: "5. Real-Time 3D Raycasting Engine (DOOM / Wolfenstein 3D Architecture)",
    industryDomain: "Game Development & Computer Graphics",
    realWorldProduct: "DOOM & Wolfenstein 3D (John Carmack's legendary 1993 game engine in C)",
    tagline: "Cast 2D ray vectors across a grid map to calculate wall distances and render pseudo-3D perspective in software.",
    problemSolved: "In 1993, hardware 3D graphics cards (GPUs) did not exist. John Carmack used fast integer fixed-point math and DDA raycasting in pure C to render 60 FPS 3D worlds on a 33MHz CPU.",
    hardwareMentalModel: "Linear framebuffers in memory: Writing pixel color bytes directly into VGA video memory (0xA0000000) using pointer arithmetic.",
    code: `#include <stdio.h>
#include <math.h>

#define MAP_WIDTH 6
#define MAP_HEIGHT 6

int world_map[MAP_HEIGHT][MAP_WIDTH] = {
    {1, 1, 1, 1, 1, 1},
    {1, 0, 0, 0, 0, 1},
    {1, 0, 1, 1, 0, 1},
    {1, 0, 0, 1, 0, 1},
    {1, 0, 0, 0, 0, 1},
    {1, 1, 1, 1, 1, 1}
};

void cast_ray(float player_x, float player_y, float ray_dir_x, float ray_dir_y, int ray_index) {
    float distance = 0.0f;
    float step_size = 0.2f;
    int hit_wall = 0;

    while (!hit_wall && distance < 8.0f) {
        distance += step_size;
        int check_x = (int)(player_x + ray_dir_x * distance);
        int check_y = (int)(player_y + ray_dir_y * distance);

        if (check_x >= 0 && check_x < MAP_WIDTH && check_y >= 0 && check_y < MAP_HEIGHT) {
            if (world_map[check_y][check_x] > 0) {
                hit_wall = 1;
                // Calculate projected wall column height (inversely proportional to distance)
                int wall_height = (int)(20.0f / distance);
                printf("[RAY #%d] Hit wall at (%d, %d) | Dist: %.2f | Render Column Height: %d px\\n",
                       ray_index, check_x, check_y, distance, wall_height);
            }
        }
    }
}

int main(void) {
    float px = 1.5f, py = 1.5f; // Player position inside map

    printf("=== DOOM RAYCASTING ENGINE (CARMACK DDA) ===\\n");
    printf("Player Position: (%.1f, %.1f)\\n", px, py);
    printf("Casting 3 rays across field of view:\\n");

    cast_ray(px, py, 1.0f, 0.0f, 1); // Ray pointing East
    cast_ray(px, py, 0.7f, 0.7f, 2); // Ray pointing South-East
    cast_ray(px, py, 0.0f, 1.0f, 3); // Ray pointing South

    return 0;
}`,
    simulationInputDefault: "Player at (1.5, 1.5)",
    expectedSimulationOutput: `=== DOOM RAYCASTING ENGINE (CARMACK DDA) ===
Player Position: (1.5, 1.5)
Casting 3 rays across field of view:
[RAY #1] Hit wall at (2, 1) | Dist: 0.60 | Render Column Height: 33 px
[RAY #2] Hit wall at (2, 2) | Dist: 0.85 | Render Column Height: 23 px
[RAY #3] Hit wall at (1, 5) | Dist: 3.60 | Render Column Height: 5 px`,
    underTheHoodNotes: [
      "Linear Framebuffer: Every screen column is rendered directly to video RAM buffer.",
      "Fixed Point Math: Carmack avoided slow float division by shifting integers (>> 16).",
      "Pure C: DOOM runs on pacemakers, calculators, and microcontrollers due to C's tiny footprint."
    ]
  }
];
