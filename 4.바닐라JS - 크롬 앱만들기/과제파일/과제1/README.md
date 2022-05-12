# 바닐라 js 2주 챌린지 과제1
## 과제 내용
1.마우스가 title위로 올라가면 텍스트가 변경되어야 합니다.
2. 마우스가 title을 벗어나면 텍스트가 변경되어야 합니다.
3. 브라우저 창의 사이즈가 변하면 title이 바뀌어야 합니다.
4. 마우스를 우 클릭하면 title이 바뀌어야 합니다.
5. 모든 함수 핸들러는 superEventHandler내부에 작성해야 합니다.

## js 코드
+ h2태그를 mainText 변수로 지정함
+ `superEventHandler` 객체에 메소드로 각 이벤트마다 일어날 일들을 코드에 담음
+ 이벤트 별로 호출해서 addEventListener 두번째 인수에 `superEventHandler`메서드를 넣어 작동하도록 했음

