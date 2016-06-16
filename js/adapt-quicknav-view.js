/*
* adapt-quicknav
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define(function(require) {

	var Backbone = require('backbone');
	var Adapt = require('coreJS/adapt');

	var QuickNavView = Backbone.View.extend({
		initialize: function() {
			this.listenTo(Adapt, 'remove', this.remove);
			this.render();

			this.model.state._locked = false;
            if (this.model.config._lock) {
                var contentObjects = this.model.config._lock;
                var completeCount = 0;
                for( var i = 0; i < contentObjects.length; i++) if (Adapt.contentObjects.findWhere({_id:contentObjects[i]}).get("_isComplete")) completeCount++;
                if (completeCount < contentObjects.length) {
                    this.model.state._locked = true;
                }
            }
            if (this.model.state.currentPage.model.get("_isComplete")) 
            	this.onPageCompleted();
            else
				this.buttonLock(true);
		},
		render: function() {
	        var template = Handlebars.templates["quicknav-bar"];
	        this.$el.html(template(this.model));
	        return this;
		},

		className: "block quicknav",

		events: {
			"click #root": "onRootClicked",
			"click #previous": "onPreviousClicked",
			"click #up": "onUpClicked",
			"click #next": "onNextClicked"
		},

		onRootClicked: function() {
			this.parent.onRootClicked();
		},
		onPreviousClicked: function() {
			this.parent.onPreviousClicked();
		},
		onUpClicked: function() {
			this.parent.onUpClicked();
		},
		onNextClicked: function() {
			this.parent.onNextClicked();
		},

		buttonLock: function(lock) {
			var aButtonLocked = false;
			for(var button in this.model.config._buttons) {
				if(this.model.config._buttons[button]._unlockOnCompletion){
					aButtonLocked = true;
					var buttonName = "#" + button.slice(1);
					if(lock == true)
						this.$(buttonName).attr("disabled", "disabled");
					else
						this.$(buttonName).removeAttr("disabled", "disabled");
				}
			}
			if(aButtonLocked && lock)
				this.listenTo(this.model.state.currentPage.model,"change:_isComplete", this.onPageCompleted);
		},

		onPageCompleted: function() {
			this.model.state._locked = false;
            if (this.model.config._lock) {
                var contentObjects = this.model.config._lock;
                var completeCount = 0;
                for( var i = 0; i < contentObjects.length; i++) if (Adapt.contentObjects.findWhere({_id:contentObjects[i]}).get("_isComplete")) completeCount++;
                if (completeCount < contentObjects.length) {
                    this.model.state._locked = true;
                }
            }
            console.log("pageComplete");
            $(".quicknav-instructions").addClass("display-none");
			this.buttonLock(false);
		}

	});

	return QuickNavView;
})