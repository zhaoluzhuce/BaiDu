!function (){
    var banner = document.getElementById('banner');
    var bannerInner = document.getElementById('inner');
    var bannerTip = document.getElementById('bannerTip');
    var oLis = bannerTip.getElementsByTagName('li');
    var bannerLeft = document.getElementById('bannerLeft');
    var bannerRight = document.getElementById('bannerRight');
    var imgList=inner.getElementsByTagName('img');
    //实现数据绑定
    var count = imgList.length;

    ~function () {
            utils.setCss(inner,'width',count*560);
            // 动态绑定li
            str = '';
            for(var j=0; j<count-1; j++){
                if(j === 0){
                    str += '<li class="bg"></li>';
                }else{
                    str += '<li></li>';
                }

            }
            bannerTip.innerHTML = str;
    }();

    //接下来我们应该实现自动轮播了，原理：就是控制inner这个div的left值
    var autoTimer = window.setInterval(autoMove,2000);
    var step = 0; //记录当前是哪一张图片 0是第一张  1是第二张
    function autoMove(){ //每隔多长时间执行autoMove
        if(step >= count -1){
            step = 0;
            utils.setCss(bannerInner,'left',0);
            //zhufengAnimate(bannerInner,{left: -step*1000},500);
            //return;
        }
        step++; //过两秒钟执行automove方法。 step++变成1，我们应该是第二张（left：-1000）图片了，
        zhufengAnimate(bannerInner,{left: -step*560},500);
        changeTip();
    }

    //如何实现无缝滚动问题


    //实现焦点对齐
    function changeTip(){
        var tempStep = step > oLis.length-1 ? 0 : step;
        for(var i=0; i<oLis.length; i++){
            var cur = oLis[i];
            i === tempStep ? cur.className = 'bg' : cur.className = '';
        }
    }

    //鼠标滑过banner停止和开启自动轮播
    banner.onmouseover = function (){
        window.clearInterval(autoTimer);
        bannerLeft.style.display = 'block';
        bannerRight.style.display = 'block';
    }
    banner.onmouseout = function (){
        autoTimer = window.setInterval(autoMove,2000);
        bannerLeft.style.display = 'none';
        bannerRight.style.display = 'none';
    }

    //点击焦点实现轮播图的切换
    ~function (){
        for(var i=0; i<oLis.length; i++){
            var cur = oLis[i];
            cur.index = i;
            cur.onclick = function (){
                step = this.index;
                changeTip();
                zhufengAnimate(bannerInner,{left: -step*560},500);
            }
        }
    }();

    //点击左右按钮
    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function (){
        if(step <= 0){
            step = count -1;
            utils.setCss(bannerInner,'left',-step*560);
        }
        step--;
        zhufengAnimate(bannerInner,{left:-step*560},500);
        changeTip();
    }

}()