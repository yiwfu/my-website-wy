# Supabase 数据获取问题排查指南

## 问题诊断清单

### 1. 检查环境变量配置

确保 `.env.local` 文件包含正确的配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

**注意事项：**
- 变量名必须是 `NEXT_PUBLIC_SUPABASE_ANON_KEY`（不是 `PUBLISHABLE_DEFAULT_KEY`）
- 确保没有多余的空格或引号
- 修改后需要重启开发服务器

### 2. 获取正确的 API 凭证

在 Supabase 控制台：
1. 进入 **Project Settings** → **API**
2. 复制 **Project URL**
3. 复制 **anon public** key（在 "Project API keys" 部分）

### 3. 验证数据库表结构

在 Supabase SQL Editor 中运行：

```sql
-- 检查 food 表是否存在
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'food';

-- 检查 food 表的列
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'food';

-- 查看数据
SELECT * FROM food LIMIT 5;
```

### 4. 检查 RLS 策略

确保有公开读取权限：

```sql
-- 查看现有策略
SELECT * FROM pg_policies WHERE tablename = 'food';

-- 如果没有策略，添加：
CREATE POLICY "Public read access for food" 
ON food FOR SELECT USING (true);
```

### 5. 查看浏览器控制台

打开浏览器开发者工具（F12），查看：
- Console 标签页的错误信息
- Network 标签页的 Supabase API 请求

## 常见错误及解决方案

### 错误：`supabaseUrl is required`
**原因：** 环境变量未设置或未正确加载  
**解决：** 
1. 检查 `.env.local` 文件是否存在
2. 重启开发服务器：`Ctrl+C` 然后 `npm run dev`

### 错误：`column "ai_score" does not exist`
**原因：** 数据库表缺少该列  
**解决：** 在 SQL Editor 运行：
```sql
ALTER TABLE food ADD COLUMN ai_score INTEGER DEFAULT 0;
```

### 错误：`permission denied for table food`
**原因：** RLS 策略未配置  
**解决：** 运行上面第4步的 SQL 命令

### 错误：返回空数组 `[]`
**原因：** 表中没有数据  
**解决：** 导入 CSV 数据或运行 `schema.sql` 中的 INSERT 语句

## 调试步骤

1. **检查环境变量是否加载**
   - 查看终端输出的 `Supabase URL: ✓ Set` 和 `Supabase Key: ✓ Set`
   - 如果显示 `✗ Missing`，说明环境变量未设置

2. **检查数据获取日志**
   - 访问 `/food` 页面
   - 查看终端输出：
     - `🔍 Fetching food data...` - 开始获取
     - `✅ Successfully fetched X food items` - 成功
     - `❌ Error fetching food:` - 失败（会显示详细错误）

3. **直接测试 Supabase 连接**
   在浏览器控制台运行：
   ```javascript
   // 检查环境变量
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
   console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
   ```

## 快速修复流程

```bash
# 1. 停止开发服务器
Ctrl+C

# 2. 确认 .env.local 存在且配置正确
cat .env.local

# 3. 重启开发服务器
npm run dev

# 4. 访问页面并查看终端日志
```

如果问题仍然存在，请提供：
- 终端的完整错误日志
- 浏览器控制台的错误信息
- `.env.local` 的内容（隐藏实际的 key 值）
