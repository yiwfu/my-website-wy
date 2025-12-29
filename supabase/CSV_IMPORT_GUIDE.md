# CSV 数据导入指南

本项目已为所有四个栏目创建了完整的示例数据，共 **120 条记录**，全部包含高质量图片。

## 📁 CSV 文件清单

| 文件名 | 表名 | 记录数 | 说明 |
|--------|------|--------|------|
| `food_data.csv` | food | 30 | 美食餐饮数据 |
| `attractions_data.csv` | attractions | 30 | 景点旅游数据 |
| `real_estate_data.csv` | real_estate | 30 | 房产租售数据 |
| `jobs_data.csv` | jobs | 30 | 招聘职位数据 |

## 🚀 快速导入步骤

### 方法一：Supabase 控制台导入（推荐）

1. **登录 Supabase**
   - 访问 [app.supabase.com](https://app.supabase.com)
   - 选择您的项目

2. **导入数据**
   - 点击左侧 **Table Editor**
   - 选择目标表（如 `food`）
   - 点击右上角 **Insert** → **Import data from CSV**
   - 上传对应的 CSV 文件
   - 确认字段映射
   - 点击 **Import**

3. **重复步骤 2** 导入其他三个表

### 方法二：SQL 批量导入

如果您熟悉 SQL，可以在 **SQL Editor** 中运行：

```sql
-- 注意：需要先将 CSV 文件上传到 Supabase Storage
-- 然后使用 COPY 命令导入
```

## ✅ 验证导入结果

导入完成后，访问以下页面验证：

- **美食页面**: `http://localhost:3000/food`
- **景点页面**: `http://localhost:3000/attractions`
- **房产页面**: `http://localhost:3000/real-estate`
- **招聘页面**: `http://localhost:3000/recruitment`

每个页面应该显示 30+ 条带图片的卡片。

## 🎨 图片说明

所有图片均来自 [Unsplash](https://unsplash.com)，免费高质量图库：
- **分辨率**: 800px 宽度（优化加载速度）
- **格式**: JPEG/WebP（自动优化）
- **内容**: 与数据类型匹配的专业摄影作品

## 🔧 常见问题

### Q: 导入时提示字段不匹配？
**A**: 确保数据库表已按 `schema.sql` 创建，包含所有必需字段（特别是 `image_url`）。

### Q: 图片无法显示？
**A**: 
1. 检查 `next.config.ts` 是否配置了 `images.unsplash.com`
2. 重启开发服务器
3. 清除浏览器缓存

### Q: 想使用自己的图片？
**A**: 
1. 上传图片到 Supabase Storage
2. 获取公开 URL
3. 在 CSV 中替换 `image_url` 字段

### Q: 数据量太多/太少？
**A**: 可以根据需要：
- 删除部分行（减少数据）
- 复制修改现有行（增加数据）

## 📊 数据字段说明

### Food 表
```
title, description, category, location, rating, ai_score, price_range, image_url
```

### Attractions 表
```
title, description, category, location, rating, ai_score, image_url
```

### Real Estate 表
```
title, description, category, location, price, bedrooms, ai_score, image_url
```

### Jobs 表
```
title, description, category, company, location, salary_range, ai_score, image_url
```

## 🎯 下一步建议

1. **自定义数据**: 根据实际业务修改 CSV 内容
2. **添加更多字段**: 如联系方式、营业时间等
3. **实现搜索**: 添加全文搜索功能
4. **用户评论**: 允许用户添加评价和评分
5. **收藏功能**: 让用户保存喜欢的项目

---

**提示**: 所有 CSV 文件位于 `/Users/yw.fu/yw/my-app/supabase/` 目录
