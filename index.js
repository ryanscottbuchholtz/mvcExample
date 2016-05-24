var view, model, controller;

// Model

var mvcExample = {};  //an object is created as a namespace

mvcExample.Model = function() {  //constructor for the model with two attributes
    this.text = "";
    // this.onChange = null;  //null is removed when the controller is instantiated and the value becomes a method from the view
    this.onChange = function(text) {  //see line 41
      this.element.value = text;
    };
};

mvcExample.Model.prototype.setText = function(value) {  //value is captured in the view
    this.text = value.toUpperCase();
    // if (this.onChange) {   
        this.onChange(this.text);  //outputs a value for the element (shows it on the screen/in the view)
    // }
};

// View

mvcExample.View = function(elementId) {
    this.element = document.getElementById(elementId);
    // this.onInput = null;  //null is removed when the controller is instantiated and the value becomes a method from the model
    this.onInput = function(value) {  //see line 15
      this.text = value.toUpperCase();
    };

    this.element.addEventListener('input', this._onInput.bind(this)); //this is the listener, nothing happens until the 'input' event fires.
};

mvcExample.View.prototype._onInput = function(event) {
    this.value = event.target.value;
    // if (this.onInput) { 
        this.onInput(this.value); //outputs a capitalized string
    // }
};

mvcExample.View.prototype.setValue = function(text) {
    this.element.value = text;
};

// Controller

mvcExample.Controller = function(model, view) {
    view.onInput = model.setText.bind(model); //binding the model.setText method to the model object and setting its value to view.onInput
    model.onChange = view.setValue.bind(view); //binding the view.setValue method to the view object and setting its value to model.onChange
};


// Initialize

document.addEventListener('DOMContentLoaded', function() {
    model = new mvcExample.Model();
    view = new mvcExample.View('uppercase');
    controller = new mvcExample.Controller(model, view);
});








