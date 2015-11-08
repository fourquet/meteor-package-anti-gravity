var Constellation = Package["constellation:console"].API;

Constellation.addTab({
  name: 'Anti-Gravity',
  headerContentTemplate: 'Constellation_anti_gravity_header',
  menuContentTemplate: 'Constellation_anti_gravity_menu',
  mainContentTemplate: 'Constellation_anti_gravity_main'
});

var mainContent = new ReactiveVar(null);

Template.Constellation_anti_gravity_main.helpers({
  mainContent: function() {
    return mainContent.get();
  },
  convertPackageName: function(packageName) {
    return packageName.replace(':', '/');
  }
});

Template.Constellation_anti_gravity_menu.helpers({
  dictionaries: function() {},
  selected: function() {
    return true;
  },
});

Template.Constellation_anti_gravity_menu.events({
  'click button': function(evt, tmpl) {
    mainContent.set({
      loading: true,
    });
    Meteor.call('fourquet:anti-gravity/package-difference', function(error, result) {
      if (error) {
        mainContent.set({
          error: error,
        });
      } else {
        mainContent.set({
          packages: result,
        });
      }
    });
  },
});

Meteor.subscribe('atmosPackages');
