const data = {u: '121', p: 'hheq', dd: 'aaasc'}

console.log(Object.keys(data).reduce((pre_val, cur_val) => {
    return cur_val + '=' + data[cur_val] + '&' + pre_val
}, '_=1'))
