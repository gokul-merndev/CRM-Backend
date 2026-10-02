const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "Mini CRM API",
    version: "1.0.0",
    description:
      "JWT-protected API for leads, companies, tasks, and dashboard metrics.",
  },
  servers: [{ url: "http://localhost:5000/api" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
  },
  paths: {
    "/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Log in",
        responses: {
          200: { description: "Access token and user" },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current user",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Current user" } },
      },
    },
    "/dashboard": {
      get: {
        tags: ["Dashboard"],
        summary: "Get aggregated CRM metrics",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Dashboard counts" } },
      },
    },
    "/users": {
      get: {
        tags: ["Users"],
        summary: "List users for assignment",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "User list" } },
      },
    },
    "/leads": {
      get: {
        tags: ["Leads"],
        summary: "Search and paginate active leads",
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: "query", name: "page", schema: { type: "integer" } },
          { in: "query", name: "limit", schema: { type: "integer" } },
          { in: "query", name: "search", schema: { type: "string" } },
          { in: "query", name: "status", schema: { type: "string" } },
        ],
        responses: { 200: { description: "Paged leads" } },
      },
      post: {
        tags: ["Leads"],
        summary: "Create a lead",
        security: [{ bearerAuth: [] }],
        responses: { 201: { description: "Created lead" } },
      },
    },
    "/leads/{id}": {
      get: {
        tags: ["Leads"],
        summary: "Get active lead",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Lead" },
          404: { description: "Lead not found" },
        },
      },
      patch: {
        tags: ["Leads"],
        summary: "Update a lead",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Updated lead" } },
      },
      delete: {
        tags: ["Leads"],
        summary: "Soft-delete a lead",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Lead deleted" } },
      },
    },
    "/companies": {
      get: {
        tags: ["Companies"],
        summary: "List companies",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Company list" } },
      },
      post: {
        tags: ["Companies"],
        summary: "Create a company",
        security: [{ bearerAuth: [] }],
        responses: { 201: { description: "Created company" } },
      },
    },
    "/companies/{id}": {
      get: {
        tags: ["Companies"],
        summary: "Get company and active associated leads",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Company details" } },
      },
    },
    "/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "List tasks",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Task list" } },
      },
      post: {
        tags: ["Tasks"],
        summary: "Create a task",
        security: [{ bearerAuth: [] }],
        responses: { 201: { description: "Created task" } },
      },
    },
    "/tasks/{id}/status": {
      patch: {
        tags: ["Tasks"],
        summary: "Update status (assigned user only)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Updated task" },
          403: { description: "Not the assigned user" },
        },
      },
    },
  },
};

export default swaggerDocument;
