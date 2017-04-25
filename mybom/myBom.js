/*
 *简单封装BOM库
 *
 */

window.$ = function () {
    let array = [];
    return array;
}

$.bom = {

    //弹出居中窗口
    openAtCenter: function (width, height, url) {
        console.log(url);
        //检测URL
        if ($.bom._isURL(url)) {

            console.log($.bom._isURL(url));

            window.open(url, '_blank',
                `width=${width}px,
            height=${height}px,
            screenX=${screen.width / 2 - width / 2}px,
            screenY=${screen.height / 2 - height / 2}px`
            );
        }
    },

    //查询字符串
    search: function(name, value){
        let searchAll = function(){
            let result = {}
            let search = window.location.search
            // 去掉?
            if(search[0] === '?'){
                search = search.slice(1)
            }
            // 用 & 分隔成数组
            let searchArray = search.split('&')

            for(var i =0;i<searchArray.length; i++){
                //再次分割url
                let parts = searchArray[i].split('=')
                // URI 进行解码变成中文
                result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '')
            }
            return result
        }
        let result = searchAll()

        if(value === undefined){
            return result[name]
        }else{
            if(result[name] === undefined){
                location.search += `&${encodeURIComponent(name)}=${encodeURIComponent(value)}`
            }else{
                result[name] = encodeURIComponent(value)
                let newSearch = '?'
                for(let key in result){
                    newSearch += `${encodeURIComponent(key)}=${encodeURIComponent(result[key])}&`
                }
                location.search = newSearch
            }
        }
    },


    //检测URL
    _isURL: function (url) {
        let re = new RegExp("^((https|http)?://)"
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL:199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+\.)*" // 域名www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
            + "[a-z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|"
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");
        return re.test(url);

    }
    
}