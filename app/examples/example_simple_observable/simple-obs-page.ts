import {EventData, Observable, PropertyChangeData} from 'data/observable';
import {Page} from 'ui/page';

let myObservable;

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    myObservable = new Observable();

    myObservable.on("propertyChange", function (ev: PropertyChangeData) {
        console.dir(`eventName=${ev.eventName}  oldValue=${ev.oldValue} newValue=${ev.value}`);
    });


    const initialCounter = 11;
    myObservable.set("counter", initialCounter);
    myObservable.set("message", `${initialCounter} taps left`);

    // tell the the UI the bindable object
    page.bindingContext = myObservable;
}

export function tapped() {
    myObservable.set('counter', myObservable.counter - 1);

    if (myObservable.counter <= 0) {
        myObservable.set('message', "Hooray. You unlocked the NativeScript challenge");
    } else {
        myObservable.set('message', `${myObservable.counter} taps left`);
    }
}
