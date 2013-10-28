(function( $ ){

  $.fn.autoEmail = function( domains ) {

    return this.each(function() {

     var $this = $(this);
     var len;

      //check for autocomplete after each key
      $this.keypress(function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        // FireFox needs you to watch for action keys (arrows, tab, etc.)
        var protectedKeyCodes = [8,9,13,17,18,35,36,37,38,39,40,45,46];
        if(protectedKeyCodes.indexOf(keyCode)>=0) {
          console.log('here');
          return;
        }
        e.preventDefault();
        //save selection start for later
        var selStart = $(this)[0].selectionStart;
        var selEnd = $(this)[0].selectionEnd;
        len = $(this).val().length;

        //replace selection range with typed character
        $(this).val($(this).val().substring(0,$(this)[0].selectionStart) + String.fromCharCode(keyCode) + $(this).val().substring($(this)[0].selectionEnd, $(this).val().length));
        len = $(this).val().length - len;
        //fix selection
        $this[0].selectionStart = selStart + 1;
        $this[0].selectionEnd = selEnd + len;

        var email = $(this).val().trim();
        len = email.length;
        var myDomainArray = email.split("@");
        if (len <= 1  || myDomainArray.length !== 2 || myDomainArray[0] === "") {
          return;
        }
        var myDomain = myDomainArray[myDomainArray.length - 1];
        var matches = $.grep(domains, function(el, index) {
          // First part of myDomain should match first part of domain
          return myDomain === el.substr(0, myDomain.length);
        });
        if (matches.length > 0) {
          email = myDomainArray[0] + "@" + matches[0];
          $this.val(email);
          var start = $this.val().length - email.length + len;
          var end = $this.val().length;

          //highlight autocompleted text
          $this[0].selectionStart = start;
          $this[0].selectionEnd = end;
          $this.focus();
        }
      });

    });

  };
})( jQuery );
