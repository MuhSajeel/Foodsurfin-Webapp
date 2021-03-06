/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(4);

	__webpack_require__(9);

	__webpack_require__(17);

	__webpack_require__(46);

	__webpack_require__(49);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app', ['app.run', 'app.filters', 'app.services', 'app.components', 'app.routes', 'app.config', 'app.partials']);

	angular.module('app.run', []);
	angular.module('app.routes', []);
	angular.module('app.filters', []);
	angular.module('app.services', []);
	angular.module('app.config', []);
	angular.module('app.components', ['ui.router', 'angular-loading-bar', 'restangular', 'ngStorage', 'satellizer', 'ui.bootstrap', 'chart.js', 'mm.acl', 'datatables', 'datatables.bootstrap', 'checklist-model']);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _routes = __webpack_require__(3);

	angular.module('app.run').run(_routes.RoutesRun);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	RoutesRun.$inject = ["$rootScope", "$state", "$auth", "AclService", "$timeout", "API", "ContextService"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RoutesRun = RoutesRun;
	function RoutesRun($rootScope, $state, $auth, AclService, $timeout, API, ContextService) {
	  'ngInject';

	  AclService.resume

	  /*eslint-disable */
	  ();var deregisterationCallback = $rootScope.$on('$stateChangeStart', function (event, toState) {
	    if (toState.data && toState.data.auth) {
	      if (!$auth.isAuthenticated()) {
	        event.preventDefault();
	        return $state.go('login');
	      }
	    }

	    $rootScope.bodyClass = 'hold-transition login-page';
	  });

	  function stateChange() {
	    $timeout(function () {
	      // fix sidebar
	      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
	      var window_height = $(window).height();
	      var sidebar_height = $('.sidebar').height();

	      if ($('body').hasClass('fixed')) {
	        $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
	      } else {
	        if (window_height >= sidebar_height) {
	          $('.content-wrapper, .right-side').css('min-height', window_height - neg);
	        } else {
	          $('.content-wrapper, .right-side').css('min-height', sidebar_height);
	        }
	      }

	      // get user current context
	      if ($auth.isAuthenticated() && !$rootScope.me) {
	        ContextService.getContext().then(function (response) {
	          response = response.plain();
	          $rootScope.me = response.data;
	        });
	      }
	    });
	  }

	  $rootScope.$on('$destroy', deregisterationCallback);
	  $rootScope.$on('$stateChangeSuccess', stateChange
	  /*eslint-enable */
	  );
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _acl = __webpack_require__(5);

	var _routes = __webpack_require__(6);

	var _loading_bar = __webpack_require__(7);

	var _satellizer = __webpack_require__(8);

	angular.module('app.config').config(_acl.AclConfig).config(_routes.RoutesConfig).config(_loading_bar.LoadingBarConfig).config(_satellizer.SatellizerConfig);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	AclConfig.$inject = ["AclServiceProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AclConfig = AclConfig;
	function AclConfig(AclServiceProvider) {
	  'ngInject';

	  var myConfig = {
	    storage: 'localStorage',
	    storageKey: 'AppAcl'

	    /*eslint-disable */
	  };AclServiceProvider.config(myConfig
	  /*eslint-enable */
	  );
	}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RoutesConfig = RoutesConfig;
	function RoutesConfig($stateProvider, $urlRouterProvider) {
	  'ngInject';

	  var getView = function getView(viewName) {
	    return './views/app/pages/' + viewName + '/' + viewName + '.page.html';
	  };

	  var getLayout = function getLayout(layout) {
	    return './views/app/pages/layout/' + layout + '.page.html';
	  };

	  $urlRouterProvider.otherwise('/');

	  $stateProvider.state('app', {
	    abstract: true,
	    views: {
	      'layout': {
	        templateUrl: getLayout('layout')
	      },
	      'header@app': {
	        templateUrl: getView('header')
	      },
	      'footer@app': {
	        templateUrl: getView('footer')
	      },
	      main: {}
	    },
	    data: {
	      bodyClass: 'hold-transition skin-blue sidebar-mini'
	    }
	  }).state('app.landing', {
	    url: '/',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        templateUrl: getView('landing')
	      }
	    }
	  }).state('app.tablessimple', {
	    url: '/tables-simple',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<tables-simple></tables-simple>'
	      }
	    }
	  }).state('app.uiicons', {
	    url: '/ui-icons',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<ui-icons></ui-icons>'
	      }
	    }
	  }).state('app.uimodal', {
	    url: '/ui-modal',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<ui-modal></ui-modal>'
	      }
	    }
	  }).state('app.uitimeline', {
	    url: '/ui-timeline',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<ui-timeline></ui-timeline>'
	      }
	    }
	  }).state('app.uibuttons', {
	    url: '/ui-buttons',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<ui-buttons></ui-buttons>'
	      }
	    }
	  }).state('app.uigeneral', {
	    url: '/ui-general',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<ui-general></ui-general>'
	      }
	    }
	  }).state('app.formsgeneral', {
	    url: '/forms-general',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<forms-general></forms-general>'
	      }
	    }
	  }).state('app.chartjs', {
	    url: '/charts-chartjs',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<charts-chartjs></charts-chartjs>'
	      }
	    }
	  }).state('app.comingsoon', {
	    url: '/comingsoon',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<coming-soon></coming-soon>'
	      }
	    }
	  }).state('app.profile', {
	    url: '/profile',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<user-profile></user-profile>'
	      }
	    },
	    params: {
	      alerts: null
	    }
	  }).state('app.userlist', {
	    url: '/user-lists',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<user-lists></user-lists>'
	      }
	    }
	  }).state('app.useredit', {
	    url: '/user-edit/:userId',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<user-edit></user-edit>'
	      }
	    },
	    params: {
	      alerts: null,
	      userId: null
	    }
	  }).state('app.userroles', {
	    url: '/user-roles',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<user-roles></user-roles>'
	      }
	    }
	  }).state('app.userpermissions', {
	    url: '/user-permissions',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<user-permissions></user-permissions>'
	      }
	    }
	  }).state('app.userpermissionsadd', {
	    url: '/user-permissions-add',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<user-permissions-add></user-permissions-add>'
	      }
	    },
	    params: {
	      alerts: null
	    }
	  }).state('app.userpermissionsedit', {
	    url: '/user-permissions-edit/:permissionId',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<user-permissions-edit></user-permissions-edit>'
	      }
	    },
	    params: {
	      alerts: null,
	      permissionId: null
	    }
	  }).state('app.userrolesadd', {
	    url: '/user-roles-add',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<user-roles-add></user-roles-add>'
	      }
	    },
	    params: {
	      alerts: null
	    }
	  }).state('app.userrolesedit', {
	    url: '/user-roles-edit/:roleId',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<user-roles-edit></user-roles-edit>'
	      }
	    },
	    params: {
	      alerts: null,
	      roleId: null
	    }
	  }).state('app.widgets', {
	    url: '/widgets',
	    data: {
	      auth: true
	    },
	    views: {
	      'main@app': {
	        template: '<widgets></widgets>'
	      }
	    }
	  }).state('login', {
	    url: '/login',
	    views: {
	      'layout': {
	        templateUrl: getView('login')
	      },
	      'header@app': {},
	      'footer@app': {}
	    },
	    data: {
	      bodyClass: 'hold-transition login-page'
	    },
	    params: {
	      registerSuccess: null,
	      successMsg: null
	    }
	  }).state('loginloader', {
	    url: '/login-loader',
	    views: {
	      'layout': {
	        templateUrl: getView('login-loader')
	      },
	      'header@app': {},
	      'footer@app': {}
	    },
	    data: {
	      bodyClass: 'hold-transition login-page'
	    }
	  }).state('register', {
	    url: '/register',
	    views: {
	      'layout': {
	        templateUrl: getView('register')
	      },
	      'header@app': {},
	      'footer@app': {}
	    },
	    data: {
	      bodyClass: 'hold-transition register-page'
	    }
	  }).state('userverification', {
	    url: '/userverification/:status',
	    views: {
	      'layout': {
	        templateUrl: getView('user-verification')
	      }
	    },
	    data: {
	      bodyClass: 'hold-transition login-page'
	    },
	    params: {
	      status: null
	    }
	  }).state('forgot_password', {
	    url: '/forgot-password',
	    views: {
	      'layout': {
	        templateUrl: getView('forgot-password')
	      },
	      'header@app': {},
	      'footer@app': {}
	    },
	    data: {
	      bodyClass: 'hold-transition login-page'
	    }
	  }).state('reset_password', {
	    url: '/reset-password/:email/:token',
	    views: {
	      'layout': {
	        templateUrl: getView('reset-password')
	      },
	      'header@app': {},
	      'footer@app': {}
	    },
	    data: {
	      bodyClass: 'hold-transition login-page'
	    }
	  }).state('app.logout', {
	    url: '/logout',
	    views: {
	      'main@app': {
	        controller: ["$rootScope", "$scope", "$auth", "$state", "AclService", function controller($rootScope, $scope, $auth, $state, AclService) {
	          $auth.logout().then(function () {
	            delete $rootScope.me;
	            AclService.flushRoles();
	            AclService.setAbilities({});
	            $state.go('login');
	          });
	        }]
	      }
	    }
	  });
	}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	LoadingBarConfig.$inject = ["cfpLoadingBarProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LoadingBarConfig = LoadingBarConfig;
	function LoadingBarConfig(cfpLoadingBarProvider) {
	  'ngInject';

	  cfpLoadingBarProvider.includeSpinner = true;
	}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	SatellizerConfig.$inject = ["$authProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SatellizerConfig = SatellizerConfig;
	function SatellizerConfig($authProvider) {
	  'ngInject';

	  $authProvider.httpInterceptor = function () {
	    return true;
	  };

	  $authProvider.loginUrl = '/api/auth/login';
	  $authProvider.signupUrl = '/api/auth/register';
	  $authProvider.tokenRoot = 'data'; // compensates success response macro
	}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _date_millis = __webpack_require__(10);

	var _capitalize = __webpack_require__(11);

	var _human_readable = __webpack_require__(12);

	var _truncate_characters = __webpack_require__(13);

	var _truncate_words = __webpack_require__(14);

	var _trust_html = __webpack_require__(15);

	var _ucfirst = __webpack_require__(16);

	angular.module('app.filters').filter('datemillis', _date_millis.DateMillisFilter).filter('capitalize', _capitalize.CapitalizeFilter).filter('humanreadable', _human_readable.HumanReadableFilter).filter('truncateCharacters', _truncate_characters.TruncatCharactersFilter).filter('truncateWords', _truncate_words.TruncateWordsFilter).filter('trustHtml', _trust_html.TrustHtmlFilter).filter('ucfirst', _ucfirst.UcFirstFilter);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DateMillisFilter = DateMillisFilter;
	function DateMillisFilter() {
	  'ngInject';

	  return function (input) {
	    return Date.parse(input);
	  };
	}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CapitalizeFilter = CapitalizeFilter;
	function CapitalizeFilter() {
	  return function (input) {
	    return input ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
	      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    }) : '';
	  };
	}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HumanReadableFilter = HumanReadableFilter;
	function HumanReadableFilter() {
	  return function humanize(str) {
	    if (!str) {
	      return '';
	    }
	    var frags = str.split('_');
	    for (var i = 0; i < frags.length; i++) {
	      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	    }
	    return frags.join(' ');
	  };
	}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TruncatCharactersFilter = TruncatCharactersFilter;
	function TruncatCharactersFilter() {
	  return function (input, chars, breakOnWord) {
	    if (isNaN(chars)) {
	      return input;
	    }
	    if (chars <= 0) {
	      return '';
	    }
	    if (input && input.length > chars) {
	      input = input.substring(0, chars);

	      if (!breakOnWord) {
	        var lastspace = input.lastIndexOf(' '
	        // Get last space
	        );if (lastspace !== -1) {
	          input = input.substr(0, lastspace);
	        }
	      } else {
	        while (input.charAt(input.length - 1) === ' ') {
	          input = input.substr(0, input.length - 1);
	        }
	      }
	      return input + '...';
	    }
	    return input;
	  };
	}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TruncateWordsFilter = TruncateWordsFilter;
	function TruncateWordsFilter() {
	  return function (input, words) {
	    if (isNaN(words)) {
	      return input;
	    }
	    if (words <= 0) {
	      return '';
	    }
	    if (input) {
	      var inputWords = input.split(/\s+/);
	      if (inputWords.length > words) {
	        input = inputWords.slice(0, words).join(' ') + '...';
	      }
	    }
	    return input;
	  };
	}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TrustHtmlFilter = TrustHtmlFilter;
	function TrustHtmlFilter($sce) {
	  return function (html) {
	    return $sce.trustAsHtml(html);
	  };
	}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UcFirstFilter = UcFirstFilter;
	function UcFirstFilter() {
	  return function (input) {
	    if (!input) {
	      return null;
	    }
	    return input.substring(0, 1).toUpperCase() + input.substring(1);
	  };
	}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _tablesSimple = __webpack_require__(18);

	var _uiModal = __webpack_require__(19);

	var _uiTimeline = __webpack_require__(20);

	var _uiButtons = __webpack_require__(21);

	var _uiIcons = __webpack_require__(22);

	var _uiGeneral = __webpack_require__(23);

	var _formsGeneral = __webpack_require__(24);

	var _chartsChartjs = __webpack_require__(25);

	var _widgets = __webpack_require__(26);

	var _userProfile = __webpack_require__(27);

	var _userVerification = __webpack_require__(28);

	var _comingSoon = __webpack_require__(29);

	var _userEdit = __webpack_require__(30);

	var _userPermissionsEdit = __webpack_require__(31);

	var _userPermissionsAdd = __webpack_require__(32);

	var _userPermissions = __webpack_require__(33);

	var _userRolesEdit = __webpack_require__(34);

	var _userRolesAdd = __webpack_require__(35);

	var _userRoles = __webpack_require__(36);

	var _userLists = __webpack_require__(37);

	var _dashboard = __webpack_require__(38);

	var _navSidebar = __webpack_require__(39);

	var _navHeader = __webpack_require__(40);

	var _loginLoader = __webpack_require__(41);

	var _resetPassword = __webpack_require__(42);

	var _forgotPassword = __webpack_require__(43);

	var _loginForm = __webpack_require__(44);

	var _registerForm = __webpack_require__(45);

	angular.module('app.components').component('tablesSimple', _tablesSimple.TablesSimpleComponent).component('uiModal', _uiModal.UiModalComponent).component('uiTimeline', _uiTimeline.UiTimelineComponent).component('uiButtons', _uiButtons.UiButtonsComponent).component('uiIcons', _uiIcons.UiIconsComponent).component('uiGeneral', _uiGeneral.UiGeneralComponent).component('formsGeneral', _formsGeneral.FormsGeneralComponent).component('chartsChartjs', _chartsChartjs.ChartsChartjsComponent).component('widgets', _widgets.WidgetsComponent).component('userProfile', _userProfile.UserProfileComponent).component('userVerification', _userVerification.UserVerificationComponent).component('comingSoon', _comingSoon.ComingSoonComponent).component('userEdit', _userEdit.UserEditComponent).component('userPermissionsEdit', _userPermissionsEdit.UserPermissionsEditComponent).component('userPermissionsAdd', _userPermissionsAdd.UserPermissionsAddComponent).component('userPermissions', _userPermissions.UserPermissionsComponent).component('userRolesEdit', _userRolesEdit.UserRolesEditComponent).component('userRolesAdd', _userRolesAdd.UserRolesAddComponent).component('userRoles', _userRoles.UserRolesComponent).component('userLists', _userLists.UserListsComponent).component('dashboard', _dashboard.DashboardComponent).component('navSidebar', _navSidebar.NavSidebarComponent).component('navHeader', _navHeader.NavHeaderComponent).component('loginLoader', _loginLoader.LoginLoaderComponent).component('resetPassword', _resetPassword.ResetPasswordComponent).component('forgotPassword', _forgotPassword.ForgotPasswordComponent).component('loginForm', _loginForm.LoginFormComponent).component('registerForm', _registerForm.RegisterFormComponent);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TablesSimpleController = function () {
	  function TablesSimpleController() {
	    'ngInject';

	    //

	    _classCallCheck(this, TablesSimpleController);
	  }

	  _createClass(TablesSimpleController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return TablesSimpleController;
	}();

	var TablesSimpleComponent = exports.TablesSimpleComponent = {
	  templateUrl: './views/app/components/tables-simple/tables-simple.component.html',
	  controller: TablesSimpleController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiModalController = function () {
	  UiModalController.$inject = ["$scope", "$uibModal", "$log", "API"];
	  function UiModalController($scope, $uibModal, $log, API) {
	    'ngInject';

	    _classCallCheck(this, UiModalController);

	    this.API = API;
	    this.$uibModal = $uibModal;
	    this.$log = $log;
	    this.$scope = $scope;
	    this.items = ['item1', 'item2', 'item3'];
	    this.animationsEnabled = true;
	  }

	  _createClass(UiModalController, [{
	    key: 'modalOpen',
	    value: function modalOpen(size) {
	      var $uibModal = this.$uibModal;
	      var $scope = this.$scope;
	      var $log = this.$log;
	      var _items = this.items;

	      var modalInstance = $uibModal.open({
	        animation: this.animationsEnabled,
	        templateUrl: 'myModalContent.html',
	        controller: this.modalcontroller,
	        controllerAs: 'mvm',
	        size: size,
	        resolve: {
	          items: function items() {
	            return _items;
	          }
	        }
	      });

	      modalInstance.result.then(function (selectedItem) {
	        $scope.selected = selectedItem;
	      }, function () {
	        $log.info('Modal dismissed at: ' + new Date());
	      });
	    }
	  }, {
	    key: 'modalcontroller',
	    value: ["$scope", "$uibModalInstance", "items", function modalcontroller($scope, $uibModalInstance, items) {
	      'ngInject';

	      this.items = items;

	      $scope.selected = {
	        item: items[0]
	      };

	      this.ok = function () {
	        $uibModalInstance.close($scope.selected.item);
	      };

	      this.cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	      };
	    }]
	  }, {
	    key: 'toggleModalAnimation',
	    value: function toggleModalAnimation() {
	      this.animationsEnabled = !this.animationsEnabled;
	    }
	  }, {
	    key: 'swalConfirm',
	    value: function swalConfirm() {
	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this imaginary file!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        closeOnConfirm: false
	      }, function () {
	        swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
	      });
	    }
	  }, {
	    key: 'swalBasic',
	    value: function swalBasic() {
	      swal("Here's a message!", "It's pretty, isn't it?");
	    }
	  }, {
	    key: 'swalSuccess',
	    value: function swalSuccess() {
	      swal('Good job!', 'You clicked the button!', 'success');
	    }
	  }, {
	    key: 'swalDecide',
	    value: function swalDecide() {
	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this imaginary file!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        cancelButtonText: 'No, cancel plx!',
	        closeOnConfirm: false,
	        closeOnCancel: false
	      }, function (isConfirm) {
	        if (isConfirm) {
	          swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
	        } else {
	          swal('Cancelled', 'Your imaginary file is safe :)', 'error');
	        }
	      });
	    }
	  }, {
	    key: 'swalImage',
	    value: function swalImage() {
	      swal({
	        title: 'Sweet!',
	        text: "Here's a custom image.",
	        imageUrl: '/img/avatar5.png'
	      });
	    }
	  }, {
	    key: 'swalHtmlMessage',
	    value: function swalHtmlMessage() {
	      swal({
	        title: 'HTML <small>Title</small>!',
	        text: 'A custom <span style="color:#F8BB86">html<span> message.',
	        html: true
	      });
	    }
	  }, {
	    key: 'swalAutoClose',
	    value: function swalAutoClose() {
	      swal({
	        title: 'Auto close alert!',
	        text: 'I will close in 2 seconds.',
	        timer: 2000,
	        showConfirmButton: false
	      });
	    }
	  }, {
	    key: 'swalPrompt',
	    value: function swalPrompt() {
	      swal({
	        title: 'An input!',
	        text: 'Write something interesting:',
	        type: 'input',
	        showCancelButton: true,
	        closeOnConfirm: false,
	        animation: 'slide-from-top',
	        inputPlaceholder: 'Write something'
	      }, function (inputValue) {
	        if (inputValue === false) return false;
	        if (inputValue === '') {
	          swal.showInputError('You need to write something!');
	          return false;
	        }
	        swal('Nice!', 'You wrote: ' + inputValue, 'success');
	      });
	    }
	  }, {
	    key: 'swalAjax',
	    value: function swalAjax() {
	      var API = this.API;

	      swal({
	        title: 'Ajax request example',
	        text: 'Submit to run ajax request',
	        type: 'info',
	        showCancelButton: true,
	        closeOnConfirm: false,
	        showLoaderOnConfirm: true
	      }, function () {
	        var UserData = API.service('me', API.all('users'));

	        UserData.one().get().then(function (response) {
	          var userdata = response.plain();
	          swal('Your Name is: ' + userdata.data.name);
	        });
	      });
	    }
	  }]);

	  return UiModalController;
	}();

	var UiModalComponent = exports.UiModalComponent = {
	  templateUrl: './views/app/components/ui-modal/ui-modal.component.html',
	  controller: UiModalController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiTimelineController = function () {
	  function UiTimelineController() {
	    'ngInject';

	    //

	    _classCallCheck(this, UiTimelineController);
	  }

	  _createClass(UiTimelineController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UiTimelineController;
	}();

	var UiTimelineComponent = exports.UiTimelineComponent = {
	  templateUrl: './views/app/components/ui-timeline/ui-timeline.component.html',
	  controller: UiTimelineController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiButtonsController = function () {
	  function UiButtonsController() {
	    'ngInject';

	    //

	    _classCallCheck(this, UiButtonsController);
	  }

	  _createClass(UiButtonsController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UiButtonsController;
	}();

	var UiButtonsComponent = exports.UiButtonsComponent = {
	  templateUrl: './views/app/components/ui-buttons/ui-buttons.component.html',
	  controller: UiButtonsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiIconsController = function () {
	  function UiIconsController() {
	    'ngInject';

	    //

	    _classCallCheck(this, UiIconsController);
	  }

	  _createClass(UiIconsController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UiIconsController;
	}();

	var UiIconsComponent = exports.UiIconsComponent = {
	  templateUrl: './views/app/components/ui-icons/ui-icons.component.html',
	  controller: UiIconsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UiGeneralController = function () {
	  function UiGeneralController() {
	    'ngInject';

	    //

	    _classCallCheck(this, UiGeneralController);
	  }

	  _createClass(UiGeneralController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UiGeneralController;
	}();

	var UiGeneralComponent = exports.UiGeneralComponent = {
	  templateUrl: './views/app/components/ui-general/ui-general.component.html',
	  controller: UiGeneralController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FormsGeneralController = function () {
	  function FormsGeneralController() {
	    'ngInject';

	    //

	    _classCallCheck(this, FormsGeneralController);
	  }

	  _createClass(FormsGeneralController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return FormsGeneralController;
	}();

	var FormsGeneralComponent = exports.FormsGeneralComponent = {
	  templateUrl: './views/app/components/forms-general/forms-general.component.html',
	  controller: FormsGeneralController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChartsChartjsController = function () {
	  function ChartsChartjsController() {
	    'ngInject';

	    _classCallCheck(this, ChartsChartjsController);
	  }

	  _createClass(ChartsChartjsController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.lineChartLabels = ['Januarys', 'February', 'March', 'April', 'May', 'June', 'July'];
	      this.lineChartSeries = ['Series A', 'Series B'];
	      this.lineChartData = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];

	      this.areaChartLabels = ['Januarys', 'February', 'March', 'April', 'May', 'June', 'July'];
	      this.areaChartSeries = ['Series A', 'Series B'];
	      this.areaChartData = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
	      this.areaChartColours = [{
	        fillColor: '#D2D6DE',
	        strokeColor: '#D2D6DE',
	        pointColor: 'rgba(148,159,177,1)',
	        pointStrokeColor: '#fff',
	        pointHighlightFill: '#fff',
	        pointHighlightStroke: 'rgba(148,159,177,0.8)'
	      }, {
	        fillColor: '#4B94C0',
	        strokeColor: '#4B94C0',
	        pointColor: '#2980b9',
	        pointStrokeColor: '#fff',
	        pointHighlightFill: '#fff',
	        pointHighlightStroke: 'rgba(77,83,96,1)'
	      }];

	      this.onClick = function () {};

	      this.barChartLabels = ['Januarys', 'February', 'March', 'April', 'May', 'June', 'July'];
	      this.barChartSeries = ['Series A', 'Series B'];
	      this.barChartData = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];
	      this.barChartColours = [{
	        fillColor: '#D2D6DE',
	        strokeColor: '#D2D6DE',
	        pointColor: 'rgba(148,159,177,1)',
	        pointStrokeColor: '#fff',
	        pointHighlightFill: '#fff',
	        pointHighlightStroke: 'rgba(148,159,177,0.8)'
	      }, {
	        fillColor: '#00A65A',
	        strokeColor: '#00A65A',
	        pointColor: '#2980b9',
	        pointStrokeColor: '#fff',
	        pointHighlightFill: '#fff',
	        pointHighlightStroke: 'rgba(77,83,96,1)'
	      }];

	      this.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	      this.pieData = [300, 500, 100];
	    }
	  }]);

	  return ChartsChartjsController;
	}();

	var ChartsChartjsComponent = exports.ChartsChartjsComponent = {
	  templateUrl: './views/app/components/charts-chartjs/charts-chartjs.component.html',
	  controller: ChartsChartjsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WidgetsController = function () {
	  function WidgetsController() {
	    'ngInject';

	    //

	    _classCallCheck(this, WidgetsController);
	  }

	  _createClass(WidgetsController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return WidgetsController;
	}();

	var WidgetsComponent = exports.WidgetsComponent = {
	  templateUrl: './views/app/components/widgets/widgets.component.html',
	  controller: WidgetsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserProfileController = function () {
	  UserProfileController.$inject = ["$stateParams", "$state", "API"];
	  function UserProfileController($stateParams, $state, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserProfileController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.alerts = [];
	    this.userRolesSelected = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }

	    var UserData = API.service('me', API.all('users'));
	    UserData.one().get().then(function (response) {
	      _this.userdata = API.copy(response);
	      _this.userdata.data.current_password = '';
	      _this.userdata.data.new_password = '';
	      _this.userdata.data.new_password_confirmation = '';
	    });
	  }

	  _createClass(UserProfileController, [{
	    key: 'save',
	    value: function save(isValid, userForm) {
	      var _this2 = this;

	      if (isValid) {
	        var $state = this.$state;

	        this.userdata.put().then(function () {
	          var alert = { type: 'success', 'title': 'Success!', msg: 'Profile has been updated.' };
	          $state.go($state.current, { alerts: alert });
	        }, function (response) {
	          var formErrors = [];

	          if (angular.isDefined(response.data.errors.message)) {
	            formErrors = response.data.errors.message[0];
	          } else {
	            formErrors = response.data.errors;
	          }

	          angular.forEach(formErrors, function (value, key) {
	            var varkey = key.replace('data.', '');
	            userForm[varkey].$invalid = true;
	            userForm[varkey].customError = value[0];
	          });

	          _this2.formSubmitted = true;
	        });
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserProfileController;
	}();

	var UserProfileComponent = exports.UserProfileComponent = {
	  templateUrl: './views/app/components/user-profile/user-profile.component.html',
	  controller: UserProfileController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserVerificationController = function () {
	  UserVerificationController.$inject = ["$stateParams"];
	  function UserVerificationController($stateParams) {
	    'ngInject';

	    _classCallCheck(this, UserVerificationController);

	    this.alerts = [];

	    if ($stateParams.status === 'success') {
	      this.alerts.push({ type: 'success', 'title': 'Success!', msg: 'Email Verification Success.' });
	    } else {
	      this.alerts.push({ type: 'danger', 'title': 'Error:', msg: 'Email verification failed.' });
	    }
	  }

	  _createClass(UserVerificationController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserVerificationController;
	}();

	var UserVerificationComponent = exports.UserVerificationComponent = {
	  templateUrl: './views/app/components/user-verification/user-verification.component.html',
	  controller: UserVerificationController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ComingSoonController = function () {
	  function ComingSoonController() {
	    'ngInject';

	    //

	    _classCallCheck(this, ComingSoonController);
	  }

	  _createClass(ComingSoonController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return ComingSoonController;
	}();

	var ComingSoonComponent = exports.ComingSoonComponent = {
	  templateUrl: './views/app/components/coming-soon/coming-soon.component.html',
	  controller: ComingSoonController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserEditController = function () {
	  UserEditController.$inject = ["$stateParams", "$state", "API"];
	  function UserEditController($stateParams, $state, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserEditController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.alerts = [];
	    this.userRolesSelected = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }

	    var userId = $stateParams.userId;

	    var Roles = API.service('roles', API.all('users'));
	    Roles.getList().then(function (response) {
	      var systemRoles = [];
	      var roleResponse = response.plain();

	      angular.forEach(roleResponse, function (value) {
	        systemRoles.push({ id: value.id, name: value.name });
	      });

	      _this.systemRoles = systemRoles;
	    });

	    var UserData = API.service('show', API.all('users'));
	    UserData.one(userId).get().then(function (response) {
	      var userRole = [];
	      var userResponse = response.plain();

	      angular.forEach(userResponse.data.role, function (value) {
	        userRole.push(value.id);
	      });

	      response.data.role = userRole;
	      _this.usereditdata = API.copy(response);
	    });
	  }

	  _createClass(UserEditController, [{
	    key: 'save',
	    value: function save(isValid) {
	      if (isValid) {
	        var $state = this.$state;
	        this.usereditdata.put().then(function () {
	          var alert = { type: 'success', 'title': 'Success!', msg: 'User has been updated.' };
	          $state.go($state.current, { alerts: alert });
	        }, function (response) {
	          var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	          $state.go($state.current, { alerts: alert });
	        });
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserEditController;
	}();

	var UserEditComponent = exports.UserEditComponent = {
	  templateUrl: './views/app/components/user-edit/user-edit.component.html',
	  controller: UserEditController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserPermissionsEditController = function () {
	  UserPermissionsEditController.$inject = ["$stateParams", "$state", "API"];
	  function UserPermissionsEditController($stateParams, $state, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserPermissionsEditController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.alerts = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }

	    var permissionId = $stateParams.permissionId;
	    var Permission = API.service('permissions-show', API.all('users'));
	    Permission.one(permissionId).get().then(function (response) {
	      _this.permission = API.copy(response);
	    });
	  }

	  _createClass(UserPermissionsEditController, [{
	    key: 'save',
	    value: function save(isValid) {
	      if (isValid) {
	        var $state = this.$state;
	        this.permission.put().then(function () {
	          var alert = { type: 'success', 'title': 'Success!', msg: 'Permission has been updated.' };
	          $state.go($state.current, { alerts: alert });
	        }, function (response) {
	          var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	          $state.go($state.current, { alerts: alert });
	        });
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserPermissionsEditController;
	}();

	var UserPermissionsEditComponent = exports.UserPermissionsEditComponent = {
	  templateUrl: './views/app/components/user-permissions-edit/user-permissions-edit.component.html',
	  controller: UserPermissionsEditController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserPermissionsAddController = function () {
	  UserPermissionsAddController.$inject = ["API", "$state", "$stateParams"];
	  function UserPermissionsAddController(API, $state, $stateParams) {
	    'ngInject';

	    _classCallCheck(this, UserPermissionsAddController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.API = API;
	    this.alerts = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }
	  }

	  _createClass(UserPermissionsAddController, [{
	    key: 'save',
	    value: function save(isValid) {
	      this.$state.go(this.$state.current, {}, { alerts: 'test' });
	      if (isValid) {
	        var Permissions = this.API.service('permissions', this.API.all('users'));
	        var $state = this.$state;

	        Permissions.post({
	          'name': this.name,
	          'slug': this.slug,
	          'description': this.description
	        }).then(function () {
	          var alert = { type: 'success', 'title': 'Success!', msg: 'Permission has been added.' };
	          $state.go($state.current, { alerts: alert });
	        }, function (response) {
	          var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	          $state.go($state.current, { alerts: alert });
	        });
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserPermissionsAddController;
	}();

	var UserPermissionsAddComponent = exports.UserPermissionsAddComponent = {
	  templateUrl: './views/app/components/user-permissions-add/user-permissions-add.component.html',
	  controller: UserPermissionsAddController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserPermissionsController = function () {
	  UserPermissionsController.$inject = ["$scope", "$state", "$compile", "DTOptionsBuilder", "DTColumnBuilder", "API"];
	  function UserPermissionsController($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserPermissionsController);

	    this.API = API;
	    this.$state = $state;

	    var Permissions = this.API.service('permissions', this.API.all('users'));

	    Permissions.getList().then(function (response) {
	      var dataSet = response.plain();

	      _this.dtOptions = DTOptionsBuilder.newOptions().withOption('data', dataSet).withOption('createdRow', createdRow).withOption('responsive', true).withBootstrap();

	      _this.dtColumns = [DTColumnBuilder.newColumn('id').withTitle('ID'), DTColumnBuilder.newColumn('name').withTitle('Name'), DTColumnBuilder.newColumn('slug').withTitle('Slug'), DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)];

	      _this.displayTable = true;
	    });

	    var createdRow = function createdRow(row) {
	      $compile(angular.element(row).contents())($scope);
	    };

	    var actionsHtml = function actionsHtml(data) {
	      return '\n                <a class="btn btn-xs btn-warning" ui-sref="app.userpermissionsedit({permissionId: ' + data.id + '})">\n                    <i class="fa fa-edit"></i>\n                </a>\n                &nbsp\n                <button class="btn btn-xs btn-danger" ng-click="vm.delete(' + data.id + ')">\n                    <i class="fa fa-trash-o"></i>\n                </button>';
	    };
	  }

	  _createClass(UserPermissionsController, [{
	    key: 'delete',
	    value: function _delete(permissionId) {
	      var API = this.API;
	      var $state = this.$state;

	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this data!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        closeOnConfirm: false,
	        showLoaderOnConfirm: true,
	        html: false
	      }, function () {
	        API.one('users').one('permissions', permissionId).remove().then(function () {
	          swal({
	            title: 'Deleted!',
	            text: 'User Permission has been deleted.',
	            type: 'success',
	            confirmButtonText: 'OK',
	            closeOnConfirm: true
	          }, function () {
	            $state.reload();
	          });
	        });
	      });
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserPermissionsController;
	}();

	var UserPermissionsComponent = exports.UserPermissionsComponent = {
	  templateUrl: './views/app/components/user-permissions/user-permissions.component.html',
	  controller: UserPermissionsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserRolesEditController = function () {
	  UserRolesEditController.$inject = ["$stateParams", "$state", "API"];
	  function UserRolesEditController($stateParams, $state, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserRolesEditController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.alerts = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }

	    var Permissions = API.service('permissions', API.all('users'));

	    Permissions.getList().then(function (response) {
	      var permissionList = [];
	      var permissionResponse = response.plain();

	      angular.forEach(permissionResponse, function (value) {
	        permissionList.push({ id: value.id, name: value.name });
	      });

	      _this.systemPermissions = permissionList;
	    });

	    var roleId = $stateParams.roleId;
	    var Role = API.service('roles-show', API.all('users'));
	    Role.one(roleId).get().then(function (response) {
	      var rolePermissions = [];

	      angular.forEach(response.data.permissions, function (value) {
	        rolePermissions.push(value.id);
	      });

	      response.data.permissions = rolePermissions;

	      _this.role = API.copy(response);
	    });
	  }

	  _createClass(UserRolesEditController, [{
	    key: 'save',
	    value: function save(isValid) {
	      if (isValid) {
	        var $state = this.$state;
	        this.role.put().then(function () {
	          var alert = { type: 'success', 'title': 'Success!', msg: 'Role has been updated.' };
	          $state.go($state.current, { alerts: alert });
	        }, function (response) {
	          var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	          $state.go($state.current, { alerts: alert });
	        });
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserRolesEditController;
	}();

	var UserRolesEditComponent = exports.UserRolesEditComponent = {
	  templateUrl: './views/app/components/user-roles-edit/user-roles-edit.component.html',
	  controller: UserRolesEditController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserRolesAddController = function () {
	  UserRolesAddController.$inject = ["API", "$state", "$stateParams"];
	  function UserRolesAddController(API, $state, $stateParams) {
	    'ngInject';

	    _classCallCheck(this, UserRolesAddController);

	    this.$state = $state;
	    this.formSubmitted = false;
	    this.API = API;
	    this.alerts = [];

	    if ($stateParams.alerts) {
	      this.alerts.push($stateParams.alerts);
	    }
	  }

	  _createClass(UserRolesAddController, [{
	    key: 'save',
	    value: function save(isValid) {
	      this.$state.go(this.$state.current, {}, { alerts: 'test' });
	      if (isValid) {
	        var Roles = this.API.service('roles', this.API.all('users'));
	        var $state = this.$state;

	        Roles.post({
	          'role': this.role,
	          'slug': this.slug,
	          'description': this.description
	        }).then(function () {
	          var alert = { type: 'success', 'title': 'Success!', msg: 'Role has been added.' };
	          $state.go($state.current, { alerts: alert });
	        }, function (response) {
	          var alert = { type: 'error', 'title': 'Error!', msg: response.data.message };
	          $state.go($state.current, { alerts: alert });
	        });
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserRolesAddController;
	}();

	var UserRolesAddComponent = exports.UserRolesAddComponent = {
	  templateUrl: './views/app/components/user-roles-add/user-roles-add.component.html',
	  controller: UserRolesAddController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserRolesController = function () {
	  UserRolesController.$inject = ["$scope", "$state", "$compile", "DTOptionsBuilder", "DTColumnBuilder", "API"];
	  function UserRolesController($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserRolesController);

	    this.API = API;
	    this.$state = $state;

	    var Roles = this.API.service('roles', this.API.all('users'));

	    Roles.getList().then(function (response) {
	      var dataSet = response.plain();

	      _this.dtOptions = DTOptionsBuilder.newOptions().withOption('data', dataSet).withOption('createdRow', createdRow).withOption('responsive', true).withBootstrap();

	      _this.dtColumns = [DTColumnBuilder.newColumn('id').withTitle('ID'), DTColumnBuilder.newColumn('name').withTitle('Name'), DTColumnBuilder.newColumn('slug').withTitle('Slug'), DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)];

	      _this.displayTable = true;
	    });

	    var createdRow = function createdRow(row) {
	      $compile(angular.element(row).contents())($scope);
	    };

	    var actionsHtml = function actionsHtml(data) {
	      return '\n                <a class="btn btn-xs btn-warning" ui-sref="app.userrolesedit({roleId: ' + data.id + '})">\n                    <i class="fa fa-edit"></i>\n                </a>\n                &nbsp\n                <button class="btn btn-xs btn-danger" ng-click="vm.delete(' + data.id + ')">\n                    <i class="fa fa-trash-o"></i>\n                </button>';
	    };
	  }

	  _createClass(UserRolesController, [{
	    key: 'delete',
	    value: function _delete(roleId) {
	      var API = this.API;
	      var $state = this.$state;

	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this data!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        closeOnConfirm: false,
	        showLoaderOnConfirm: true,
	        html: false
	      }, function () {
	        API.one('users').one('roles', roleId).remove().then(function () {
	          swal({
	            title: 'Deleted!',
	            text: 'User Role has been deleted.',
	            type: 'success',
	            confirmButtonText: 'OK',
	            closeOnConfirm: true
	          }, function () {
	            $state.reload();
	          });
	        });
	      });
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserRolesController;
	}();

	var UserRolesComponent = exports.UserRolesComponent = {
	  templateUrl: './views/app/components/user-roles/user-roles.component.html',
	  controller: UserRolesController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserListsController = function () {
	  UserListsController.$inject = ["$scope", "$state", "$compile", "DTOptionsBuilder", "DTColumnBuilder", "API"];
	  function UserListsController($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, UserListsController);

	    this.API = API;
	    this.$state = $state;

	    var Users = this.API.service('users');

	    Users.getList().then(function (response) {
	      var dataSet = response.plain();

	      _this.dtOptions = DTOptionsBuilder.newOptions().withOption('data', dataSet).withOption('createdRow', createdRow).withOption('responsive', true).withBootstrap();

	      _this.dtColumns = [DTColumnBuilder.newColumn('id').withTitle('ID'), DTColumnBuilder.newColumn('name').withTitle('Name'), DTColumnBuilder.newColumn('email').withTitle('Email'), DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)];

	      _this.displayTable = true;
	    });

	    var createdRow = function createdRow(row) {
	      $compile(angular.element(row).contents())($scope);
	    };

	    var actionsHtml = function actionsHtml(data) {
	      return '\n                <a class="btn btn-xs btn-warning" ui-sref="app.useredit({userId: ' + data.id + '})">\n                    <i class="fa fa-edit"></i>\n                </a>\n                &nbsp\n                <button class="btn btn-xs btn-danger" ng-click="vm.delete(' + data.id + ')">\n                    <i class="fa fa-trash-o"></i>\n                </button>';
	    };
	  }

	  _createClass(UserListsController, [{
	    key: 'delete',
	    value: function _delete(userId) {
	      var API = this.API;
	      var $state = this.$state;

	      swal({
	        title: 'Are you sure?',
	        text: 'You will not be able to recover this data!',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: 'Yes, delete it!',
	        closeOnConfirm: false,
	        showLoaderOnConfirm: true,
	        html: false
	      }, function () {
	        API.one('users').one('user', userId).remove().then(function () {
	          swal({
	            title: 'Deleted!',
	            text: 'User Permission has been deleted.',
	            type: 'success',
	            confirmButtonText: 'OK',
	            closeOnConfirm: true
	          }, function () {
	            $state.reload();
	          });
	        });
	      });
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return UserListsController;
	}();

	var UserListsComponent = exports.UserListsComponent = {
	  templateUrl: './views/app/components/user-lists/user-lists.component.html',
	  controller: UserListsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DashboardController = function DashboardController($scope) {
	  'ngInject';

	  _classCallCheck(this, DashboardController);

	  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];

	  $scope.onClick = function () {};

	  $scope.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	  $scope.pieData = [300, 500, 100];
	};
	DashboardController.$inject = ["$scope"];

	var DashboardComponent = exports.DashboardComponent = {
	  templateUrl: './views/app/components/dashboard/dashboard.component.html',
	  controller: DashboardController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavSidebarController = function () {
	  NavSidebarController.$inject = ["AclService", "ContextService"];
	  function NavSidebarController(AclService, ContextService) {
	    'ngInject';

	    _classCallCheck(this, NavSidebarController);

	    var navSideBar = this;
	    this.can = AclService.can;

	    ContextService.me(function (data) {
	      navSideBar.userData = data;
	    });
	  }

	  _createClass(NavSidebarController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return NavSidebarController;
	}();

	var NavSidebarComponent = exports.NavSidebarComponent = {
	  templateUrl: './views/app/components/nav-sidebar/nav-sidebar.component.html',
	  controller: NavSidebarController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavHeaderController = function () {
	  NavHeaderController.$inject = ["$rootScope", "ContextService"];
	  function NavHeaderController($rootScope, ContextService) {
	    'ngInject';

	    _classCallCheck(this, NavHeaderController);

	    var navHeader = this;

	    ContextService.me(function (data) {
	      navHeader.userData = data;
	    });
	  }

	  _createClass(NavHeaderController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return NavHeaderController;
	}();

	var NavHeaderComponent = exports.NavHeaderComponent = {
	  templateUrl: './views/app/components/nav-header/nav-header.component.html',
	  controller: NavHeaderController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginLoaderController = function LoginLoaderController($state, $auth, API, AclService) {
	  'ngInject';

	  _classCallCheck(this, LoginLoaderController);

	  API.oneUrl('authenticate').one('user').get().then(function (response) {
	    if (!response.error) {
	      var data = response.data;

	      angular.forEach(data.userRole, function (value) {
	        AclService.attachRole(value);
	      });

	      AclService.setAbilities(data.abilities);
	      $auth.setToken(data.token);
	      $state.go('app.landing');
	    }
	  });
	};
	LoginLoaderController.$inject = ["$state", "$auth", "API", "AclService"];

	var LoginLoaderComponent = exports.LoginLoaderComponent = {
	  templateUrl: './views/app/components/login-loader/login-loader.component.html',
	  controller: LoginLoaderController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResetPasswordController = function () {
	  ResetPasswordController.$inject = ["API", "$state"];
	  function ResetPasswordController(API, $state) {
	    'ngInject';

	    _classCallCheck(this, ResetPasswordController);

	    this.API = API;
	    this.$state = $state;
	    this.alerts = [];
	  }

	  _createClass(ResetPasswordController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.password = '';
	      this.password_confirmation = '';
	      this.isValidToken = false;
	      this.formSubmitted = false;

	      this.verifyToken();
	    }
	  }, {
	    key: 'verifyToken',
	    value: function verifyToken() {
	      var _this = this;

	      var email = this.$state.params.email;
	      var token = this.$state.params.token;

	      this.API.all('auth/password').get('verify', {
	        email: email, token: token }).then(function () {
	        _this.isValidToken = true;
	      }, function () {
	        _this.$state.go('app.landing');
	      });
	    }
	  }, {
	    key: 'submit',
	    value: function submit(isValid) {
	      var _this2 = this;

	      if (isValid) {
	        this.alerts = [];
	        var data = {
	          email: this.$state.params.email,
	          token: this.$state.params.token,
	          password: this.password,
	          password_confirmation: this.password_confirmation
	        };

	        this.API.all('auth/password/reset').post(data).then(function () {
	          _this2.$state.go('login', { successMsg: 'Your password has been changed, You may now login.' });
	        }, function (res) {
	          var alrtArr = [];

	          angular.forEach(res.data.errors, function (value) {
	            alrtArr = { type: 'error', 'title': 'Error!', msg: value[0] };
	          });

	          _this2.alerts.push(alrtArr);
	        });
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }]);

	  return ResetPasswordController;
	}();

	var ResetPasswordComponent = exports.ResetPasswordComponent = {
	  templateUrl: './views/app/components/reset-password/reset-password.component.html',
	  controller: ResetPasswordController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ForgotPasswordController = function () {
	  ForgotPasswordController.$inject = ["API", "$state"];
	  function ForgotPasswordController(API, $state) {
	    'ngInject';

	    _classCallCheck(this, ForgotPasswordController);

	    this.API = API;
	    this.$state = $state;
	    this.formSubmitted = false;
	    this.serverError = '';
	  }

	  _createClass(ForgotPasswordController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.email = '';
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      var _this = this;

	      this.serverError = '';

	      this.API.all('auth/password/email').post({
	        email: this.email
	      }).then(function () {
	        _this.$state.go('login', { successMsg: 'Please check your email for instructions on how to reset your password.' });
	      }, function (res) {
	        for (var error in res.data.errors) {
	          _this.serverError += res.data.errors[error] + ' ';
	        }
	        _this.formSubmitted = true;
	      });
	    }
	  }]);

	  return ForgotPasswordController;
	}();

	var ForgotPasswordComponent = exports.ForgotPasswordComponent = {
	  templateUrl: './views/app/components/forgot-password/forgot-password.component.html',
	  controller: ForgotPasswordController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginFormController = function () {
	  LoginFormController.$inject = ["$rootScope", "$auth", "$state", "$stateParams", "API", "AclService"];
	  function LoginFormController($rootScope, $auth, $state, $stateParams, API, AclService) {
	    'ngInject';

	    _classCallCheck(this, LoginFormController);

	    delete $rootScope.me;

	    this.$auth = $auth;
	    this.$state = $state;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;

	    this.registerSuccess = $stateParams.registerSuccess;
	    this.successMsg = $stateParams.successMsg;
	    this.loginfailederror = '';
	    this.loginfailed = false;
	    this.unverified = false;
	  }

	  _createClass(LoginFormController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.email = '';
	      this.password = '';
	    }
	  }, {
	    key: 'login',
	    value: function login() {
	      var _this = this;

	      this.loginfailederror = '';
	      this.loginfailed = false;
	      this.unverified = false;

	      var user = {
	        email: this.email,
	        password: this.password
	      };

	      this.$auth.login(user).then(function (response) {
	        var data = response.data.data;
	        var AclService = _this.AclService;

	        angular.forEach(data.userRole, function (value) {
	          AclService.attachRole(value);
	        });

	        AclService.setAbilities(data.abilities);
	        _this.$auth.setToken(response.data);
	        _this.$state.go('app.landing');
	      }).catch(this.failedLogin.bind(this));
	    }
	  }, {
	    key: 'failedLogin',
	    value: function failedLogin(res) {
	      if (res.status == 401) {
	        this.loginfailed = true;
	      } else {
	        if (res.data.errors.message[0] == 'Email Unverified') {
	          this.unverified = true;
	        } else {
	          // other kinds of error returned from server
	          for (var error in res.data.errors) {
	            this.loginfailederror += res.data.errors[error] + ' ';
	          }
	        }
	      }
	    }
	  }]);

	  return LoginFormController;
	}();

	var LoginFormComponent = exports.LoginFormComponent = {
	  templateUrl: './views/app/components/login-form/login-form.component.html',
	  controller: LoginFormController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterFormController = function () {
	  RegisterFormController.$inject = ["$auth", "$state", "$scope"];
	  function RegisterFormController($auth, $state, $scope) {
	    'ngInject';

	    _classCallCheck(this, RegisterFormController);

	    this.$auth = $auth;
	    this.$state = $state;
	    this.$scope = $scope;

	    this.password = '';
	    this.password_confirmation = '';
	    this.formSubmitted = false;
	    this.errors = [];
	  }

	  _createClass(RegisterFormController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.name = '';
	      this.email = '';
	      this.password = '';
	      this.password_confirmation = '';
	    }
	  }, {
	    key: 'register',
	    value: function register(isValid) {
	      var _this = this;

	      if (isValid) {
	        var user = {
	          name: this.name,
	          email: this.email,
	          password: this.password,
	          password_confirmation: this.password_confirmation
	        };

	        this.$auth.signup(user).then(function () {
	          _this.$state.go('login', { registerSuccess: true });
	        }).catch(this.failedRegistration.bind(this));
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: 'failedRegistration',
	    value: function failedRegistration(response) {
	      if (response.status === 422) {
	        for (var error in response.data.errors) {
	          this.errors[error] = response.data.errors[error][0];
	          this.$scope.userForm[error].$invalid = true;
	        }
	      }
	    }
	  }]);

	  return RegisterFormController;
	}();

	var RegisterFormComponent = exports.RegisterFormComponent = {
	  templateUrl: './views/app/components/register-form/register-form.component.html',
	  controller: RegisterFormController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _routeBodyclass = __webpack_require__(47);

	var _passwordVerify = __webpack_require__(48);

	angular.module('app.components').directive('routeBodyclass', _routeBodyclass.RouteBodyClassComponent).directive('passwordVerify', _passwordVerify.PasswordVerifyClassComponent);

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	routeBodyClass.$inject = ['$rootScope'];
	function routeBodyClass($rootScope) {
	  return {
	    scope: { ngModel: '=ngModel' },
	    link: function routeBodyClassLink(scope, elem) {
	      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	        // eslint-disable-line angular/on-watch
	        var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.bodyClass) ? fromState.data.bodyClass : null;
	        var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.bodyClass) ? toState.data.bodyClass : null;

	        if (fromClassnames != toClassnames) {
	          if (fromClassnames) {
	            elem.removeClass(fromClassnames);
	          }

	          if (toClassnames) {
	            elem.addClass(toClassnames);
	          }
	        }
	      });
	    },
	    restrict: 'EA'
	  };
	}

	var RouteBodyClassComponent = exports.RouteBodyClassComponent = routeBodyClass;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function passwordVerifyClass() {
	  return {
	    require: 'ngModel',
	    scope: {
	      passwordVerify: '='
	    },
	    link: function link(scope, element, attrs, ctrl) {
	      scope.$watch(function () {
	        var combined;

	        if (scope.passwordVerify || ctrl.$viewValue) {
	          combined = scope.passwordVerify + '_' + ctrl.$viewValue;
	        }

	        return combined;
	      }, function (value) {
	        if (value) {
	          ctrl.$parsers.unshift(function (viewValue) {
	            var origin = scope.passwordVerify;

	            if (origin !== viewValue) {
	              ctrl.$setValidity('passwordVerify', false);
	              return undefined;
	            } else {
	              ctrl.$setValidity('passwordVerify', true);
	              return viewValue;
	            }
	          });
	        }
	      });
	    }
	  };
	}

	var PasswordVerifyClassComponent = exports.PasswordVerifyClassComponent = passwordVerifyClass;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _context = __webpack_require__(50);

	var _API = __webpack_require__(51);

	angular.module('app.services').service('ContextService', _context.ContextService).service('API', _API.APIService);

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ContextService = exports.ContextService = function () {
	  ContextService.$inject = ["$auth", "$rootScope", "API"];
	  function ContextService($auth, $rootScope, API) {
	    'ngInject';

	    _classCallCheck(this, ContextService);

	    this.$auth = $auth;
	    this.API = API;
	    this.$rootScope = $rootScope;
	  }

	  _createClass(ContextService, [{
	    key: 'getContext',
	    value: function getContext() {
	      var $auth = this.$auth;

	      if ($auth.isAuthenticated()) {
	        var API = this.API;
	        var UserData = API.service('me', API.all('users'));

	        return UserData.one().get();
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'me',
	    value: function me(cb) {
	      this.$rootScope.$watch('me', function (nv) {
	        cb(nv);
	      });
	    }
	  }]);

	  return ContextService;
	}();

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var APIService = exports.APIService = ["Restangular", "$window", function APIService(Restangular, $window) {
	  'ngInject';
	  // content negotiation

	  _classCallCheck(this, APIService);

	  var headers = {
	    'Content-Type': 'application/json',
	    'Accept': 'application/x.laravel.v1+json'
	  };

	  return Restangular.withConfig(function (RestangularConfigurer) {
	    RestangularConfigurer.setBaseUrl('/api/').setDefaultHeaders(headers).setErrorInterceptor(function (response) {
	      if (response.status === 422) {
	        // for (var error in response.data.errors) {
	        // return ToastService.error(response.data.errors[error][0])
	        // }
	      }
	    }).addFullRequestInterceptor(function (element, operation, what, url, headers) {
	      var token = $window.localStorage.satellizer_token;
	      if (token) {
	        headers.Authorization = 'Bearer ' + token;
	      }
	    }).addResponseInterceptor(function (response, operation, what) {
	      if (operation === 'getList') {
	        var newResponse = response.data[what];
	        newResponse.error = response.error;
	        return newResponse;
	      }

	      return response;
	    });
	  });
	}];

/***/ })
/******/ ]);