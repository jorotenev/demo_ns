﻿/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import * as application from 'application';

const examples = {
    main_page: 'main-page',
    ui: 'examples/ui_showcase',
    layouts: 'examples/example_layouts/example_layouts',
    listview: 'examples/example_listview/example_listview',
    observable: 'examples/example_observable'
};
application.start({moduleName: examples.layouts});

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
