// 유틸함수니까 사실 어딘가 다른 파일에 저장되어 있겠쥬?
// 그리고 debounce 구현하면서 생각하셔야 할게
// 지금처럼 setTimeout, 300으로 하면
// 맨 처음 실행시에도 딜레이 300이 존재해요
// 근데 사실 따지고보면 최초 실행은 딜레이 없이 실행되어야 되거든요
// 이걸 고려해서 다시 만들어 보시는것도 좋을 것 같습니다요우요우
function debounce(func, delay) {
    var timer = null;
    return function(...arg) {
            clearTimeout(func)
            timer = setTimeout(func.bind(null, ...arg), delay)
        }
}


// load 얘는 모든 리소스 다 로딩되고 나서 실행되는 애인데
// 그럴 이유가 없다면 DOM컨텐츠만 로딩되고 나서 실행되는게 좋으니
// 이벤트에 DOM에만 영향있는 코드로 짜여있으면 DOMContentLoaded로 조지시면 됩니다.
// jQuery $(function(){}) 얘가 DOMContentLoaded로 돌아가는애에요
// DOMContentLoaded : DOM 요소가 로딩 됬을 때 발생.  이미지 , 스타일 시트 등 기타 자원은 기다리지 않는다
// load : DOM 요소를 읽고 이미지 , 스타일 시트같은 외부자원도 모두 불러오는게 끝났을때 발생 
window.addEventListener("DOMContentLoaded", function() {
    var wrap = document.getElementById("wrap")
    var contentBody = document.getElementById("content") 
    var sideMenu = document.getElementById("sideNav")
    var header = document.getElementById("header")

    // mousemove
    // 인라인화 시키는게 좋아보여요우요우
    document.addEventListener("mousemove", debounce(mouseTarget, 300))

    // 여기서의 ...arg는 mouseTarget 매개변수의 event.target이 들어간다. 
    // 

    // 사이드메뉴 영역에 들어가면 사이드메뉴 생성 및 콘텐츠 크기 조절
    function mouseTarget(e) {
        var x = e.pageX
        var y = e.pageY
        
        var sideMenuWid = sideMenu.offsetWidth
        var headerHeight = header.offsetHeight

        var targetTrigger = y - headerHeight

         if (window.innerWidth > 1024) {
            if ((x <= sideMenuWid) && (targetTrigger >= 0)){
                wrap.classList.add("active")
                contentBody.style.marginLeft = sideMenuWid + "px"
            } else {
                wrap.classList.remove("active")
                contentBody.style.marginLeft = 0
            }
         }
    }
    
    // 얘도 마찬가지요
    // resize 
    window.addEventListener("resize",  debounce(mobileLayout, 300))

    //window width값이 1024이하면 사이드 메뉴 제거
    function mobileLayout() {

        var sideMenuWid = sideMenu.offsetWidth

        if (window.innerWidth <= 1024) {
            sideMenu.style.display = "none"
            contentBody.style.marginLeft = 0

        } else {
            sideMenu.style.display = "block"
            contentBody.style.marginLeft = sideMenuWid + "px"
        }
    }
})

