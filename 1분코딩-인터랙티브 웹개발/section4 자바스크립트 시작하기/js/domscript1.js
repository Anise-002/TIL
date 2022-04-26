//기본으로 const를 이용하되, 변하는 값은 let으로 한다.
const ilbuni = document.querySelector('.a');
//하나만 선택하고 싶을때 (만약 같은 클래스를 가진 객체가 여러게 있다면 첫번째꺼만 선택되어 반환한다.)
const ilbuni = document.querySelectorAll('.a');
///.a를 가지고 있는 모든 객체를 선택하고싶다면 querySelectorAll을 사용한다.
ilbuni[2]; 
//인덱스 2번인 애를 가져간다.
const ilbuni = document.querySelector('.a:nth-child(2)'); //이것도 가능!




//속성을 가져오거나 속성을 추가한다.
/*data- 로 시작하는 표준 커스텀 속성이에요.
data-indexedDB, data-id, data-role등 data-의 형식으로 시작하면 어떤 속성이든 필요에 따라
임의로 추가할 수 있습니다. */
const char = document.querySelector('.char')
char.setAttribute('data-id',123);
//이것은 char이라는 것에 data-id 123의 속성이 추가된다.
//엘리멘트의 속성을 추가한다.
char.getAttribute('data-id');
//속성의 값을 가져오기 위해 사용한다. : getAttribute(속성)
