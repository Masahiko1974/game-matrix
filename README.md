
## create-vue

create-vue是Vue官方新的脚手架工具，底层切换到了 vite （下一代前端工具链），为开发提供极速响应。

执行如下命令，这一指令将会安装并执行 create-vue

`npm init vue@latest`

> 无论您之前是否安装过create-vue，执行npm init vue@latest命令都会创建一个新的Vue项目。这个命令会使用Vite和Rollup构建工具来创建项目，这是Vue官方目前推荐的构建工具。如果您之前已经安装过create-vue，那么执行这个命令将会更新create-vue到最新版本。

新建项目后记得安装依赖

`npm install`

## 项目目录

<img src="https://img2023.cnblogs.com/blog/2098807/202306/2098807-20230615205321396-465718068.png" alt="img" style="zoom: 80%;" />

- vite.config.js -项目的配置文件基于 vite 的配置

- package.json -项目包文件核心依赖项变成了 Vue3.x 和 vite

- main.js -入口文件 createApp 函数创建应用实例

- app.vue -根组件SFC单文件组件 script - template - style

  变化一: 脚本script和模板template顺序调整

  变化二: 模板template不再要求唯一根元素

  变化三: 脚本script添加setup标识支 持组合式API

- index.html -单页入口提供 id 为 app 的挂载点

## 快速上手Vue3

script 标签添加 setup 标记，不需要再写导出语句，默认会添加导出语句,setup 在 beforeCreate 钩子之前执行。

### reactive ref computed watch

```js
<script setup>
import { reactive, ref, computed, watch } from 'vue'

//reactive接受对象类型数据的参数传入并返回一个响应式的对象
const obj = reactive({
  count: 0
})

//ref接收简单类型或者对象类型的数据传入并返回一个响应式的对象
const count = ref(0)

const add = () => {
  obj.count++ //reactive
  count.value++ //ref
  deepObj.value.count++
}

//计算属性
const list = ref([1, 2, 3, 4, 5, 6])
const newList = computed(() => list.value.filter(el => el > 4))

//侦听属性
//参数 immediate 控制立刻执行，deep 开启深度侦听
watch(count, (value, oldValue) =>
console.log(`新数值是${value},旧数值是${oldValue}`)
)

const deepObj = ref({
  count: 0,
  name: 'masahiko'
})

watch(deepObj, (value, oldValue) => console.log('deepObj属性发生改变'), {
  immediate: true,
  deep: true
})
//侦听多个数据，第一个参数可以改写成数组的写法
</script>
​```

```html
<template>
  <!-- reactive -->
  <button @click="add" class="box">
    {{ obj.count }}
  </button>
  <!-- ref -->
  <button @click="add">{{ count }}</button>
  <!-- computed -->
  <div>{{ list }}</div>
  <div>{{ newList }}</div>
</template>
```

### 生命周期函数

<img src="https://img2023.cnblogs.com/blog/2098807/202306/2098807-20230616135434771-1886506524.png" alt="img" style="zoom: 80%;" />

执行生命周期函数，传入回调,生命周期函数执行多次的时候，会按照顺序依次执行

```js
<scirpt setup>
  import { onMounted } from 'vue'
  onMounted(()=>{
    // 自定义逻辑
  })
  onMounted(()=>{
    // 自定义逻辑
  })
</script>
​```

### 父子通信

- 父组件

  ```js
  <script setup>
  import { reactive, ref, computed, watch } from 'vue'
  //引入子组件
  import item from './components/item.vue'
  const list = ref([
    {
      title: 'Minecraft',
      description: '沉浸式沙盒游戏',
      count: 1000000
    },
    {
      title: 'Overwatch',
      description: '团队射击游戏',
      count: 500000
    },
    {
      title: 'Stardew Valley',
      description: '田园生活模拟游戏',
      count: 200000
    }
  ])
  const update = (itemIndex,addNum,msg) => {
    list.value[itemIndex].count += addNum
    console.log(msg)
  }
  </script>
  ```

  ```html
  <template>
    <div v-for="(item, index) in list" :key="index">
      <!-- 1.绑定属性和自定义事件 -->
      <item :item="item" :index="index" @itemUpdate="update"></item>
    </div>
  </template>
  ```

- 子组件

  ```js
  <script setup>
  import {} from 'vue'
  //2.通过编译器宏接收父组件传递的数据
  const itemInfo = defineProps({
    item: Object,
    index: Number
  })
  //2.通过defineEmits编译器宏生成emit方法
  const emit = defineEmits(['itemUpdate'])
  </script>
  ```

  ```html
  <template>
    <div class="item">
      <div class="title">标题：{{ item.title }}</div>
      <div class="desc">简介：{{ item.description }}</div>
      <div class="count">阅读量：{{ item.count }}</div>
      <!-- 3.触发自定义事件并传递参数 -->
      <button @click="emit('itemUpdate', index, 2, 'update Done')">add</button>
    </div>
  </template>
  ```

  ```css
  <style scoped>
  .item {
    margin: 20px;
  }
  </style>
  ```

### 模板引用

通过ref标识获取真实的dom对象或者组件实例对象

- 父组件

  ```js
  <script setup>
  import { onMounted, ref } from 'vue'
  import item from './components/item.vue'
  //调用ref函数获取ref对象
  const itemRef = ref(null)
  onMounted(() => {
    console.log(itemRef.value)
  })
  </script>
  ```

  ```html
  <template>
    <div>
      <!-- 通过ref标识绑定ref对象 -->
      <item ref="itemRef"/>
    </div>
  </template>
  ```

- 子组件

  默认情况下在`<script setup>`语法糖下组件内部的属性和方法是不开放给父组件访问的，可以通过defineExpose编译宏指定哪些属性和
  方法允许访问

  ```js
  <script setup>
  import { ref } from 'vue'
  
  const name = ref('itemName')
  const setName = () => {
    name.value = 'newItemName'
  }
  
  defineExpose({
    name,
    setName
  })
  </script>
  ```

### provide和inject

顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信

组件嵌套关系：RoomPage -> RoomMsgItem -> RoomMsgComment

- RoomPage

  ```js
  <script setup>
  import { provide, ref } from 'vue'
  import roomMsgItem from './components/RoomMsgItem'
  
  const count = ref(1)
  //传递响应式数据
  provide('count-key', count)
  
  const setCount = () => {
    count.value++
  }
  //传递方法
  provide('setCount-key', setCount)
  </script>
  ```

  ```html
  <template>
    <div>
      <RoomMsgItem />
    </div>
  </template>
  ```

- RoomMsgItem

  ```js
  <script setup>
  import RoomMsgComment from './components/RoomMsgComment'
  </script>
  ```

  ```html
  <template>
    <div>
      <RoomMsgComment />
    </div>
  </template>
  ```

- RoomMsgComment

  ```js
  <script setup>
  import { inject } from 'vue'
  //接收响应式数据
  const countData = inject('count-key')
  const setCount = inject('setCount-key')
  </script>
  ```

  ```html
  <template>
    <div>
      <div>来自顶层组件中的数据：{{ countData }}</div>
      <button @click="setCount">修改顶层组件的数据</button>
    </div>
  </template>
  ​```xxxxxxxxxx npm run lintsh
  ```

