# API-CONTRACTS.md
# API Contracts

## 1. Standard Response

Success:
```json
{
  "success": true,
  "data": {}
}
```

Failure:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input tidak valid",
    "fieldErrors": {}
  }
}
```

Never return:
- password;
- session token;
- stack trace;
- Cloudinary secret.

## 2. Status Codes

| Status | Use |
|---|---|
| 200 | success read/update |
| 201 | created |
| 400 | malformed input |
| 401 | unauthenticated |
| 403 | authenticated but forbidden |
| 404 | resource missing |
| 409 | conflict |
| 422 | validation failure |
| 429 | rate limited |
| 500 | unexpected server error |

## 3. POST /api/kontak

Input:
```json
{
  "name": "string",
  "email": "email",
  "phone": "string|null",
  "message": "string",
  "source": "general|partnership"
}
```

Rules:
- public;
- Zod;
- rate limit;
- store;
- return 201.

## 4. Product

Create/update requires:
- name;
- slug;
- shortDesc;
- fullDesc;
- features;
- imageUrl optional;
- galleryUrls;
- order;
- isPublished;
- isFeatured.

Slug:
- kebab-case;
- unique;
- no duplicate published route.

## 5. Partner

Requires:
- name;
- category;
- description;
- icon optional;
- order;
- isPublished.

## 6. Admin Mutation Policy

All mutation routes:
1. auth;
2. parse;
3. validate;
4. mutate;
5. invalidate/revalidate relevant public data;
6. return typed result.

