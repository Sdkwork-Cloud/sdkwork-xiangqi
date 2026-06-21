#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isBlank, joinPath } from '@sdkwork/utils';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkMode = process.argv.includes('--check');

const OWNER = 'sdkwork-xiangqi';
const DOMAIN = 'game';

const outputPaths = {
  appAuthority: joinPath('apis', 'app-api', 'game', 'xiangqi-app-api.openapi.json'),
  backendAuthority: joinPath('apis', 'backend-api', 'game', 'xiangqi-backend-api.openapi.json'),
  generatedApp: joinPath('generated', 'openapi', 'xiangqi-app-api.openapi.json'),
  generatedBackend: joinPath('generated', 'openapi', 'xiangqi-backend-api.openapi.json'),
};

const sharedComponents = {
  securitySchemes: {
    AuthToken: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'SDKWork-Auth-Token',
      description: 'SDKWork dual-token auth principal (Authorization bearer).',
    },
    AccessToken: {
      type: 'apiKey',
      in: 'header',
      name: 'Access-Token',
      description: 'SDKWork dual-token access credential header.',
    },
  },
  parameters: {
    MatchIdPath: {
      name: 'matchId',
      in: 'path',
      required: true,
      schema: { type: 'string' },
    },
    PageQuery: {
      name: 'page',
      in: 'query',
      required: false,
      schema: { type: 'integer', minimum: 1, default: 1 },
    },
    PageSizeQuery: {
      name: 'page_size',
      in: 'query',
      required: false,
      schema: { type: 'integer', minimum: 1, maximum: 200, default: 20 },
    },
    StatusQuery: {
      name: 'status',
      in: 'query',
      required: false,
      schema: { type: 'string' },
    },
  },
  responses: {
    ProblemDetailResponse: {
      description: 'RFC 9457 problem details.',
      content: {
        'application/problem+json': {
          schema: { $ref: '#/components/schemas/ProblemDetail' },
        },
      },
    },
  },
  schemas: {
    ProblemDetail: {
      type: 'object',
      additionalProperties: true,
      required: ['type', 'title', 'status'],
      properties: {
        type: { type: 'string', format: 'uri' },
        title: { type: 'string' },
        status: { type: 'integer' },
        detail: { type: 'string' },
        instance: { type: 'string' },
      },
    },
    XiangqiApiResult: {
      type: 'object',
      additionalProperties: false,
      required: ['code', 'message', 'data'],
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
        data: {},
      },
    },
    XiangqiHealthResponse: {
      type: 'object',
      additionalProperties: false,
      required: ['status', 'service'],
      properties: {
        status: { type: 'string' },
        service: { type: 'string' },
      },
    },
    XiangqiMatchItem: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'matchCode', 'title', 'status'],
      properties: {
        id: { type: 'string' },
        matchCode: { type: 'string' },
        title: { type: 'string' },
        summary: { type: 'string' },
        mode: { type: 'string' },
        status: { type: 'string' },
      },
    },
    XiangqiMatchPage: {
      type: 'object',
      additionalProperties: false,
      required: ['items', 'total', 'page', 'pageSize'],
      properties: {
        items: {
          type: 'array',
          items: { $ref: '#/components/schemas/XiangqiMatchItem' },
        },
        total: { type: 'integer', minimum: 0 },
        page: { type: 'integer', minimum: 1 },
        pageSize: { type: 'integer', minimum: 1 },
      },
    },
  },
};

function buildOpenApi(title, serverUrl, operations) {
  return {
    openapi: '3.1.2',
    jsonSchemaDialect: 'https://json-schema.org/draft/2020-12/schema',
    info: {
      title,
      version: '0.1.0',
      description: 'SDKWork xiangqi platform HTTP contract.',
      'x-sdkwork-owner': OWNER,
      'x-sdkwork-domain': DOMAIN,
    },
    servers: [{ url: serverUrl, description: 'SDKWork API root' }],
    paths: operations,
    components: sharedComponents,
  };
}

const appOperations = {
  '/app/v3/api/system/health': {
    get: {
      operationId: 'xiangqi.health.check',
      tags: ['health'],
      'x-sdkwork-request-context': 'WebRequestContext',
      'x-sdkwork-api-surface': 'app-api',
      'x-sdkwork-owner': OWNER,
      'x-sdkwork-domain': DOMAIN,
      security: [],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/XiangqiHealthResponse' },
            },
          },
        },
        default: { $ref: '#/components/responses/ProblemDetailResponse' },
      },
    },
  },
  '/app/v3/api/system/ready': {
    get: {
      operationId: 'xiangqi.ready.check',
      tags: ['health'],
      'x-sdkwork-request-context': 'WebRequestContext',
      'x-sdkwork-api-surface': 'app-api',
      'x-sdkwork-owner': OWNER,
      'x-sdkwork-domain': DOMAIN,
      security: [],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/XiangqiHealthResponse' },
            },
          },
        },
        default: { $ref: '#/components/responses/ProblemDetailResponse' },
      },
    },
  },
  '/app/v3/api/xiangqi/matches': {
    get: {
      operationId: 'xiangqi.match.list',
      tags: ['xiangqi'],
      'x-sdkwork-request-context': 'WebRequestContext',
      'x-sdkwork-api-surface': 'app-api',
      'x-sdkwork-owner': OWNER,
      'x-sdkwork-domain': DOMAIN,
      security: [{ AuthToken: [], AccessToken: [] }],
      parameters: [
        { $ref: '#/components/parameters/PageQuery' },
        { $ref: '#/components/parameters/PageSizeQuery' },
        { $ref: '#/components/parameters/StatusQuery' },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/XiangqiApiResult' },
            },
          },
        },
        default: { $ref: '#/components/responses/ProblemDetailResponse' },
      },
    },
  },
  '/app/v3/api/xiangqi/matches/{matchId}': {
    get: {
      operationId: 'xiangqi.match.retrieve',
      tags: ['xiangqi'],
      'x-sdkwork-request-context': 'WebRequestContext',
      'x-sdkwork-api-surface': 'app-api',
      'x-sdkwork-owner': OWNER,
      'x-sdkwork-domain': DOMAIN,
      security: [{ AuthToken: [], AccessToken: [] }],
      parameters: [{ $ref: '#/components/parameters/MatchIdPath' }],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/XiangqiApiResult' },
            },
          },
        },
        default: { $ref: '#/components/responses/ProblemDetailResponse' },
      },
    },
  },
};

const backendOperations = {
  '/backend/v3/api/xiangqi/matches': {
    get: {
      operationId: 'backend.xiangqi.match.list',
      tags: ['xiangqi'],
      'x-sdkwork-request-context': 'WebRequestContext',
      'x-sdkwork-api-surface': 'backend-api',
      'x-sdkwork-owner': OWNER,
      'x-sdkwork-domain': DOMAIN,
      security: [{ AuthToken: [], AccessToken: [] }],
      parameters: [
        { $ref: '#/components/parameters/PageQuery' },
        { $ref: '#/components/parameters/PageSizeQuery' },
        { $ref: '#/components/parameters/StatusQuery' },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/XiangqiApiResult' },
            },
          },
        },
        default: { $ref: '#/components/responses/ProblemDetailResponse' },
      },
    },
  },
};

if (isBlank(OWNER)) {
  throw new Error('owner must be non-empty');
}

const appDoc = buildOpenApi('SDKWork Xiangqi App API', '/app/v3/api', appOperations);
const backendDoc = buildOpenApi('SDKWork Xiangqi Backend API', '/backend/v3/api', backendOperations);

const expected = {
  [outputPaths.appAuthority]: `${JSON.stringify(appDoc, null, 2)}\n`,
  [outputPaths.backendAuthority]: `${JSON.stringify(backendDoc, null, 2)}\n`,
  [outputPaths.generatedApp]: `${JSON.stringify(appDoc, null, 2)}\n`,
  [outputPaths.generatedBackend]: `${JSON.stringify(backendDoc, null, 2)}\n`,
};

function assertMaterialized(relativePath, content) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`[xiangqi-openapi] missing materialized document: ${relativePath}`);
    process.exit(1);
  }
  const actual = fs.readFileSync(fullPath, 'utf8');
  if (actual !== content) {
    console.error(`[xiangqi-openapi] stale materialized document: ${relativePath}`);
    process.exit(1);
  }
}

if (checkMode) {
  for (const [relativePath, content] of Object.entries(expected)) {
    assertMaterialized(relativePath, content);
  }
  process.stdout.write('[xiangqi-openapi] materialized OpenAPI documents are aligned\n');
} else {
  for (const relativePath of Object.keys(expected)) {
    fs.mkdirSync(path.dirname(path.join(root, relativePath)), { recursive: true });
  }
  for (const [relativePath, content] of Object.entries(expected)) {
    fs.writeFileSync(path.join(root, relativePath), content);
  }
  process.stdout.write('[xiangqi-openapi] exported app and backend OpenAPI documents\n');
}
