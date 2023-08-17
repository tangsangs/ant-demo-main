const Koa = require('koa');
const app = new Koa();
const Router = require('@koa/router');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-koa');


// Swagger配置
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for your project',
        },
    },
    apis: ['./routes/*.js'], // 指定API文件的路径，根据实际情况修改
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// 使用Swagger UI中间件来展示接口文档
app.use(swaggerUi.serve);
app.use(swaggerUi.setup(swaggerSpec));

// 其他路由和中间件配置...
// ...

// 启动服务器
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


//test