/**
 * SoftUni - Intro to NativeScript. 2018
 *
 * This file illustrates a simplistic view-model. The view-model contains
 * a list of items which are used by the UI to display each item in a ListView.
 * The items are read from a file, but they could be fetched from an API in a more realistic setting.
 */

import {Observable} from "tns-core-modules/data/observable";

import {ObservableArray} from "tns-core-modules/data/observable-array";

// fake source. it could be a HTTP API, another file, etc.
const itemsSource = loadItemsFromFile("./books.json", (val) => {
    return {
        title: val.tt,
        author: val.au,
        published: val.yr,
        rank: val.rnk
    }
});

// the shape of an item
interface Item {
    title: string
    author: string
    published: number,
    rank: number
}


export class ExampleViewModel extends Observable {

    // holds the items which are visualised in the view
    public loadedItems: ObservableArray<Item>;

    constructor() {
        super();

        // initialise the list with 5 items
        this.loadedItems = new ObservableArray<Item>(itemsSource.slice(0, 5))
    }

    /**
     * Adds a *single* item to the list, if the source has any items left.
     */
    loadAnother() {
        let numberOfLoadedItems = this.loadedItems.length;
        if (numberOfLoadedItems >= itemsSource.length) {
            return;
        }

        let nextIndexToAdd = numberOfLoadedItems;
        this.loadedItems.push(itemsSource[nextIndexToAdd])
    }

    /**
     * Adds a batch of items to the list, if the source has any items left.
     */
    loadBatch() {
        const batchSize = 5;

        let nextIndexToAdd = this.loadedItems.length;
        if (nextIndexToAdd >= itemsSource.length) {
            return;
        }
        let lastIntexToAdd = Math.min(nextIndexToAdd + batchSize, itemsSource.length);

        let itemsToAdd: Item[] = itemsSource.slice(nextIndexToAdd, lastIntexToAdd);

        itemsToAdd.forEach((item) => {
            this.loadedItems.push(item)
        }, this)
    }
}

/**
 * Read a JSON file containing an array of objects and optionally transform each object.
 * @param {string} filename - passed directly to `require()`
 * @param converter - function, used when mapping over the contents of the file. by default the identity function
 * @return the array from the file with coverted objects
 */
function loadItemsFromFile(filename: string, converter = (a) => a): Item[] {
    let content: any[] = require(filename);
    return content.map(converter)
}