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

            if (this.model.state._locked == true) this.$('#next').attr("disabled", "disabled");

				if (this.model.state.currentPage.model.get("_isComplete")) this.onPageCompleted();
				else {
					for(button in this.model.config._buttons) {
						if(this.model.config._buttons[button]._unlockOnCompletion){
							var buttonName = "#" + String(button).slice(1);
							this.$(buttonName).attr("disabled", "disabled");
							this.listenTo( this.model.state.currentPage.model,"change:_isComplete", this.onPageCompleted );
						}
					}	
				}

			
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

		onPageCompleted: function( ) {
			this.model.state._locked = false;
            if (this.model.config._lock) {
                var contentObjects = this.model.config._lock;
                var completeCount = 0;
                for( var i = 0; i < contentObjects.length; i++) if (Adapt.contentObjects.findWhere({_id:contentObjects[i]}).get("_isComplete")) completeCount++;
                if (completeCount < contentObjects.length) {
                    this.model.state._locked = true;
                }
            }

            if (this.model.state._locked == true) this.$('#next').attr("disabled", "disabled");
			else this.$('#next').removeAttr("disabled");

			for(button in this.model.config._buttons) {
				if(this.model.config._buttons[button]._unlockOnCompletion){
					var buttonName = "#" + String(button).slice(1);
					this.$(buttonName).removeAttr("disabled", "disabled");
					this.listenTo( this.model.state.currentPage.model,"change:_isComplete", this.onPageCompleted );
				}
			}
		}

	});

	return QuickNavView;
})
	
