require(['jquery', 'app/test'], function($, test) {

  $(document).ready(function() {

    $("html").removeClass("no-js").addClass("js");

    test.init();

  });

});