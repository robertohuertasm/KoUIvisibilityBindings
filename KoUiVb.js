// KoUIvisibilityBindings 
// (c) Roberto Huertas - http://www.codecoding.com/knockout-visibility-bindings-with-jqueryui-capabilities/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function(ko){
	
	function JQuerUiEffect ($element, effect, duration, options, isHide) {
		// most effect types need no options passed by default
		// some effects have required parameters
		//console.log(options);
		
		options= options || {};
		if (options.length == 0) {
			if (effect === "scale") {
				options = { percent: 100 };
			} else if (effect === "size") {
				options = { to: { width: 280, height: 185} };
			};
		};
		
		var elDisplay = $element.css('display');
		options.mode = isHide ? 'hide': 'show';
		
		//avoiding repetitive effects.
		if((elDisplay=='none' && options.mode=='hide') || ((elDisplay!='none' && options.mode=='show') && !options.addQueue)) {
			return false;
		};
		
		if(options.addQueue){
			$element.effect(effect, options, duration);
		}else{
			$element.stop().effect(effect, options, duration);
		};
		
	}; //end JQueryUiEffect
	
	/**********************************************
	* Generic function to make jquery ui bindings:
	* We use applyEffect for the bindings and then
	* create our custom callbacks that will make 
	* the effect work.
	***********************************************/
	
	function applyEffect (element, valueAccessor, allBindingsAccessor, viewModel, effect, callback) {
		//we look for this flag to avoid a lot of iterations.
		if (viewModel.isChangeStarted) { return };
		// First get the latest data that we're bound to
		var value = valueAccessor(), allBindings = allBindingsAccessor();
		// Next, whether or not the supplied model property is observable, get its current value
		var valueUnwrapped = ko.utils.unwrapObservable(value);
		// Grab some more data from another binding property
		var duration = allBindings.vbDuration || 400; // 400ms is default duration unless otherwise specified
		var options = allBindings.vbOptions || {}
		var effectOnClose = allBindings.effectOnClose || false;
		//setting default callback if null
		callback=callback || JQuerUiEffect;
		//Now manipulate the DOM element
		var $el=$(element);
		if (valueUnwrapped) {
			//console.log('show ->' + $(element).attr('class'));
			//$(element).stop().slideDown(duration); // Make the element visible
			callback($el, effect, duration, options, false);
		} else {
			//Make the element invisible  
			 //hack: sometimes jquery ui sets height to 1 and won't make the element grow, attaching a lot of
			//css styles that will make your label loose its css... so we reset in that case and only keep the display property.
			var disp=$el.css('display');
			$el.attr('style', 'display:' + disp);
			//$el.attr('style', '');
			//now we hide.
			if (!effectOnClose) {
				$el.stop().hide();
			} else {
				callback($el, effect, duration, options, true);
			};
		};
	}; //end applyEffect.
	
	
	/**********************************************
	* Visible bindings.
	* vbDuration: (400ms by default)
	* vbOptions: {} default.
	* effectOnClose: false by default.
	***********************************************/
	
	ko.bindingHandlers.slideVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'slide');
		}
	};
	
	ko.bindingHandlers.highlightVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'highlight');
		}
	};
	
	ko.bindingHandlers.clipVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'clip');
		}
	};
	
	ko.bindingHandlers.blindVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'blind');
		}
	};
	
	ko.bindingHandlers.dropVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'drop');
		}
	};
	
	ko.bindingHandlers.puffVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'puff');
		}
	};
	
	ko.bindingHandlers.pulsateVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'pulsate');
		}
	};
	
	ko.bindingHandlers.bounceVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'bounce');
		}
	};
	
	ko.bindingHandlers.fadeVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'fade');
		}
	};
	
	ko.bindingHandlers.foldVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'fold');
		}
	};
	
	ko.bindingHandlers.scaleVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'scale');
		}
	};
	
	ko.bindingHandlers.sizeVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'size');
		}
	};
		
	ko.bindingHandlers.shakeVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'shake');
		}
	};
	
	ko.bindingHandlers.explodeVisible={
		update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			applyEffect(element, valueAccessor, allBindingsAccessor, viewModel, 'explode');
		}
	};
	
	
	
		
	//adding to ko
	ko.uiVb={
		applyEffect:applyEffect,
		JQuerUiEffect:JQuerUiEffect
	};
	
})(ko);