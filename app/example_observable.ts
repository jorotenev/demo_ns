import { Observable } from 'data/observable';
/**
* This file illustrates different ways to use Observables in NativeScript.
* This file is the "view-model" - i.e. it is set as a bindingContext.
*/

/* example-page.xml
<Page navigatingTo="navigatingTo">
	<StackLayout>
		<Label text="{{interestingProperty}}"/>
	</StackLayout>
</Page>
*/

/* example-page.ts
export function navigatingTo(args){
	let page = args.object;
	page.bindingContext = new <some-class-from-below>();
}
*/

class ExampleObservable_1 extends Observable {
	/*
		Manually invoke the notifyPropertyChange() method of the Observable class
	*/

	private _interestingProperty : number;

	constructor(){
		super();
	}
	public businessLogic() {
		this.interestingProperty = 1;
	}

	get interestingProperty() {
		return this._interestingProperty
	}

	set interestingProperty(val:number) {
		this._interestingProperty = val;
		this.notifyPropertyChange("interestingProperty", val)
	}
}

class ExampleObservable_2 extends Observable {
	/*
		Use the set() method of the Observable class. Properties created/changed with set() are accessible
		to the binding expression in the view (i.e. the "{{interestingProperty}}")
	*/
	constructor(){
			super();
	}
	public businessLogic(){
		this.set("interestingProperty", 1)
	}
}

class ExampleObservable_3 extends Observable {
	/*
		Use a decorator on the property which will notify that the value of the property has been changed.
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
//https://www.nativescript.org/blog/nativescript-observable-magic-string-property-name-be-gone
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