# Cleandar - 打卡日历应用

## 项目概述

Cleandar 是一款简洁的日历标记应用，灵感来源于"Much effort, much prosperity"(多努力，多收获)的理念。通过不同颜色的圆点标记，用户可以直观地记录和回顾每一天的状态。

## 核心功能

### 1. 年度视图
- 整年日历以圆点矩阵的形式展示
- 支持8种预设颜色选择（如红、橙、黄、绿、青、蓝、紫、灰）
- 点击圆点可以快速切换颜色
- 长按圆点可以添加备注
- 支持月份快速切换
- 年度心情统计和可视化
- 颜色使用统计和分布分析

### 2. 月度视图
- 传统日历格式，显示每日记录和心情
- 支持快速添加/查看日记
- 显示重要备忘提醒
- 月历形式展示彩色圆点标记
- 点击日期可查看/编辑颜色和备注
- 支持月度颜色分布统计
- 支持日期范围选择
- 显示农历和节假日信息

### 3. 记录功能
- 一键打卡
- 支持补卡（可设置补卡期限）
- 打卡提醒
- 打卡备注和心情记录
- 日记/备忘录记录
- 心情标记（开心、平静、难过等）
- 简单的颜色选择器
- 支持为每个颜色定义个性化含义
- 可为每个标记添加简短备注
- 支持修改历史记录
- 图片附件支持
- 重要日期标记

### 4. 数据统计
- 连续打卡天数统计
- 月度/年度打卡率统计
- 打卡历程回顾
- 成就系统
- 月度/年度心情分析
- 记录频率统计
- 颜色使用频率统计
- 自定义时间段的颜色分布分析
- 每种颜色的使用趋势图
- 年度色彩报告生成
- 生活回顾功能
- 年度总结生成

## 技术特性

- 使用 React Native 开发，支持 iOS 和 Android 平台
- TypeScript 确保代码质量
- Redux Toolkit 状态管理
- AsyncStorage 本地数据持久化
- 支持数据导出和备份
- 深色模式支持
- 支持自定义颜色主题
- 支持导出颜色统计数据
- 支持 iCloud/Google Drive 云同步
- 支持隐私保护（指纹/面容解锁）

## 项目结构 
## 项目结构 
+ ```
+ src/
+ ├── components/          # 可复用组件
+ │   ├── common/         # 通用组件
+ │   │   ├── Button/
+ │   │   ├── ColorPicker/
+ │   │   └── Modal/
+ │   ├── calendar/       # 日历相关组件
+ │   │   ├── YearView/
+ │   │   ├── MonthView/
+ │   │   └── DayCell/
+ │   └── statistics/     # 统计相关组件
+ │       ├── ColorStats/
+ │       └── Charts/
+ │
+ ├── screens/            # 页面组件
+ │   ├── YearScreen/
+ │   ├── MonthScreen/
+ │   └── SettingsScreen/
+ │
+ ├── navigation/         # 导航配置
+ │   ├── AppNavigator.tsx
+ │   └── types.ts
+ │
+ ├── store/             # 状态管理
+ │   ├── slices/
+ │   │   ├── calendarSlice.ts
+ │   │   └── settingsSlice.ts
+ │   └── index.ts
+ │
+ ├── utils/             # 工具函数
+ │   ├── date.ts
+ │   ├── color.ts
+ │   └── storage.ts
+ │
+ ├── hooks/             # 自定义 Hooks
+ │   ├── useCalendar.ts
+ │   └── useColorTheme.ts
+ │
+ ├── types/             # TypeScript 类型定义
+ │   ├── calendar.ts
+ │   └── theme.ts
+ │
+ ├── constants/         # 常量定义
+ │   ├── colors.ts
+ │   └── config.ts
+ │
+ └── assets/           # 静态资源
+     ├── images/
+     └── icons/
+ 
+ android/              # Android 原生代码
+ ios/                  # iOS 原生代码
+ __tests__/           # 测试文件
+ 
+ 配置文件
+ ├── package.json
+ ├── tsconfig.json
+ ├── babel.config.js
+ ├── metro.config.js
+ ├── .prettierrc
+ ├── .eslintrc
+ └── README.md
+ ```
+
+ ## 主要目录说明
+
+ ### components/
+ - `common/`: 存放按钮、输入框等通用组件
+ - `calendar/`: 日历相关的所有组件
+ - `statistics/`: 数据统计和图表组件
+
+ ### screens/
+ - `YearScreen/`: 年度视图界面
+ - `MonthScreen/`: 月度视图界面
+ - `SettingsScreen/`: 设置界面
+
+ ### store/
+ - `calendarSlice`: 处理日历数据和状态
+ - `settingsSlice`: 处理应用设置和主题
+
+ ### utils/
+ - `date.ts`: 日期处理工具
+ - `color.ts`: 颜色处理工具
+ - `storage.ts`: 本地存储工具
+
+ ### types/
+ - `calendar.ts`: 日历相关类型定义
+ - `theme.ts`: 主题相关类型定义