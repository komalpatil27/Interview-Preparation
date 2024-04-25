### Redux architecture
refer react-redux folder for code
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

![Redux-Arch](./images/redux.png)