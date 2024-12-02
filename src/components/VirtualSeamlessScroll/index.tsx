import * as React from 'react'
import { useMemo, useRef, useState, useEffect } from 'react'
import  './index.css'

type Direction = 'vertical' | 'horizontal' 

interface IOptions {
  children: (item: any) => React.ReactNode
  direction?: Direction
  list: object[]
  limitScrollNum?: number // 开启滚动的数据量，只有列表长度大于等于该值才会滚动
  intervalTime?: number // 滚动间隔时间
  maxViewNum?: number
  mouseenterStop?: boolean
}

export default function VirtualSeamlessScroll(props: IOptions) {
  const { children, direction ='vertical', list = [], maxViewNum = 20, limitScrollNum = 10, intervalTime = 300, mouseenterStop = true } = props
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nList, setnList] = useState(list)
  // 动画
  let animation: Animation;
  // 是否开启虚拟滚动
  const isVirtual = useMemo(() => nList.length > maxViewNum, [nList, maxViewNum]);
  const currentList = useMemo(() => {
    // 如果列表长度小于limitScrollNum，不滚动
    if (nList.length < limitScrollNum) return nList;
    // 如果不开启虚拟滚动，直接返回2倍列表
    const arr = nList.concat(nList);
    if (!isVirtual) return arr;
    // 补齐为maxViewNum的倍数
    const nArr =
      arr.length % maxViewNum
        ? arr.concat(
          arr.slice(0, maxViewNum - (arr.length % maxViewNum))
        )
        : arr;
    return nArr.slice(currentIndex, currentIndex + maxViewNum);
  }, [nList, currentIndex, isVirtual, maxViewNum, limitScrollNum])
  // 滚动
  function run() {
    if (nList.length < limitScrollNum) return;
    const moveDirection: any = {
      vertical: "translateY",
      horizontal: "translateX",
    };
    const moveDistance: any = {
      vertical: scrollRef.current?.clientHeight,
      horizontal: scrollRef.current?.clientWidth,
    };
    // 创建动画
    const keyframes = [
      { transform: `${moveDirection[direction]}(0)` },
      {
        transform: `${moveDirection[direction]}(-${moveDistance[direction] / 2
          }px)`
      },
    ];
    const options = {
      duration: intervalTime * currentList.length,
      iterations: 1,
    };
    animation = scrollRef.current?.animate(keyframes, options) as Animation;
    animation.onfinish = () => {
      if (isVirtual) {
        if (currentIndex + maxViewNum / 2 >= nList.length) {
          setCurrentIndex(maxViewNum / 2 - (nList.length - currentIndex))
        } else {
          setCurrentIndex(maxViewNum / 2)
        }
      }
      run();
    };
  }

  /**
 * @description 暂停动画
 */
  function animationPause() {
    animation && animation.pause();
  }

  /**
   * @description 播放动画
   */
  function animationPlay() {
    animation && animation.play();
  }

  /**
   * @description 取消动画
   */
  function animationCancel() {
    animation && animation.cancel();
  }

  useEffect(() => {
    animationCancel();
    setCurrentIndex(0)
    setnList(list)
    run();
  }, [list])

  useEffect(() => {
    if (mouseenterStop) {
      // 鼠标移入停止滚动
      scrollRef.current?.addEventListener("mouseenter", animationPause);
      // 鼠标移出继续滚动
      scrollRef.current?.addEventListener("mouseleave", animationPlay);
    }
    return () => {
      animationCancel();
      if (mouseenterStop) {
        scrollRef.current?.removeEventListener("mouseenter", animationPause);
        scrollRef.current?.removeEventListener("mouseleave", animationPlay);
      }
    }
  }, [])


  return (
    <div className={'virtual-seamless-scroll'}>
      <div ref={scrollRef} className={direction}>
        {
          currentList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {
                  children(item)
                }
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  )
}