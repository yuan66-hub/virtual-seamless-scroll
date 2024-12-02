import * as React from "react"
import VirtualSeamlessScroll from "./components/VirtualSeamlessScroll/index"
import './index.css'
function App() {
  let index = 1
  const listData = Array.from({ length: 10000 }, () => ({
    index: index++,
    name: "虚拟列表无缝滚动组件",
    num: Math.floor(Math.random() * 10),
  }))
  return (
    <>
      <h2>纵向滚动</h2>
      <div className='list-box'>
        <VirtualSeamlessScroll list={listData}>
          {
            (item) => {
              return (
                <div className='i-item'>
                  <span>{item.index}</span>
                  <span>{item.name}</span>
                  <span>{item.num}</span>
                </div>
              )
            }
          }
        </VirtualSeamlessScroll>
      </div>
      <h2>横向滚动</h2>
      <div className="list-box">
        <VirtualSeamlessScroll list={listData} direction={'horizontal'}>
          {
            (item) => {
              return (
                <div className='i-item'>
                  <span>{item.index}</span>
                  <span>{item.name}</span>
                  <span>{item.num}</span>
                </div>
              )
            }
          }
        </VirtualSeamlessScroll>
      </div>
    </>
  )
}

export default App
