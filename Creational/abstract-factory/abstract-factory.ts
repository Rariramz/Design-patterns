// Each distinct product of a product family should have a base
// interface. All variants of the product must implement this
// interface.
interface IButton {
    paint(): void;
}

// Here's the base interface of another product. All products
// can interact with each other, but proper interaction is
// possible only between products of the same concrete variant.
interface ICheckbox {
    paint(): void;
}

// Concrete products are created by corresponding concrete
// factories.
class WindowsButton implements IButton {
    paint(): void {
        console.log("A Windows button rendering");
    }
}

class WindowsCheckbox implements ICheckbox {
    paint(): void {
        console.log("A Windows checkbox rendering");
    }
}

class MacButton implements IButton {
    paint(): void {
        console.log("A Mac button rendering");
    }
}

class MacCheckbox implements ICheckbox {
    paint(): void {
        console.log("A Mac checkbox rendering");
    }
}


// The abstract factory interface declares a set of methods that
// return different abstract products. These products are called
// a family and are related by a high-level theme or concept.
// Products of one family are usually able to collaborate among
// themselves. A family of products may have several variants,
// but the products of one variant are incompatible with the
// products of another variant.
interface IGUIFactory {
    createButton(): IButton;
    createCheckbox(): ICheckbox;
}

// Concrete factories produce a family of products that belong
// to a single variant. The factory guarantees that the
// resulting products are compatible. Signatures of the concrete
// factory's methods return an abstract product, while inside
// the method a concrete product is instantiated.
class WindowsFactory implements IGUIFactory {
    createButton(): IButton {
        return new WindowsButton();
    }
    createCheckbox(): ICheckbox {
        return new WindowsCheckbox();
    }
}

// Each concrete factory has a corresponding product variant.
class MacFactory implements IGUIFactory {
    createButton(): IButton {
        return new MacButton();
    }
    createCheckbox(): ICheckbox {
        return new MacCheckbox();
    }
}


// The application picks the factory type depending on the
// current configuration or environment settings and creates it
// at runtime (usually at the initialization stage).
class AppConfiguration {
    constructor(OS : string) {
        let factory : IGUIFactory;

        if (OS === "Windows") {
            factory = new WindowsFactory();
        } else {
            factory = new MacFactory();
        }
        
        const app = new Application(factory);
        app.doThings();
    }
}

/* CLIENT CODE */
// The client code works with factories and products only
// through abstract types: GUIFactory, Button and Checkbox. This
// lets you pass any factory or product subclass to the client
// code without breaking it.
class Application {
    factory : IGUIFactory;
    button : IButton;
    checkbox: ICheckbox;

    constructor(factory : IGUIFactory) {
        this.factory = factory;
        this.button = factory.createButton();
        this.checkbox = factory.createCheckbox();
    }

    doThings(): void {
        this.button.paint();
        this.checkbox.paint();
    }
}

const appConf = new AppConfiguration("Windows");