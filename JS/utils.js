
var utils =(function() {

    return{
        getCss: function (ele, attr) {
            var val = "";
            var reg = '';
            if (window.getComputedStyle) {
                val = attr==='opacity'?window.getComputedStyle(ele, null)[attr]/1:window.getComputedStyle(ele, null)[attr];
            } else {
                if (attr = "opacity") {
                    val = ele.currentStyle['filter'];
                    reg = /^alpha\(opacity=(\d+(\.\d+)?)\)$/;
                    val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
                } else {
                    val = ele.currentStyle[attr];
                }
            }
            reg = /^-?\d+(\.\d+)?(px|em|rem|pt|100%)?$/;
            return reg.test(val) ? parseFloat(val) : val;
        },


        setCss:function (ele,attr,value){
            var reg = /^(width|height|left|right|top|bottom|(margin|padding)(Top|Bottom|Left|Right)?)$/;
            if(reg.test(attr)){
                if(!isNaN(value)){
                    value+='px';
                }
            }
            ele.style[attr]=value;
        },


        jsonParse: function (jsonstr) {
            return 'JSON' in window ? JSON.parse(jsonstr) : eval("(" + jsonstr + ")");
        },


        setGroupCss: function  (curEle,obj){
            obj=obj||'0';
            if(obj.toString()!='[object Object]') {
                return;
            }
            for(var key in obj){
                if(obj.hasOwnProperty(key)){
                    this.setCss(curEle,key,obj[key]);
                }
            }
        }
    }
})();



