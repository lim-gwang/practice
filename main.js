  //  debounce
 function debounce(func, delay) {

    var timer = null;

    return function(...arg) {
            clearTimeout(func)
            timer = setTimeout(func.bind(null, ...arg), delay)
            // timer = setTimeout( function() {
            //     func.call(this, ...arg)
            // }, delay)
           
        }

}





//branch name : sub 


// 여기서의 ...arg는 mouseTarget 매개변수의 event.target이 들어간다. 
// 

//throttle 
function throttle(func, delay) {
    
    var timer = null

    return function(...arg) {

        if (!timer) {
            
            timer = setTimeout( function () {
                timer = null 
                func.call(this, ...arg)
            }, delay)
            
        }

    }
}

/*
************* aside menu event *******************
*/
window.addEventListener("DOMContentLoaded", function() {
    var wrap = document.getElementById("wrap")
    var contentBody = document.getElementById("content") 
    var sideMenu = document.getElementById("sideNav")
    var header = document.getElementById("header")

    // mousemove
    document.addEventListener("mousemove", debounce(mouseTarget, 300))

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

        if (window.innerWidth <= 1024) {
            wrap.classList.remove("active")
            sideMenu.style.display = "none"
            contentBody.style.marginLeft = 0
        } else {
            sideMenu.style.display = "block"
        }
    }


    var upLoadBtn = document.querySelector(".upload")
    var contentParent = document.querySelector("#content > .container")
    var feedForm = document.getElementById("feedForm");

    // 글 업로드 
    upLoadBtn.addEventListener("click", function() {

        var FormText = feedForm.value

        if (FormText) {
            CreateItem()
        }

        return
    })
    feedForm.addEventListener("keypress", function(e) {
        var keyCode = e.key
        var FormText = feedForm.value

        if (keyCode === "Enter") {
            if (FormText) {
                CreateItem()
            }
        } 

        return
    })

    function CreateItem() {
        feedForm = document.getElementById("feedForm");
        var feedFormValue = feedForm.value
        var newItem = document.createElement("div")
        newItem.setAttribute("class", "item")

        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth()
        month = month >= 10 ? month: "0" + month
        var day = date.getDay() - 1 
        day = day >= 10 ? day: "0" + day
        var hours  = date.getHours()
        hours = hours >= 10 ? hours: "0" + hours
        var minutes = date.getMinutes()
        minutes = minutes >= 10 ? minutes: "0" + minutes


        newItem.innerHTML += 
        "<p>"
        + feedFormValue +
        "</p>"
        + 
        "<span>"
        +year+"."+ month +"."+month+"  "+hours+":"+minutes+
        "</span>" 
        +
        "<button class='del'>삭제</button>"

        contentParent.appendChild(newItem)
        
        feedForm.value = ""
    }

    // 글 삭제
    contentParent.addEventListener("click", itemDel)
    
    function itemDel(e) {
        var target = e.target
        if (target.classList == "del") {
            if (target.parentElement.classList == "item") {
                target.parentElement.remove()
            }
            return
        }


        return
    }

})
