(function( $ ){

  $.fn.autoEmail = function( domain ) {  

    return this.each(function() {

     var $this = $(this); 

      //disable enter key default action
      $this.keydown(function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (/^(13)$/.test(""+keyCode)) {
          e.preventDefault();
        }
      });

      //check for autocomplete after each key
      $this.keyup(function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (/^(13)$/.test(""+keyCode)) {
          //add comma and space after enter is pressed
          var emails = $(this).val().trim().split(',');
          var email = emails[emails.length-1];
          if ($this.val().length > 0 && $this.val().trim()[$this.val().trim().length-1] != "," && email.match(/.+@.+\..+/)) {
            $this.val($this.val()+", ");
          }
          return;
        } else if (!/^(8|9|13|16|17|18|46|35|36|37|38|39|40)$/.test(""+keyCode)) {
          //only look for autocomplete on normal keys (not enter,tab,arrows,etc.)
          //only look at non-highlighted text, since typer may be faster than script responses
          var emails = ($(this).val().substring(0,$(this)[0].selectionStart)+$(this).val().substring($(this)[0].selectionEnd, $(this).val().length)).trim().split(',');
          var email = emails[emails.length-1];
          var len = email.length;
          for(i=domain.length;i>=0; i--){
            var re = new RegExp("@"+domain.substr(0,i));
            if (email.substr(email.length-i-1, email.length).match(re) != null) {
              email = email.replace(re, "@"+domain);
              emails[emails.length-1] = email;
              $this.val(emails.join(','));
              var start = $this.val().length - email.length + len;
              var end = $this.val().length

              //highlight autocompleted text
              if( $this[0].createTextRange ) {
                var selRange = $this[0].createTextRange();
                selRange.collapse(true);
                selRange.moveStart('character', start);
                selRange.moveEnd('character', end-start);
                selRange.select();
              } else if( $this[0].setSelectionRange ) {
                $this[0].setSelectionRange(start, end);
              } else if( $this[0].selectionStart ) {
                $this[0].selectionStart = start;
                $this[0].selectionEnd = end;
              }
              $this.focus();

              break;
            }
          }
        }
      });

    });

  };
})( jQuery );
