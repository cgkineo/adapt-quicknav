/*
* adapt-quicknav
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define([
	'core/js/adapt',
	'extensions/adapt-quicknav/js/adapt-quicknav-view',
	'extensions/adapt-quicknav/js/quicknav-placeholder'
],
function(Adapt, QuickNavView) {

	var quicknav = Backbone.View.extend({
		config: undefined,

		state: {
			lastBlock: undefined,
			currentMenu: undefined,
			currentPage: undefined,
			isFirstPage: false,
			isLastPage: false
		},

		menuStructure: {},
		
		onRootClicked: function() {
			this.navigateTo("/");
		},

		onUpClicked: function() {
			this.navigateTo(this.state.currentPage.model.get("_parentId"));
		},

		onPreviousClicked:function() {
			var params = this.getParameters();

			if (params.pages === undefined) return;

			var indexOfCurrentPage = _.indexOf(params.pages, this.state.currentPage.model.get("_id"));
			var indexOfPrevPage = this.getPrevPageIndex(params.menus, params.indexOfMenu, params.pages, indexOfCurrentPage);

			this.navigateTo(params.pages[indexOfPrevPage]);
		},

		onNextClicked: function() {
			var params = this.getParameters();

			if (params.pages === undefined) return;

			var indexOfCurrentPage = _.indexOf(params.pages, this.state.currentPage.model.get("_id"));
			var indexOfNextPage = this.getNextPageIndex(params.menus, params.indexOfMenu, params.pages, indexOfCurrentPage);

			this.navigateTo(params.pages[indexOfNextPage]);
		},

		navigateTo: function(id) {
			var hash = "#" + (id === "/" ? id : "/id/" + id);
			Backbone.history.navigate(hash, {trigger:true, "replace": true});
		},

		getParameters: function() {
			var params = {};

			if (_.keys(this.menuStructure).length === 0) {
				params.pages = _.pluck(new Backbone.Collection(Adapt.contentObjects.where({_type: "page"})).toJSON(), [ "_id" ]);
			} else {
				params.menus = _.keys(this.menuStructure);
				params.indexOfMenu = _.indexOf(menus, this.state.currentMenu.get("_id"));
				params.pages = _.keys(this.menuStructure[this.state.currentMenu.get("_id")]);
			}

			return params;
		},

		getPrevPageIndex: function(menus, indexOfMenu, pages, indexOfPage) {
			//console.log("quicknav::getPrevPageIndex", indexOfPage);
			if (this.config._isContinuous == "global" && menus !== undefined) {
				if (indexOfPage === 0) { //if page is at the beginning of the menu goto previous menu, last page
					if (this.config._global !== undefined && this.config._global._pagePrevious !== undefined) {
						this.navigateTo(this.config._global._pagePrevious);
						return;
					} else if (indexOfMenu === 0 && indexOfMenu == menus.length - 1) {
						//single menu, last page
					} else if (indexOfMenu === 0) {
						indexOfMenu = menus.length - 1; //last menu
						pages = _.keys(this.menuStructure[menus[indexOfMenu]]); //get menu pages
					} else {
						indexOfMenu-=1; //previous menu
						pages = _.keys(this.menuStructure[menus[indexOfMenu]]); //get menu pages
					}
					indexOfPage = pages.length - 1; //last page
				} else {
					indexOfPage-=1; //previous page
				}
			} else if (this.config._isContinuous == "local" || (this.config._isContinuous == "global" && menus === undefined)) {
				if (indexOfPage === 0 && indexOfPage == pages.length - 1) {
					//single page
				} else if (indexOfPage === 0) {
					indexOfPage = pages.length - 1; //last page
				} else {
					indexOfPage-=1; //previous page
				}
			} else {
				if (indexOfPage === 0) return;
				indexOfPage-=1; //previous page
			}

			if(this.isPageAvailable(pages, indexOfPage)) {
				return indexOfPage;
			} else {
				//uh-oh, that page isn't available - try again
				return this.getPrevPageIndex(menus, indexOfMenu, pages, indexOfPage);
			}
		},

		getNextPageIndex: function(menus, indexOfMenu, pages, indexOfPage) {
			//console.log("quicknav::getNextPageIndex", indexOfPage);
			if (this.config._isContinuous == "global" && menus !== undefined) {
				if (indexOfPage === pages.length - 1) { //if page is at the end of the menu goto next menu, first page
					if (this.config._global !== undefined && this.config._global._pageNext !== undefined) {
						this.navigateTo(this.config._global._pageNext);
						return;
					} else if (indexOfMenu === 0 && indexOfMenu == menus.length - 1) {
						//single menu, first page
					} else if (indexOfMenu == menus.length - 1) {
						indexOfMenu = 0; //first menu
						pages = _.keys(this.menuStructure[menus[indexOfMenu]]); //get menu pages
					} else {
						indexOfMenu+=1; //next menu
						pages = _.keys(this.menuStructure[menus[indexOfMenu]]); //get menu pages
					}
					indexOfPage = 0; //first page
				} else {
					indexOfPage+=1; //next page
				}
			} else if (this.config._isContinuous == "local" || (this.config._isContinuous == "global" && menus === undefined)) {
				if (indexOfPage === 0 && indexOfPage == pages.length - 1) {
					//single page
				} else if (indexOfPage == pages.length - 1) {
					indexOfPage = 0; //first page
				} else {
					indexOfPage+=1; //next page
				}
			} else {
				if (indexOfPage == pages.length - 1) return;
				indexOfPage+=1; //next page
			}

			if(this.isPageAvailable(pages, indexOfPage)) {
				return indexOfPage;
			} else {
				//uh-oh, that page isn't available - try again
				return this.getNextPageIndex(menus, indexOfMenu, pages, indexOfPage);
			}
		},

		isPageAvailable: function(pages, indexOfPage) {
			var contentObject = Adapt.findById(pages[indexOfPage]);
			//console.log("quicknav::isPageAvailable ", indexOfPage, contentObject.get('_isAvailable'));
			return contentObject.get('_isAvailable');
		},

		position: function() {
			this.state.isFirstPage = false;
			this.state.isLastPage = false;

			var pages;

			if (_.keys(this.menuStructure).length === 0) {
				pages = _.pluck(new Backbone.Collection(Adapt.contentObjects.where({_type: "page"})).toJSON(), [ "_id" ]);
			} else {
				pages = _.keys(this.menuStructure[this.state.currentMenu.get("_id")]);
			}

			if (pages === undefined) return;

			var indexOfPage = _.indexOf(pages, this.state.currentPage.model.get("_id"));
			
			if (this.config._isContinuous == "local" || this.config._isContinuous == "global" ) {
				if (indexOfPage === 0 && indexOfPage == pages.length - 1 && this.config._isContinuous == "local") {
					this.state.isFirstPage = true;
					this.state.isLastPage = true;
				} else {
					this.state.isLastPage = false;
					this.state.isFirstPage = false;
				}
			} else {
				if (indexOfPage === 0) this.state.isFirstPage = true;
				if (indexOfPage == pages.length - 1) this.state.isLastPage = true;
			}
		}
	});
	quicknav = new quicknav();

	Adapt.on("app:dataReady", function() {
		var menus = Adapt.contentObjects.where({_type: "menu"});
		_.each(menus, function(menu) {
			var id = menu.get("_id");
			quicknav.menuStructure[id] = {};
			var pages = Adapt.contentObjects.where({_type: "page", _parentId: id });
			_.each(pages, function(page) {
				quicknav.menuStructure[id][page.get("_id")] = page;
			});
		});
	});

	Adapt.on("pageView:postRender", function(pageView) {
		var pageModel = pageView.model;
		if (pageModel.get("_quicknav") === undefined) return;
		var config = pageModel.get("_quicknav");
		if (config._isEnabled !== true && config._isEnabled !== undefined) return;

		var blocks = pageModel.findDescendants("blocks");

		var parentId = pageModel.get("_parentId");
		quicknav.state.currentMenu = Adapt.contentObjects.findWhere({_id: parentId});
		quicknav.state.currentPage = pageView;
		quicknav.state.lastBlock = blocks.last();
		quicknav.config = config;
	});

	Adapt.on('blockView:postRender', function(blockView) {
		if (quicknav.state.lastBlock === undefined) return;
		if (blockView.model.get("_id") !== quicknav.state.lastBlock.get("_id")) return;

		var element = blockView.$el.parent();

		quicknav.position();

		var quickNavView = new QuickNavView({model:{ config: quicknav.config, state: quicknav.state}});
		quickNavView.parent = quicknav;
		quickNavView.undelegateEvents();

		var injectInto;

		if (quicknav.config._injectIntoSelector) {
			injectInto = element.find(quicknav.config._injectIntoSelector);
			if (injectInto.length > 0) {
				injectInto.append(quickNavView.$el);
			} else {
				element.append(quickNavView.$el);
			}
		} else {
			injectInto = element.find(".quicknav-component");
			if (injectInto.length > 0) {
				injectInto.append(quickNavView.$el);
			} else {
				element.append(quickNavView.$el);
			}
		}
		
		quickNavView.delegateEvents();
	});

	return quicknav;
});