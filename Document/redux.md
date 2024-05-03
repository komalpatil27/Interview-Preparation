### Redux architecture
refer react-redux folder for code
```
+-------------------+
|      React        |
|    Component      |
+-------------------+
           |
           | 4. Subscribe to State Changes
           |
+-------------------+
|       Redux       |
|      Store        |
+-------------------+
     |        ^
     |        |
     | 3. Get  | 5. State
     |  State  |  Update
     |        |
     v        |
+-------------------+
|     Reducers      |
+-------------------+
     ^        |
     |        |
     | 2. Call | 6. New
     |  with   |  State
     | Action  |
     |        |
     v        |
+-------------------+
|    Action         |
|    Creators       |
+-------------------+
     ^        |
     |        |
     | 1. Call | 7. Return
     |        |  Action
     |        |
     v        |
+-------------------+
|      React        |
|    Component      |
+-------------------+
```
![Redux-Arch](./images/redux.png)

### Differences between redux-saga and redux-thunk?
- Both Redux Thunk and Redux Saga take care of dealing with side effects. 
- In most of the scenarios, Thunk uses Promises to deal with them, whereas Saga uses Generators. Thunk is simple to use and Promises are familiar to many developers, Sagas/Generators are more powerful but you will need to learn them.

