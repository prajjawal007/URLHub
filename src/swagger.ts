import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "URLHub API",
      version: "1.0.0",
      description: "Swagger docs for URLHub Shortener",
    },
    servers: [
      {
        url: "http://localhost:8081/api",
      },
    ],
  },
  apis: ["./dist/routes/*.js"], // 👈 your route files
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
