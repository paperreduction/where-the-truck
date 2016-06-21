/**
 *  Scroll Lock jQuery Plugin
 *  I think Dave wrote this... ?
 */
var $ = require('jquery');
$.scrollLock = ( function scrollLockSimple(){
      var locked = false;
      var $body = $('body');
      var previous = $body.css('overflow');

      function lock(){
        $body.css('overflow', 'hidden');
        locked = true;
      }

      function unlock(){
        $body.css( 'overflow', previous);
        locked = false;
      }

      return function scrollLock(on) {
        if(on || !locked){
            lock();
        }else{
            unlock();
        }
      };
    }() );