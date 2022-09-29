import React, { useState, useEffect, useRef } from "react"
import debounce from "lodash.debounce"
import "./App.css"
import MatElem from "./MatElem"

function App() {
  var n = 60 //colm
  var m = 20 //rows

  // 300 -> visited
  // 400-> focused
  // 500 -> captured
  // 100 -> not visited

  // const [currKey, setCurrKey] = useState({x:0, j:4})
  const [x, _setX] = useState(m / 2)
  const [y, _setY] = useState(n / 2)
  const [obj, setObj] = useState({
    visited: [],
    focused: [[0, 0]],
    captured: [],
  })

  const parent = useRef()
  // parent.current.children && parent.current.children.forEach(element => {
  //   console.log(element)

  // })
  // console.log(parent.current && parent.current.children)
  // if(parent.current && parent.current.children && parent.current.children[0])
  // obj.focused &&parent.current&& obj.focused.map((m)=>{
  //     parent.current.children[m[0]].children[m[1]].classList.add("focused");
  //     console.log(parent.current.children[m[0]].children[m[1]])
  // })
  // useEffect(() => {
  // }, [parent.current])

  const xRef = useRef(x)
  const yRef = useRef(y)

  const setX = (data) => {
    xRef.current = data
    _setX(data)
  }

  const setY = (data) => {
    yRef.current = data
    _setY(data)
  }

  let lastFocused = ""

  let currentlyFocusing = ""

  const focus = debounce(
    (coordinates) => {
      console.log("focusing", coordinates[0], coordinates[1])
      // change(coordinates[0], coordinates[1], 'focused');
      updateMat(coordinates[0], coordinates[1], 400)
      lastFocused = coordinates
      setTimeout(() => {
        if (lastFocused == currentlyFocusing) {
          // change(lastFocused[0], lastFocused[1], 'captured');
          updateMat(coordinates[0], coordinates[1], 500)
          console.log("capturing", currentlyFocusing)
        }
      }, 2000)
    },
    3000,
    {
      leading: false,
      trailing: true,
    }
  )

  // useEffect(() => {
  //   // instead of setting the coordinates as currentlyFocusing we have to set the co-ordinates (x,y) to make it work and instead of console.logging we would push them into focused and captured arrays
  //   document.addEventListener("keydown", (e) => { currentlyFocusing = [x,y]; focus(currentlyFocusing); });
  // }, []);

  // function change(x, y, scene) {
  //   console.log("hello")
  //   var temp = [x, y]
  //   switch (scene) {
  //     case 'focused': obj.focused && setObj(prev => {
  //       prev.focused.push(temp);
  //       return prev;
  //     });
  //       break;
  //     case 'visited': obj.visited && setObj(prev => {
  //       prev.visited.push(temp);
  //       return prev
  //     });  console.log(obj,x,y)
  //       break

  //     default: obj.captured && setObj(obj.captured = [...obj.captured, temp]);
  //   }
  // }

  // console.log(obj)
  const tempArr = makeArray(n, m, 100)
  const [matrix, setMatrix] = useState(tempArr)

  // const [index, setindex] = useState([2,6]);

  // temp[x][y]=-3

  // const [e.code, setAction] = useState("keyA");
  function updateMat(r, c, val) {
    console.log(r, c, val)
    setMatrix((prev) => {
      console.log(prev[r][c])
      prev[r][c] = val
      return prev
    })
    focus.cancel()
  }

  let keyboardEvent = (e) => {
    if (e.code === "ArrowLeft") {
      setY((prev) => {
        if (prev >= 0) return prev - 1
        else return prev
      })
      // change(x, y,'visited');
    } else if (e.code === "ArrowRight") {
      setY((prev) => {
        if (prev < n) return prev + 1
        else return prev
      })
      // change(x, y,'visited');
    } else if (e.code === "ArrowUp") {
      setX((prev) => {
        if (prev >= 0) return prev - 1
        else return prev
      })
      // change(x, y,'visited');
    } else if (e.code === "ArrowDown") {
      setX((prev) => {
        if (prev < m) return prev + 1
        else return prev
      })
    }
  }
  useEffect(() => {
    // change(x, y, 'visited')
    if (x >= 0 || y >= 0 || x >= m || y >= n) {
      currentlyFocusing = [x, y]
      console.log(x, y)
      updateMat(x, y, 300)
      focus(currentlyFocusing)
    }
  }, [x, y])

  // console.log(currKey)

  useEffect(() => {
    if (x >= 0 || y >= 0 || x < m || y < n)
      document.addEventListener("keyup", keyboardEvent)
  }, [])

  function makeArray(w, h, val) {
    var arr = []
    for (let i = 0; i < h; i++) {
      arr[i] = []
      for (let j = 0; j < w; j++) {
        arr[i][j] = val
      }
    }
    return arr
  }

  // const matrix = makeArray(n, m, 1000);
  // change(x,y,"focused")

  return (
    <div>
      <div ref={parent} style={{ border: "2px solid black" }}>
        {matrix &&
          matrix.map((row, i) => (
            <div key={i} style={{ color: "white" }}>
              {row.map((col, j) => {
                // setindex([i,j]);
                return (
                  <MatElem
                    key={j}
                    col={col}
                    color={x === i && y === j ? "green" : ""}
                    ind={[i, j]}
                  />
                )
              })}
            </div>
          ))}
      </div>
      <div>
        Focused : dotted-blue, captured : solid-black, visited: grey, not
        visited: white
      </div>
    </div>
  )
}

export default App
