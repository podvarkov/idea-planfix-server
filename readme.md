## Planfix -> JetBrains task&context 

Generic JetBrains task&context server to integrate with Planfix.
Selfhosted server to connect planfix with JetBrains products.

#### Build and run:
Build image from Dockerfile in project root directory and
run container with envs.

Or clone project, create and fill `.env` file in root directory then run:
```
npm i
npm run build
npm run start
```

#### Env description:
```
PORT=3000 - port at wich server runs, 3000 by default
PF_ACCOUNT=your_planfix_account - planfix account to connect
PF_URL=https://api.planfix.ru/xml - planfix api url
PF_API_KEY=planfix_api_key - planfix api key
PF_PRIVATE_KEY=planfix_private_key - planfix private key 
PF_ALL_STATUSES=0,205,189,2 - task statuses of planfix process
PF_SHOW_STATUSES=2,179,189 - tasks with this statuses set will be fetched 
PF_TASK_TEMPLATE=14372655 - id of task template in planfix
```
#### Task property mappings:
Server returns all tasks within specified statuses from planfix.
Planfix task properties will be mapped as described.
```
{
    data: [{
        id -> task.id,
        general -> task.general,
        description -> task.description,
        summary -> task.title,
        issueUrl -> `https://${PF_ACCOUNT}.planfix.ru/task/${task.general}` 
    }]
}
```
#### Configure [JetBrains task&context](https://www.jetbrains.com/help/idea/managing-tasks-and-context.html) server:
`Server url` - url where your server is running at

`Tasks list url` - url where your server is running at, method GET

`Use http authentication` - has to be checked

`username` - your planfix username
 
`password` - your planfix password 

`Responce format` - json
