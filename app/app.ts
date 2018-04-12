﻿/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import * as application from 'application';

const examples = {
    main_page: 'main-page',
    simple_observable: "examples/example_simple_observable/simple-obs-page",
    ui: 'examples/ui_showcase',
    layouts: 'examples/example_layouts/example_layouts',
    listview: 'examples/example_listview/example_listview',
};
application.start({moduleName: examples.simple_observable});

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
