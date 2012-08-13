// KoUIvisibilityBindings 
// (c) Roberto Huertas - http://www.codecoding.com/knockout-visibility-bindings-with-jqueryui-capabilities/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

/**********************************************
* Visible bindings.
* vbDuration: (400ms by default)
* vbOptions: {} default.
* hideOnClose: true by default.
***********************************************/

ko.bindingHandlers.slideVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, null, customKoBindingsEffects.slide);
    }
};

ko.bindingHandlers.highlightVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'highlight', customKoBindingsEffects.JQuerUiEffect);
    }
};

ko.bindingHandlers.clipVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'clip', customKoBindingsEffects.JQuerUiEffect);
    }
};

ko.bindingHandlers.blindVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'blind', customKoBindingsEffects.JQuerUiEffect);
    }
};

ko.bindingHandlers.dropVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'drop', customKoBindingsEffects.JQuerUiEffect);
    }
};

ko.bindingHandlers.puffVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'puff', customKoBindingsEffects.JQuerUiEffect);
    }
};

ko.bindingHandlers.pulsateVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'pulsate', customKoBindingsEffects.JQuerUiEffect);
    }
};

ko.bindingHandlers.slideVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'slide', customKoBindingsEffects.JQuerUiEffect);
    }
};

ko.bindingHandlers.shakeVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'shake', customKoBindingsEffects.JQuerUiEffect);
    }
};

ko.bindingHandlers.highlightPulsateVisible = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        customKoBindingsEffects.applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, null, customKoBindingsEffects.highlightPulsate);
    }
};



/**********************************************
* Generic function to make jquery ui bindings:
* We use applyEffect for the bindings and then
* create our custom callbacks that will make 
* the effect work.
***********************************************/
var customKoBindingsEffects = function () {
    return {

        applyEffect: function (element, valueAccessor, allBindingsAccessor, viewModel, effect, callback) {
            //we look for this flag to avoid a lot of iterations.
            if (viewModel.isChangeStarted) { return };
            // First get the latest data that we're bound to
            var value = valueAccessor(), allBindings = allBindingsAccessor();
            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            // Grab some more data from another binding property
            var duration = allBindings.vbDuration || 400; // 400ms is default duration unless otherwise specified
            var options = allBindings.vbOptions || {}
            var hideOnClose = allBindings.hideOnClose || true;
            //Now manipulate the DOM element
            if (valueUnwrapped == true) {
                //console.log('show ->' + $(element).attr('class'));
                //$(element).stop().slideDown(duration); // Make the element visible
                callback(element, effect, duration, options, false);
            } else {
                //Make the element invisible  
                //console.log('hide->' + $(element).attr('class'));
                //hack: sometimes jquery ui sets height to 1 and won't make the label grow attaching a lot of
                //css styles that will make your label loose its css... so we reset in that case.
                $(element).attr('style', '');
                //now we hide.
                if (hideOnClose) {
                    $(element).stop().hide();
                } else {
                    callback(element, effect, duration, options, true);
                }
            }
        }, //end applyEffect.

        JQuerUiEffect: function (element, effect, duration, options, isHide) {
            // most effect types need no options passed by default
            // some effects have required parameters
            //console.log(options);
            if (!options) {
                options = {};
            }
            if (options.length == 0) {
                if (effect === "scale") {
                    options = { percent: 100 };
                } else if (effect === "size") {
                    options = { to: { width: 280, height: 185} };
                }
            }
            if (isHide) {
                options.mode = 'hide';
            } else {
                options.mode = 'show';
            }
            if(options.addQueue){
                $(element).effect(effect, options, duration);
            }else{
                $(element).stop().effect(effect, options, duration);
            }
            
        }, //end JQueryUiEffect

        slide: function (element, effect, duration, options, isHide) {
            if (isHide) {
                $(element).stop().slideUp(duration);
            } else {
                $(element).stop().slideDown(duration);
            }
        }, //end slide

        highlightPulsate: function (element, effect, duration, options, isHide) {
            options = {color:'#72f300'};
            duration = 100;
            customKoBindingsEffects.JQuerUiEffect(element, 'highlight', duration, options, isHide);
            options = { times: 3,addQueue:true };
            duration = 200;
            customKoBindingsEffects.JQuerUiEffect(element, 'pulsate', duration, options, isHide);
        } //end highlightShake
    }
} ();