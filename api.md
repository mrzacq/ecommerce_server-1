# Ecommerce-Server
Ecommerce-Server is an application to manage your assets. This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /login
>Login into registered account

_Request Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    "email": <string>,
    "password": <string>
}
```
_Response (200 - OK)_
```
{
    "token": <automated by jwt>
}
```

_Response (403 - Forbidden)_
```
{
    "errors": [
        "invalid email or password"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "internal server error"
    ]
}
```
---
### POST /register
>register account

_Request Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    "email": <string>,
    "password": <string>
}
```
_Response (200 - OK)_
```
{
    "email": "email",
    "msg": "register success"
}
```

_Response (400 - Bad Requests)_
>if email already exist
```
{
    "errors": [
        "email must be unique",
        "email already exist"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "internal server error"
    ]
}
```
---

### POST /product
>Create product after login only for admin

_Request Params_
```
Not needed
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
{
    "name": <string>,
    "image_url": <string>,
    "price": <integer>,
    "stock": <integer>
}
```
_Response (200 - OK)_
```
{
    "msg": 'sucess add product',
    "product": <product name>
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "name is required",
        "image url is required",
        "image must be url",
        "price is required",
        "price must be greater than zero",
        "stock is required",
        "stock must be greater than zero"
    ]
}
```
_Response (403 - Forbidden)_
```
{
    "errors": [
        "admin only"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
---
### GET /product
>Get all product that created by admin

_Request Params_
```
Not needed
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "dataProduct": {
        "id": <auto increment>,
        "name": <string>,
        "image_url": <string>,
        "price": <integer>,
        "UserId": <id admin>,
        "updatedAt": "2020-11-03T14:20:23.225Z",
        "createdAt": "2020-11-03T14:20:23.225Z",
        "User": <exclude password>
    }
}
```

_Response (400 - Bad Request)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```

---
### GET /product/:id
>Get product by id that created by admin

_Request Params_
```
req.params.id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - OK)_
```
{
    "dataProduct": {
        "id": <auto increment>,
        "name": <string>,
        "image_url": <string>,
        "price": <integer>,
        "UserId": <id admin>,
        "updatedAt": "2020-11-03T14:20:23.225Z",
        "createdAt": "2020-11-03T14:20:23.225Z",
        "User": <exclude password>
    }
}
```

_Response (400 - Bad Requests)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
---
### PUT /product
>Update task only by admin

_Request Params_
```
req.params.id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
{
    "name": <string>,
    "image_url": <string>,
    "price": <integer>,
    "stock": <integer>
}
```
_Response (200 - OK)_
```
{
    "msg": "success update product"
}
```

_Response (400 - Bad Requests)_
```
{
    "errors": [
        "Authentication failed",
        "Not authorized"
    ]
}
```
_Response (404 - Not Found)_
```
{
    "errors": [
        "product not found"
    ]
}
```
_Response (403 - Forbidden)_
```
{
    "errors": [
        "admin only"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
---

### DELETE /product/:id
>Delete product by id only for admin

_Request Params_
```
req.params.id
```

_Request Headers_
```
{
    "token": <automated by jwt>
}
```

_Request Body_
```
Not needed
```
_Response (200 - Ok)_
```
{
    "msg": "Product deleted"
}
```

_Response (400 - Bad Requests)_
```
{
    "errors": [
        "Authentication failed"
    ]
}
```
_Response (404 - Not found)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
_Response (403 - Forbidden)_
```
{
    "errors": [
        "admin only"
    ]
}
```
_Response (500 - internal server error)_
```
{
    "errors": [
        "Product not found"
    ]
}
```
---