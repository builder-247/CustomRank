#API

This is the documentation of the CustomRank server API.

###Usage

Requests can be sent every 30 seconds.

###Status Codes
| Status Code | Type  | Description |
|-------------|-------|-------------|
|200| OK | Received on succesful exchange
|400| Bad Request | The request doesn't have all required parameters
|403| Forbidden | Failed to authenticate the player
|429| Too Many Requests | User not respecting the 30 second throttle

##/ranklist
This endpoint is used to retrieve list of custom ranks.

````HTTP
GET https://example.url/ranklist
````

###Response
````php
{
    "success": true,         // true or false
    "list": [
        {
            "username": "hypixel",
            "rank": "&b[COOL]"
        }
     ]
}
````

##/setrank
This endpoint is used to set a custom rank for your account

````HTTP
POST https://example.url/setrank?username=hypixel&rank=%26b%5BCOOL%5D&token=token
````

###Parameters

| Parameter | Description          | Required|
|-----------|----------------------|---------|
|  username     | Player's username            | Yes |
|  rank   | URI encoded string of the wanted custom rank | Yes |
|  token   | A token generated by the client to authenticate the user | Yes |

###Response
````php
{
    "success": true,         // true or false
    "rank": "&b[COOL]"
}
````