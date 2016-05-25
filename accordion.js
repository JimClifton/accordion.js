(function(){
    'use strict';

    function Accordion( opts ) {

        var defaults = {
            container: '.acc',
            section: '.acc__section',
            sectionHeader: '.acc__header',
            sectionContent: '.acc__content',
            activeClass: 'is-active',
            mode: 'closed',
            active: ''
        };

        this._opts = this._extend({}, defaults, opts);
        
        this._sections = this._opts.container.querySelectorAll( defaults.section );
        this._headers = this._opts.container.querySelectorAll( defaults.sectionHeader );
        this._contents = this._opts.container.querySelectorAll( defaults.sectionContent );
        this._hash = window.location.hash.substring(1);

        this._init();
    }

    Accordion.prototype = {

        _init: function() {
            for ( var i = 0; i < this._contents.length; i++ ) {
                this._addEventListeners( this._headers[i] );
                this._contents[i].setAttribute('aria-hidden', 'true');
            }

            if ( this._hash ) {
                this._autoExpand( this._hash );
            } else 

            if ( this._opts.active ) {
                var activeSection = "section" + this._opts.active;
                this._autoExpand( activeSection );
            }
        },


        /**
         * Triggered if a URL hash is found or an active section is specified in options.
         *
         * @param {string} hash The name of the content section to be opened.
         */
        _autoExpand: function( hash ) {
            for ( var i = 0; i < this._contents.length; i++ ) {
                if ( this._contents[i].id == hash ) {
                    var closest = this._getClosest( this._contents[i], this._opts.section);
                    this._modeLogic( closest );
                }
            }
        },


        /**
         * Creates click events for the section headers.
         *
         * @param {element} el The element of the header.
         */
        _addEventListeners: function( el ) {
            var _this = this;

            el.addEventListener( "click", function( e ) {
                var closest = _this._getClosest( this, _this._opts.section);
                _this._modeLogic( closest );
                e.preventDefault();
            });
        },


        /**
         * Decides where to send the code next based on the mode setting.
         *
         * @param {element} closest The element of the section that will be opened.
         */
        _modeLogic: function( closest ) {
            switch( this._opts.mode ) {
                case 'open':
                    this._openMode( closest );
                break;

                case 'closed':
                    this._closedMode( closest );
                break;
            }
        },


        /**
         * Executes the relevant DOM manipulation for 'open' mode.
         *
         * @param {element} el The element of the section that will be opened.
         */
        _openMode: function( el ) {
            if ( el.classList.contains( this._opts.activeClass ) ) {
                el.classList.remove( this._opts.activeClass );
                el.querySelector( this._opts.sectionContent ).setAttribute('aria-hidden', 'true');
            } else {
                el.classList.add( this._opts.activeClass );
                el.querySelector( this._opts.sectionContent ).setAttribute('aria-hidden', 'false');
            }
        },


        /**
         * Executes the relevant DOM manipulation for 'closed' mode.
         *
         * @param {element} el The element of the section that will be opened.
         */
        _closedMode: function( el ) {
            this._closeAll();
            el.classList.add( this._opts.activeClass );
            el.querySelector( this._opts.sectionContent ).setAttribute('aria-hidden', 'false');
        },


        /**
         * Resets/closes all sections.
         */
        _closeAll: function() {
            for (var i = 0; i < this._sections.length; i++) {
                this._sections[i].classList.remove( this._opts.activeClass );
                this._contents[i].setAttribute('aria-hidden', 'true');
            }
        },


        /* Utility function: Used to merge the arguments passed in with the plugin defaults */
        _extend: function ( out ) {
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

                for (var key in arguments[i]) {
                  if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
                }
            }

            return out;
        },

        /* Utility function: Used to get closest parent with a particular class */
        _getClosest: function ( elem, selector ) {
            for ( ; elem && elem !== document; elem = elem.parentNode ) {
                if ( elem.classList.contains( selector.substr(1) ) ) {
                    return elem;
                }
            }

            return elem;
        }
    };

    /* Support for RequireJS */
    if( typeof define === 'function' && define.amd ) {
        define( [], function() {
            return Accordion;
        });
    } else {
        window.Accordion = Accordion;
    }
})();
