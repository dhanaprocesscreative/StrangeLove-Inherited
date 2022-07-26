/*
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 
    $('#main-header').EngoSticky({
        onInit: function(){
            console.log('call');
        },
        start: function(){
            console.log('start');
        },
        end: function(){
            console.log('end');
        }
    });
    
    
    
    $('#main-header')
        .on('sticky.start', function(){
            console.log('sticky.start');
        })
        .on('sticky.end', function(){
            console.log('sticky.end');
        });
 */


;(function ($, w) {
	"use strict";
    
    var methods = (function () {
        var _window = $(window),
            scrolled = false,
            
            start = function (_sticky,_placeholder, o) {

                var _body = $('body');
                /*
                if(_body.hasClass('tablets') == true && o.tablets == false)
                    return false;

                if( _window.outerWidth() <= o.widthDisable )
                    return false;
                 */
                o.start.call(this);
                var $classContainer = $('.'+o.classContainer);

                _sticky.trigger("sticky.start");
                _placeholder.css( 'height', _sticky.outerHeight());

                $classContainer
                    .addClass(o.className)
                    .removeClass( 'header-absolute header-normal' )
                    .addClass( 'header-light' );

                setTimeout(function(){
                    $classContainer
                        .addClass(o.classSticky)
                }, 300);

                var $offset = _placeholder.offset();

                scrolled = true;
            },
            end = function (_sticky, _placeholder, o) {
                _placeholder.css({'height':'0px'});

                var $classContainer = $('.'+o.classContainer);

                $classContainer
                    .removeClass('header-light header-dark header-absolute header-normal')
                    .addClass('header-' + $classContainer.data('scheme'))
                    .addClass('header-' + $classContainer.data('position'));

                $classContainer
                    .removeClass(o.className)
                    .removeClass(o.classSticky);
                
                scrolled = false;
                
                o.end.call(this);
                _sticky.trigger("sticky.end");
            };
            
            
        return {
            // public methods
            start: function(){
                if (this.length) {
                    var $this = this, 
                        o = $this.data('sticky-options');
                    start($this, $this.prev('.sticky-placeholder'), o);
                }
                return this;
            },
            
            end: function(){
                if (this.length) {
                    var $this = this, 
                        o = $this.data('sticky-options');
                    end($this, $this.prev('.sticky-placeholder'), o);
                }
                return this;
            },
            
            init: function (op) {
				return this.each(function () {
                    
                    var $this = $(this);
                    if ($this.data('sticky-options')) {
						return false;
					}
                    var o = $.extend({}, $.fn.EngoSticky.defaults, op),
                        sContent = $this,
                        soffset = o.offset;

                    $this.data('sticky-options', o);

                    if(o.contentSticky){
                        sContent = $this.find(o.contentSticky);
                    }


                    if(sContent.prev('.sticky-placeholder').length == 0){
                        var $placeholder = $("<div/>",{
                                "class":  "sticky-placeholder"
                    		}).insertBefore(sContent);
                    }else{
                        var $placeholder = sContent.prev('.sticky-placeholder');
                    }

                    if($this.hasClass('sticky-header-down')){
                        soffset += $this.outerHeight();
                    }

                    _window.scroll(function () {
                        
                        var $offset = $placeholder.offset(),
                            _scrolltop = _window.scrollTop();


                        var $offset_number = $offset.top + soffset;

                        if ($offset_number <  _scrolltop && !scrolled) {
                            start( sContent, $placeholder, o );
                        }
                        
                        if ($offset_number >= _scrolltop && scrolled) {
                            end(sContent, $placeholder, o);
                        }
                        
                    });
                    
                    o.onInit.call(this);
                    
                });
            }
        }
        
    })();
    
    $.fn.EngoSticky = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.EngoSticky');
		}
	};
    
    $.fn.EngoSticky.defaults = {
        classContainer: 'navbar-container',
        contentSticky : '',
        className: 'is-sticky',
        classSticky: 'sticky',
        offset: 0,
        //widthDisable : 1200,
        onInit: $.noop,
        start: $.noop,
        end: $.noop
    };
    
})(jQuery, window);