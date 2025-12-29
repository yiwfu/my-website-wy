# API 调用检查报告

## 检查范围

已检查以下页面的数据获取逻辑：
- ✅ 景点页面 (`/app/attractions/page.tsx`)
- ✅ 美食页面 (`/app/food/page.tsx`)
- ✅ 房产页面 (`/app/real-estate/page.tsx`)
- ✅ 招聘页面 (`/app/recruitment/page.tsx`)

## 检查结果

### ✅ 所有栏目页面的数据获取逻辑都是正确的

所有四个页面都使用了相同的模式：

```typescript
useEffect(() => {
    async function loadData() {
        const data = await getAttractions(); // 或 getFood/getRealEstate/getJobs
        setAttractions(data);
        setLoading(false);
    }
    loadData();
}, []); // 空依赖数组，只在组件挂载时执行一次
```

**为什么这个实现是正确的：**

1. **空依赖数组 `[]`**：确保 `useEffect` 只在组件首次挂载时执行一次
2. **异步函数封装**：使用 `async function loadData()` 包装异步逻辑
3. **单次调用**：每个页面只会在加载时调用一次对应的数据获取函数

### ❌ 之前发现的问题（已修复）

**用户认证模块** (`/context/AuthContext.tsx`)
- **问题**：`fetchProfile` 被调用了2次
  - 第1次：`getSession()` 检查当前会话
  - 第2次：`onAuthStateChange` 初始化时触发
- **修复**：移除了显式的 `getSession()` 调用，只保留 `onAuthStateChange` 监听器

## 数据获取函数位置

所有数据获取函数都定义在 `/lib/data.ts` 中：
- `getAttractions()` - 获取景点数据
- `getFood()` - 获取美食数据
- `getRealEstate()` - 获取房产数据
- `getJobs()` - 获取招聘数据

这些函数都是通过 Supabase 客户端从数据库获取数据，每个页面只调用一次。

## 可能的重复调用场景

如果你在浏览器开发者工具中看到重复的网络请求，可能是由于以下原因：

### 1. React Strict Mode（开发模式）

在开发环境中，React 18 的 Strict Mode 会**故意**执行两次 `useEffect`，以帮助发现副作用问题。

**解决方案**：这是正常行为，在生产环境中不会发生。

**验证方法**：
```typescript
// 在 app/layout.tsx 中临时移除 StrictMode
// 注意：这只是为了测试，不建议在实际开发中移除
```

### 2. 组件重新挂载

如果页面组件被卸载后重新挂载，`useEffect` 会再次执行。

**可能原因**：
- 路由导航
- 父组件重新渲染导致子组件重新挂载
- 开发环境的热重载（HMR）

### 3. 浏览器扩展

某些浏览器扩展可能会拦截或重复发送请求。

**验证方法**：在隐身模式下测试

## 建议

### 如果确实需要避免重复请求

可以添加请求缓存或防抖逻辑：

```typescript
// 方案1: 使用 ref 防止重复请求
const hasFetched = useRef(false);

useEffect(() => {
    if (hasFetched.current) return;
    
    async function loadData() {
        const data = await getAttractions();
        setAttractions(data);
        setLoading(false);
        hasFetched.current = true;
    }
    loadData();
}, []);

// 方案2: 使用 SWR 或 React Query 进行数据管理
// 这些库内置了缓存和重复请求防护
```

### 监控网络请求

在浏览器开发者工具中：
1. 打开 **Network** 标签
2. 筛选 **Fetch/XHR** 请求
3. 查看是否有重复的 Supabase API 调用
4. 检查请求的 **Initiator** 列，确认是哪个组件发起的

## 总结

✅ **当前代码没有问题**：所有栏目页面的数据获取逻辑都是正确的，每个页面只会在挂载时调用一次 API。

✅ **已修复的问题**：用户认证模块的重复调用已经修复。

⚠️ **开发环境特性**：如果在开发环境中看到重复请求，很可能是 React Strict Mode 的正常行为。

如果你仍然观察到重复调用，请提供以下信息：
1. 具体是哪个接口被重复调用
2. 在什么操作下触发（页面加载、路由切换等）
3. 浏览器 Network 标签的截图
