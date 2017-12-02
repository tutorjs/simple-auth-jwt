## Simple Auth With JWT.

## Endpoints

### `POST /login`

Sample User.

| id | email          | password |
|----|----------------|----------|
| 1  | admin@mail.com | password |

#### Request Body.

```json
  {
    "email": "admin@mail.com",
    "password": "password"
  }

```
#### Response.

```json
  {
    "meta": {
        "code": 200,
        "success": true
    },
    "user": {
        "email": "admin@mail.com",
        "password": "password",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE1MTIyMzM0NTR9.BgCAO46Zv3VDQ0NwqvVe8LgqqLIttg-Sw-0cokVrT0Y"
    }
  }

```

### `GET /protected`

` curl -X GET http://localhost:3000/protected?token=token_value `

#### Query Strings.

| name  | value       |
|-------|-------------|
| token | value_token |

#### Response

```json
  
  {
    "meta": {
        "code": 200,
        "success": true
    },
    "message": "Protected page!"
  }

```

Thanks.

