/**
 * SoftUni - Intro to NativeScript. 2018
 *
 * The code-behind for the demo of ListView.
 * The file is responsible for:
 * - setting the bindingContext
 * - implementing event handlers for the "load more" button tap event & the loadMoreItems event of the ListView
 *
 */
import {ItemEventData} from "tns-core-modules/ui/list-view";

import {ExampleViewModel} from "./example_viewmodel";


let viewModel: ExampleViewModel;

export function navigatingTo(args) {
    let page = args.object;
    // the viewModel contains the list of items to which the view is bind via the bindingContext.
    viewModel = new ExampleViewModel();
    page.bindingContext = viewModel;
}

/**
 * Executed when we press the "Load more" button
 */
export function onLoadAnotherBtnPressed() {
    viewModel.loadAnother();
}

/**
 * Executed when a user taps on an item from the ListView
 */
export function onItemTap(ev: ItemEventData) {
    let selectedItemAtIndex = ev.index;
    let item = viewModel.loadedItems.getItem(selectedItemAtIndex);
    alert(`Title: ${item.title}, Author: ${item.author}`);
    console.dir(item)
}

/**
 * Executed when the user scrolls down near the end of the list
 * The method will try to load more items to the list.
 */
export function listViewLoadMoreItems() {
    // wrap the `loadBatch()` in a setTimeout() due to https://github.com/NativeScript/NativeScript/issues/4931
    setTimeout(() => {
        viewModel.loadBatch()
    }, 100)
}