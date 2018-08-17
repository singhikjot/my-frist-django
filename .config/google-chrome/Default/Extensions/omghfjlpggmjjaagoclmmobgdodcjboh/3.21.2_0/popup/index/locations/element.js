'use strict';

/**
@typedef {Object} LocationData
@property {integer} mark */

Polymer({
  'is': 'index-locations-element',
  'properties': {
    'data': {
      'type': Object,
      'value': {},
      'notify': true
    },
    'highlighted': {
      'type': Boolean,
      'value': false,
      'observer': 'observeHighlighted'
    },
    'mode': { // Key property
      'type': String,
      'value': '',
      'notify': true,
      'observer': 'observeMode'
    }
  },

  // Computed properties
  /**
  @method
  @param {Boolean} favorited
  @return {String} */
  'favoritesCssClass': function favoritesCssClass(favorited) {
    return favorited ? 'favorited' : '';
  },

  /**
  @method
  @param {String} [flag]
  @return {String} */
  'flagUrl': function flagUrl(flag) {
    return flag ? '/images/flags/' + flag + '.png' : '/images/empty.png';
  },

  /**
  @method
  @param {Object} data
  @return {Boolean} */
  'showFavorites': function showFavorites(data) {
    var favorited = data.favorited;

    return typeof favorited === 'boolean';
  },

  // Observers
  /** @method */
  observeHighlighted: function observeHighlighted(newState, oldState) {
    if (newState !== oldState) this.toggleClass('highlight', newState);
  },


  /** @method */
  observeMode: function observeMode(mode) {
    this.toggleClass('current', mode === 'current');
    this.toggleClass('premium', mode === 'premium');
  },


  // Methods
  /** @method */
  favoritesClick: function favoritesClick() {
    this.fire('favorite', { 'favorited': !this.data.favorited, 'country': this.data.code });
  },


  /** @method */
  fullElementClick: function fullElementClick(event) {
    /** @type {Boolean} */
    var favoritesClick = event.target.classList.contains('Favorite');
    if (this.mode === 'current' || favoritesClick) return;

    this.fire('countryclick', { 'mode': this.mode, 'country': this.data.code });
  }
});