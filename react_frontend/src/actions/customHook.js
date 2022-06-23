import { useState, useEffect, useRef } from 'react';

// function useInterval(callback, delay) {
//     const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

//     // callback이 바뀔 때마다 실행
//     // 첫 실행에 callback이 한 번 들어옴 -> 리렌더링 -> 다시 들어옴 -> 리렌더링 -> .. 무한 반복
//     // 원래의 의도는 callback이 새로 들어오면 그 callback을 저장해두고 아래의 setInterval을 다시 실행해주려는 의도
//     useEffect(() => {
//     savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
//     }, [callback]);


//     // mount가 끝나고 1번 일어남
//     // 맨 처음 mount가 끝나고 savedCallback은 null이기 때문에 setInterval의 executeCallback이 제대로 실행되지 않음 (null이기 때문에)
//     useEffect(() => {
//         function tick() {
//             savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
//         }
//         if (delay !== null) { // 만약 delay가 null이 아니라면 
//             let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
//             return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
//         }
//     }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
// }


const useInterval = (callback, delay) => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const executeCallback = () => {
      savedCallback.current();
    };

    const timerId = setInterval(executeCallback, delay);

    return () => clearInterval(timerId);
  }, []);
};

export default useInterval;


// useEffect(() => {
//     let timer = setInterval(() => {
//       const selectedTagIdParam = selectedTagList.map(({ id }) => id).join(',');
//       getRooms(selectedTagIdParam); // 서버에 요청해 방 목록을 불러오는 메서드
//     }, 5000);
    
//     return () => clearInterval(timer)
// }, []);

// useInterval(() => {
//     const selectedTagIdParam = selectedTagList.map(({ id }) => id).join(',');
//     getRooms(selectedTagIdParam);
// }, 5000);