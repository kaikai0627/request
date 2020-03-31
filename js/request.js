// 全局配置
let common = {
    baseUrl: "https://wapptest.shjade.com.cn",
    header: {
        'Content-Type': 'application/json;charset=utf8',
        'Authorization': ''
    },
    data: {},
    method: 'GET',
    dataType: 'json'
};
// ajax请求 返回promise
function ajax(url, options = {}) {
    // 组织参数
    options.url = common.baseUrl + url;
    options.headers = options.header || common.header;
    options.data = JSON.stringify(options.data || common.data);
    options.type = options.method || common.method;
    options.dataType = options.dataType || common.dataType;
    // 创建Promise
    return new Promise((res, rej) => {
        $.ajax({
            ...options,
            success: (result) => {
                // 根据返回的状态码判断二次判断 失败执行rej 成功执行res
                if (result.status !== 0) {
                    alert(result.data.msg || '服务器端失败')
                    return rej(result.data)
                }
                return res(result)
            },
            error: function(err) {
                alert("请求失败")
                return rej(err)
            }
        })
    })

}

function post(url, data = {}, options = {}) {
    options.data = data;
    options.method = 'POST';
    options.header = {
        ...options.header,
        ...common.header
    }
    options.header['Authorization'] = '2222'
    return ajax(url, options)
}

function get(url, data = {}, options = {}) {
    options.data = data;
    options.method = 'GET';
    options.header = {
        ...options.header,
        ...common.header
    }
    options.header['Authorization'] = '1111'
    return ajax(url, options)
}