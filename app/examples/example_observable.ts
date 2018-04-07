/**
* SoftUni - Intro to NativeScript. 2018
*
* This file illustrates different ways to use Observables in NativeScript.
* This file acts as a "view-model" - i.e. it is set as a bindingContext in the code-behind.
* In the comments below, a code-behind and a view are shown, that can use a view-model from the current file.
*/

/* main-page.xml
<Page navigatingTo="navigatingTo">
	<StackLayout>
		<Label text="{{message}}"/>
	</StackLayout>
</Page>
*/

/* main-page.ts
export function navigatingTo(args){
	let page = args.object;
	page.bindingContext = new <some-class-from-below>();
}
*/
import { Observable } from 'data/observable';


class HelloWorldModel_1 extends Observable {
	/*
		Manually invoke the notifyPropertyChange() method of the Observable class
	*/

	private _message : number;

	constructor(){
		super();
	}

	public businessLogic() {
		this.message = 1;
	}

	get message() {
		return this._message
	}

	set message(val:number) {
		this._message = val;
		this.notifyPropertyChange("message", val)
	}
}

class HelloWorldModel_2 extends Observable {
	/*
		Use the set() method of the Observable class. Properties created/changed with set() are accessible
		to the binding expression in the view (i.e. the "{{message}}")
	*/
	constructor(){
			super();
	}
	public businessLogic(){
		this.set("message", 1)
	}
}

class HelloWorldModel_3 extends Observable {
	/*
		Use a decorator on the property. The decorator handles the details of notifying that the value of the
		property has changed. 
		Result - cleaner code.
	*/

	@ObservableProperty()
	private interestingProperty : number;

	constructor(){
		super();
	}
	public businessLogic(){
		this.interestingProperty = 1
	}
}

/**
*	https://www.nativescript.org/blog/nativescript-observable-magic-string-property-name-be-gone
*/
function ObservableProperty() {
    return (target: Observable, propertyKey: string) => {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this["_" + propertyKey];
            },
            set: function (value) {
                if (this["_" + propertyKey] === value) {
                    return;
                }

                this["_" + propertyKey] = value;
                this.notify({
                    eventName: Observable.propertyChangeEvent,
                    propertyName: propertyKey,
                    object: this,
                    value,
                });
            },
            enumerable: true,
            configurable: true
        });
    };
}