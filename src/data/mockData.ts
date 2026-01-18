import googlelogo from '../assets/companylogo/google.png';

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  company?: string;
  category: string;
  views: number;
  bookmarks: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  questionCount: number;
  categories: string[];
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  questionCount: number;
  icon: string;
}

export const blogs: Blog[] = [
  {
    id: '1',
    slug: 'explain-react-virtual-dom',
    title: 'Explain the Virtual DOM in React',
    excerpt: 'Understanding how React\'s Virtual DOM works and why it makes React fast.',
    content: `
## The Question

"Can you explain what the Virtual DOM is and how React uses it?"

## Why Interviewers Ask This

This question tests your understanding of React's core architecture. Interviewers want to see if you understand:
- How React achieves its performance
- The difference between imperative and declarative UI updates
- Trade-offs in React's design decisions

## The Answer

The Virtual DOM is a lightweight JavaScript representation of the actual DOM. Instead of manipulating the browser's DOM directly, React creates a virtual copy in memory.

### How It Works

1. **Initial Render**: React creates a Virtual DOM tree representing your UI
2. **State Change**: When state updates, React creates a new Virtual DOM tree
3. **Diffing**: React compares (diffs) the new tree with the previous one
4. **Reconciliation**: Only the changed elements are updated in the real DOM

### Code Example

\`\`\`jsx
// When this state changes
const [count, setCount] = useState(0);

// React doesn't re-render everything
// It only updates the specific text node
return <div>Count: {count}</div>;
\`\`\`

## Common Mistakes

- **Saying Virtual DOM is always faster**: Direct DOM manipulation can be faster for simple updates
- **Confusing Virtual DOM with Shadow DOM**: These are completely different concepts
- **Not mentioning the reconciliation algorithm**: This is the key to React's efficiency

## Fresher vs Experienced

**Fresher**: Focus on the basic concept - it's a copy of the DOM in memory that React uses to minimize actual DOM updates.

**Experienced**: Discuss Fiber architecture, concurrent rendering, and how React prioritizes updates. Mention that the Virtual DOM is an implementation detail, not a feature.

## Related Concepts

- React Fiber
- Reconciliation
- Keys in React
- Batching updates
    `,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      role: 'Senior Frontend Engineer'
    },
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['React', 'JavaScript', 'Frontend'],
    difficulty: 'medium',
    company: 'Meta',
    category: 'React',
    views: 15420,
    bookmarks: 892
  },
  {
    id: '2',
    slug: 'javascript-event-loop-explained',
    title: 'How does the JavaScript Event Loop work?',
    excerpt: 'Deep dive into JavaScript\'s concurrency model and asynchronous execution.',
    content: `
## The Question

"Explain the JavaScript Event Loop and how asynchronous code executes."

## Why Interviewers Ask This

This is fundamental to understanding JavaScript. It tests:
- Your grasp of JavaScript's single-threaded nature
- Understanding of async/await, Promises, and callbacks
- Ability to predict code execution order

## The Answer

JavaScript is single-threaded but can handle async operations through the Event Loop mechanism.

### Key Components

1. **Call Stack**: Where function execution happens (LIFO)
2. **Web APIs**: Browser-provided APIs (setTimeout, fetch, DOM)
3. **Callback Queue**: Where callbacks wait (FIFO)
4. **Microtask Queue**: Higher priority queue for Promises
5. **Event Loop**: Monitors and moves tasks to call stack

### Execution Order

\`\`\`javascript
console.log('1'); // Sync - runs first

setTimeout(() => console.log('2'), 0); // Macro task

Promise.resolve().then(() => console.log('3')); // Micro task

console.log('4'); // Sync - runs second

// Output: 1, 4, 3, 2
\`\`\`

## Common Mistakes

- **Thinking setTimeout(fn, 0) runs immediately**: It still goes through the event loop
- **Not understanding microtask priority**: Promises execute before setTimeout
- **Forgetting about the call stack**: Async callbacks only run when stack is empty

## Fresher vs Experienced

**Fresher**: Explain the basic flow - sync code runs first, then microtasks, then macrotasks.

**Experienced**: Discuss requestAnimationFrame timing, queueMicrotask, and how frameworks batch updates using the event loop.
    `,
    author: {
      name: 'Alex Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      role: 'Tech Lead'
    },
    publishedAt: '2024-01-12',
    readTime: 10,
    tags: ['JavaScript', 'Frontend', 'Core Concepts'],
    difficulty: 'hard',
    company: 'Google',
    category: 'JavaScript',
    views: 23150,
    bookmarks: 1456
  },
  {
    id: '3',
    slug: 'css-flexbox-vs-grid',
    title: 'When to use Flexbox vs CSS Grid?',
    excerpt: 'Understanding the key differences and use cases for modern CSS layout systems.',
    content: `
## The Question

"When would you choose Flexbox over CSS Grid, and vice versa?"

## Why Interviewers Ask This

Tests your CSS architecture knowledge and ability to choose the right tool for layouts.

## The Answer

### Flexbox: One-Dimensional Layouts

Best for:
- Navigation bars
- Card layouts in a row
- Centering content
- When content size should dictate layout

\`\`\`css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

### Grid: Two-Dimensional Layouts

Best for:
- Page layouts
- Complex card grids
- When you need precise control over rows AND columns
- Overlapping elements

\`\`\`css
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
\`\`\`

## Common Mistakes

- **Using Grid for simple row layouts**: Flexbox is simpler
- **Avoiding Grid because it seems complex**: It's actually more intuitive for 2D
- **Not combining them**: They work great together!
    `,
    author: {
      name: 'Maya Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
      role: 'UI Engineer'
    },
    publishedAt: '2024-01-10',
    readTime: 6,
    tags: ['CSS', 'Frontend', 'Layout'],
    difficulty: 'easy',
    category: 'CSS',
    views: 8920,
    bookmarks: 534
  },
  {
    id: '4',
    slug: 'system-design-url-shortener',
    title: 'Design a URL Shortener like bit.ly',
    excerpt: 'Classic system design interview question covering scalability and architecture.',
    content: `
## The Question

"Design a URL shortening service like bit.ly"

## Why Interviewers Ask This

Tests your ability to:
- Design scalable systems
- Make trade-off decisions
- Think about edge cases
- Estimate capacity

## Requirements Gathering

### Functional Requirements
- Shorten long URLs to short codes
- Redirect short URLs to original
- Optional: Custom short codes
- Optional: Analytics

### Non-Functional Requirements
- Low latency redirects (< 100ms)
- High availability (99.9%)
- URL should not be predictable

## High-Level Design

\`\`\`
Client → Load Balancer → API Servers → Database
                              ↓
                          Cache Layer
\`\`\`

### URL Generation Strategies

1. **Base62 Encoding**: Convert auto-increment ID
2. **MD5 Hash**: Take first 7 characters
3. **Pre-generated Keys**: Background service generates codes

## Database Schema

\`\`\`sql
CREATE TABLE urls (
  id BIGINT PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE,
  original_url TEXT,
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  click_count INT
);
\`\`\`

## Capacity Estimation

- 100M URLs/month = ~40 URLs/second
- Read-heavy: 100:1 read/write ratio
- 5 years storage: 6B URLs × 500 bytes = 3TB
    `,
    author: {
      name: 'David Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      role: 'Principal Engineer'
    },
    publishedAt: '2024-01-08',
    readTime: 15,
    tags: ['System Design', 'Backend', 'Architecture'],
    difficulty: 'hard',
    company: 'Amazon',
    category: 'System Design',
    views: 31200,
    bookmarks: 2341
  },
  {
    id: '5',
    slug: 'react-useeffect-cleanup',
    title: 'Why do we need cleanup in useEffect?',
    excerpt: 'Understanding memory leaks and proper effect cleanup in React hooks.',
    content: `
## The Question

"Why is cleanup important in useEffect and how do you implement it?"

## Why Interviewers Ask This

Tests understanding of:
- React component lifecycle
- Memory management
- Subscription handling
- Race conditions

## The Answer

Cleanup prevents memory leaks and stale closures when components unmount or effects re-run.

### Common Cleanup Scenarios

\`\`\`jsx
useEffect(() => {
  // 1. Event listeners
  window.addEventListener('resize', handleResize);
  
  // 2. Subscriptions
  const subscription = dataSource.subscribe();
  
  // 3. Timers
  const timer = setInterval(tick, 1000);
  
  // 4. Abort controllers for fetch
  const controller = new AbortController();
  
  return () => {
    window.removeEventListener('resize', handleResize);
    subscription.unsubscribe();
    clearInterval(timer);
    controller.abort();
  };
}, []);
\`\`\`

## Common Mistakes

- **Forgetting to cleanup subscriptions**: Leads to memory leaks
- **Not handling race conditions**: Old fetch responses updating state
- **Cleaning up in wrong order**: Can cause errors
    `,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      role: 'Senior Frontend Engineer'
    },
    publishedAt: '2024-01-05',
    readTime: 7,
    tags: ['React', 'Hooks', 'Frontend'],
    difficulty: 'medium',
    company: 'Netflix',
    category: 'React',
    views: 12800,
    bookmarks: 765
  },
  {
    id: '6',
    slug: 'python-decorators-explained',
    title: 'How do Python Decorators work?',
    excerpt: 'Understanding the decorator pattern and its implementation in Python.',
    content: `
## The Question

"Explain Python decorators and write a simple example."

## Why Interviewers Ask This

Tests understanding of:
- Higher-order functions
- Closures
- Python's syntactic sugar
- Metaprogramming concepts

## The Answer

Decorators are functions that modify other functions' behavior without changing their code.

### Basic Decorator

\`\`\`python
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Executed in {time.time() - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
\`\`\`

### With Arguments

\`\`\`python
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello {name}")
\`\`\`

## Common Mistakes

- **Losing function metadata**: Use @functools.wraps
- **Not handling arguments properly**: Use *args, **kwargs
- **Forgetting to return the wrapper**: Decorator returns None
    `,
    author: {
      name: 'Raj Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=raj',
      role: 'Backend Engineer'
    },
    publishedAt: '2024-01-03',
    readTime: 9,
    tags: ['Python', 'Backend', 'Core Concepts'],
    difficulty: 'medium',
    category: 'Python',
    views: 9540,
    bookmarks: 623
  }
];

export const companies: Company[] = [
  {
    id: '1',
    name: 'Google',
    logo: '🔍',
    questionCount: 245,
    categories: ['Frontend', 'Backend', 'System Design', 'DSA']
  },
  {
    id: '2',
    name: 'Meta',
    logo: '👤',
    questionCount: 198,
    categories: ['React', 'Frontend', 'System Design']
  },
  {
    id: '3',
    name: 'Amazon',
    logo: '📦',
    questionCount: 312,
    categories: ['System Design', 'Backend', 'Leadership']
  },
  {
    id: '4',
    name: 'Microsoft',
    logo: '🪟',
    questionCount: 186,
    categories: ['DSA', 'System Design', 'Backend']
  },
  {
    id: '5',
    name: 'Apple',
    logo: '🍎',
    questionCount: 142,
    categories: ['iOS', 'System Design', 'UI/UX']
  },
  {
    id: '6',
    name: 'Netflix',
    logo: '🎬',
    questionCount: 87,
    categories: ['System Design', 'Backend', 'Frontend']
  },
  {
    id: '7',
    name: 'Uber',
    logo: '🚗',
    questionCount: 124,
    categories: ['System Design', 'Backend', 'Mobile']
  },
  {
    id: '8',
    name: 'Airbnb',
    logo: '🏠',
    questionCount: 95,
    categories: ['Frontend', 'React', 'System Design']
  }
];

export const topics: Topic[] = [
  {
    id: '1',
    name: 'React',
    slug: 'react',
    description: 'Component lifecycle, hooks, state management, and React patterns',
    questionCount: 156,
    icon: '⚛️'
  },
  {
    id: '2',
    name: 'JavaScript',
    slug: 'javascript',
    description: 'Core JS concepts, ES6+, async programming, and DOM manipulation',
    questionCount: 234,
    icon: '🟨'
  },
  {
    id: '3',
    name: 'System Design',
    slug: 'system-design',
    description: 'Scalability, distributed systems, and architecture patterns',
    questionCount: 89,
    icon: '🏗️'
  },
  {
    id: '4',
    name: 'Python',
    slug: 'python',
    description: 'Python fundamentals, Django, Flask, and data structures',
    questionCount: 178,
    icon: '🐍'
  },
  {
    id: '5',
    name: 'CSS',
    slug: 'css',
    description: 'Layouts, animations, responsive design, and CSS architecture',
    questionCount: 67,
    icon: '🎨'
  },
  {
    id: '6',
    name: 'Backend',
    slug: 'backend',
    description: 'APIs, databases, authentication, and server architecture',
    questionCount: 145,
    icon: '⚙️'
  }
];

export const featuredTopics = ['React', 'JavaScript', 'System Design', 'Python'];
