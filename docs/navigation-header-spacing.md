# React Native 导航栏空白问题解决方案

## 1. 问题描述

### 问题现象
- 导航栏标题区域存在大量空白空间
- 标题和副标题被系统状态栏遮挡
- 整体布局不够紧凑，空间利用率低

### 复现步骤
1. 使用 `@react-navigation/native-stack` 的默认导航栏
2. 设置 `headerTitle` 自定义组件
3. 使用 `SafeAreaView` 处理安全区域

### 影响范围
- 影响应用整体视觉效果
- 减少了可用内容区域
- 可能导致内容显示不完整

## 2. 解决方案

### 解决步骤
1. 移除导航栏的默认配置
2. 在页面组件中完全控制布局
3. 使用 SafeAreaView 仅处理顶部安全区域

### 核心代码

```typescript
// AppNavigator.tsx
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,  // 关键：隐藏默认导航栏
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      >
        <Stack.Screen name="Year" component={YearScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// YearScreen.tsx
export const YearScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* 自定义标题区域 */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleYear}>2024年</Text>
          <Text style={styles.titleDate}>
            {format(today, 'MM月dd日')} {lunarText}
          </Text>
        </View>
        {/* 其他内容 */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 8,
  },
  titleYear: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },
  titleDate: {
    fontSize: 13,
    color: '#666',
  },
});
```

### 注意事项
- SafeAreaView 只处理顶部安全区域 `edges={['top']}`
- 移除所有多余的内边距和间距
- 确保标题区域样式紧凑

## 3. 最佳实践

### 类似问题预防
1. 避免使用默认导航栏的自定义标题
2. 优先考虑完全自定义布局
3. 仔细计算和控制所有间距

### 代码优化建议
1. 布局结构：
   ```
   SafeAreaView (仅处理顶部)
   └── Container
       ├── TitleSection (自定义标题)
       └── ContentSection (主要内容)
   ```

2. 样式优化：
   - 使用最小必要的内边距
   - 避免多层嵌套的边距叠加
   - 精确控制每个元素的大小

3. 性能考虑：
   - 减少不必要的 View 嵌套
   - 使用 memo 优化重复渲染
   - 避免复杂的动态样式计算 