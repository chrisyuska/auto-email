(function( $ ){

  $.fn.autoEmail = function( domains, multi ) {

    return this.each(function() {

      var $this = $(this);
      var len;
      var domain = domains[0];

      // check for autocomplete after each key
      $this.keypress(function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;

        // FireFox needs you to watch for action keys (arrows, tab, etc.)
        var protectedKeyCodes = [8,9,17,18,35,36,37,38,39,40,45];
        if(protectedKeyCodes.indexOf(keyCode)>=0) {
          return;
        }

        e.preventDefault();

        // save selection start for later
        var selStart = $(this)[0].selectionStart;
        var selEnd = $(this)[0].selectionEnd;
        len = $(this).val().length;

        // add separator with space comma after completion key space is pressed
        // comma, semicolon, and enter are valid completion keys
        if (/^(13|44|59)$/.test(""+keyCode)) {
          // if multi-enabled, separate emails with a separator
          if (multi) {
            var separator;
            if (selStart != selEnd) {
              // user is autocompleting, so pad separator
              if (keyCode == 59) {
                separator = "; ";
              } else {
                separator = ", ";
              }
            } else if (keyCode != 13) {
              // user is just typing another separator; don't fight it
              separator = String.fromCharCode(keyCode);
            }

            // insert separator if it exists
            if (separator != null) {
              $this.val($this.val().substr(0, selEnd) + separator + $this.val().substr(selEnd, $this.val().length));
            }
          }

          // move cursor
          $this[0].selectionStart = selEnd + ($this.val().length - len);
          $this[0].selectionEnd = selEnd + ($this.val().length - len);

          return;
        }

        // replace selection range with typed character
        $this.val($this.val().substr(0, selStart) + String.fromCharCode(keyCode) + $this.val().substr(selEnd, $this.val().length));
        len = $(this).val().length - len;

        // fix selection
        $this[0].selectionStart = ++selStart;
        $this[0].selectionEnd = selEnd + len;

        // get substring to try appending with autocomplete email
        var emailsDirty = $(this).val().substr(0, selStart).split("@");
        if (emailsDirty.length < 2 || emailsDirty[0] == "") {
          return;
        }
        var emailDomain = emailsDirty[emailsDirty.length - 1];

        // get all possible domain matches
        var matches = $.grep(domains, function(el, index) {
          // First part of emailDomain should match first part of domain
          return emailDomain === el.substr(0, emailDomain.length);
        });

        if (matches.length > 0) {
          // take first domain match for autocomplete
          var subStr = matches[0].substr(emailDomain.length, matches[0].length);
          $this.val($this.val().substr(0, selStart) + subStr + $this.val().substr(selStart, $this.val().length));

          // highlight autocompleted text
          $this[0].selectionStart = selStart;
          $this[0].selectionEnd = selStart + subStr.length;
        }

      });

    });

  };

})( jQuery );
