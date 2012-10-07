PhysicsWorld
============

## 24-hour mini hackathon project

### Desired outcome + features:
Physics sandbox engine, implemented using HTML5, JavaScript,
and CSS3. External code: Paper.js, JQuery, and code from the
Dollar 1 gesture recognizer website.

The user would have the ability to create predefined objects
which would interact with the world around them. The user would
be given the following tools to interact with the environment:

+  Draw tool to draw objects into existance
+  Hand tool to move and throw objects
+  Pause/Play/Slow tool to control the flow of time.
+  Edit panel to view change the characteristics of objects and the world.

Each object would have the following characteristics:

+  Global Position
+  Local Rotation
+  Velocity
+  Rotational Velocity
+  Mass
+  Coefficient of Restitution

They would be able to interact with other objects by applying
forces and torques. Additionally, some objects could be defined
as being static, where nothing could move them, and objects
could be tethered with massless ropes of infinite strength. to
form structures.

### Implemented features:
+ Objects can be instantiated with the draw tool Only circles, squares, and triangles are allowed.
+ Objects have position and velocity and can experience the gravity of the world.
+ The hand tool can move and throw objects
+ The time can be stopped but not slowed.
+ The edit panel is present, but does not do anything
+ Objects can be made static, but there is no GUI for it.
