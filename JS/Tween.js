!function(){
    var zhufengEffect ={
        Linear:function(t,c,b,d){
            return b+t/d*c;
        }
    };
    function move(curEle,target,duration){
        var times=0;
        var interval=15;
        var begin={};
        var change={};
        for(var key in target){
            if(target.hasOwnProperty(key)){
                begin[key]=utils.getCss(curEle,key);
                change[key]=target[key]-begin[key];
            }
            window.clearInterval(curEle.timer);
            curEle.timer=setInterval(function(){
                times+=interval;
                if(times>duration){
                    window.clearInterval(curEle.timer);
                    utils.setGroupCss(curEle,target);
                    return;
                }
                for(var k in target){
                    if(target.hasOwnProperty(k)){
                        var poi=zhufengEffect.Linear(times,change[k],begin[k],duration);
                        utils.setCss(curEle,k,poi);
                    }
                }
            },interval)
        }
    }
    window.zhufengAnimate=move;
}();
