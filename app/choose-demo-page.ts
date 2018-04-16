import {NavigatedData, Page} from "tns-core-modules/ui/page";
import {fromObject} from "tns-core-modules/data/observable";
import {ItemEventData} from "tns-core-modules/ui/list-view";

let page: Page;

export function navigatingTo(args: NavigatedData) {
    page = args.object as Page; // casts args.object to type "Page"

    let content = [
        {
            name: "main",
            path: "examples/initial_example/main-page"
        },
        {
            name: "layouts",
            path: "examples/example_layouts/example-layouts-page"
        },
        {
            name: "listview",
            path: "examples/example_listview/example-listview-page"
        },
        {
            name: "simple_observable",
            path: "examples/example_simple_observable/simple-obs-page"
        },
        {
            name: "ui_showcase",
            path: "examples/ui-showcase-page"
        }
    ];

    let viewModel = fromObject({
        demos: content
    });
    page.bindingContext = viewModel
}

export function onTap(event: ItemEventData) {
    console.log('onTap')
    let demoItem = event.view.bindingContext;
    page.frame.navigate(demoItem.path)
}