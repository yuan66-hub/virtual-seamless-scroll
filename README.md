#  react-virtual-seamless-scroll

> 仅支持等高等宽无缝滚动

##  运行 

```bash
pnpm i && pnpm run dev
```

## 效果

![这是图片](/docs/preview.gif "Magic Gardens")


## 组件参数说明
| 参数 | 说明                        | 类型      | 默认值       |
| --- |---------------------------|---------|-----------|
| list | 数据源                       | Array   | []        |
| limitScrollNum | 开启滚动的数据量，只有列表长度大于等于该值才会滚动 | Number  | 100       |
| intervalTime | 滚动间隔时间(ms,越小约快)           | Number  | 300       |
| maxViewNum | 视图里最多显示的数据量(开启虚拟列表的阈值)    | Number  | 20        |
| mouseenterStop | 鼠标移入是否停止滚动                | Boolean | true      |
| direction | 滚动方向(vertical horizontal)                    | String  | vertical  |

## 参考

- [vue-seamless-scroll](https://github.com/chenxuan0000/vue-seamless-scroll)
- [virtual-seamless-scroll](https://github.com/wy1348666498/virtual-seamless-scroll)

