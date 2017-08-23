/**
 * 测试环境的配置内容
 */
module.exports = {
    env: 'development', //环境名称
    port: 3000,         //服务端口号
    mongodb_url: '',    //数据库地址
    redis:{
        name:'***',
        password:'****',
        sentinels:[{
            host:'***',
            port:'***',
        },{
            host:'***1',
            port:'***',
        },{
            host:'***',
            port:'***',
        }]
    }
}