(function( $ ){

  $.fn.autoEmail = function( domain, multi ) {

    return this.each(function() {

     var $this = $(this);

      //check for autocomplete after each key
      $this.keypress(function(e) {
        e.preventDefault();
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        console.log(keyCode);
        if (/^(13|44|59)$/.test(""+keyCode)) {
          //add comma and space after enter is pressed
          var emails = $(this).val().trim().split(/,\s*|;\s*/);
          var email = emails[emails.length-1];
          if (multi && $this.val().length > 0 && $this.val().trim()[$this.val().trim().length-1] != "," && email.match(/.+@.+\..+/)) {
            if (keyCode == 59) {
              $this.val($this.val()+"; ");
            } else {
              $this.val($this.val()+", ");
            }
          }
          $this[0].selectionStart = $this.val().length;
          $this[0].selectionEnd = $this.val().length;
          return;
        } else if (!/^(8|9|13|44|59)$/.test(""+keyCode)) {
          //save selection start for later
          var selStart = $(this)[0].selectionStart;
          var selEnd = $(this)[0].selectionEnd;
          var len = $(this).val().length;

          //replace selection range with typed character
          $(this).val($(this).val().substring(0,$(this)[0].selectionStart) + String.fromCharCode(keyCode) + $(this).val().substring($(this)[0].selectionEnd, $(this).val().length));
          len = $(this).val().length - len;
          //fix selection
          $this[0].selectionStart = selStart + 1;
          $this[0].selectionEnd = selEnd + len;

          var emails = $(this).val().trim().split(/,\s*|;\s*/);
          var email = emails[emails.length-1];
          var len = email.length;
          for(i=domain.length;i>=0; i--){
            var re = new RegExp("@"+domain.substr(0,i));
            if (email.substr(email.length-i-1, email.length).match(re) != null) {
              console.log("replace " + email);
              email = email.replace(re, "@"+domain);
              console.log("replaced " + email);
              emails[emails.length-1] = email;
              $this.val(emails.join(', '));
              var start = $this.val().length - email.length + len;
              var end = $this.val().length

              //highlight autocompleted text
              $this[0].selectionStart = start;
              $this[0].selectionEnd = end;
              $this.focus();

              break;
            }
          }
        }
      });

    });

  };
})( jQuery );
