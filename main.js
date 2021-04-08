window.addEventListener("load", function() {
    var wrap = document.getElementById("wrap")
    var contentBody = document.getElementById("content") 
    var sideMenu = document.getElementById("sideNav")
    var header = document.getElementById("header")

    // mousemove
    document.addEventListener("mousemove", debounce(mouseTarget, 300))

    //  debounce
    function debounce(func, delay) {
        var timer = null;
        return function(...arg) {
                clearInterval(func)
                timer = setTimeout(func.bind(null, ...arg), delay)
            }
    }
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