$(document).ready(function() {
  $('#select1 a.btn').click(function() {
    main(1, this);
    return false;
  });

  $('#select2 a.btn').click(function() {
    main(2, this);
    return false;
  });

  $('.btn-toggle').click(function(e) {
    $(this).parents('.canvas').toggleClass("flipped");
  });

  $('.btn-edit').click(function(e) {
    var $this = $(this);
    var id = $this.siblings('input').attr('class');
    var letter = $this.parent().find('input.' + id).val();

    if (letter.length === 1) {
      var targets = $this.parents('.canvas').find('p.' + id);
      targets.text(letter);
    }
  });

  $('figure.front').hover(function() {
    $(this).stop().animate({ backgroundColor: "#EEEEEE" }, 'slow');
  }, function() {
    $(this).stop().animate({ backgroundColor: "#FFFFFF" }, 'slow'); // original color
  });

  $("footer a").hover(function() { 
    $(this).stop().animate({ color: "#00B7FF" }, 'slow'); 
  }, function() { 
    $(this).stop().animate({ color: "#AAAAAA" }, 'slow'); // original color 
  });
});

function main(fid, context) {
  var 
  control,
  experiment,
  $this = $(context);

  if (fid === 1) {
    control = $('#control').val();
    experiment = $('#experiment').val();
  } else {
    control = $('#experiment').val();
    experiment = $('#control').val(); 
  }

  if (control.length < 1) {
    return;
  }

  // Display vs. Reset
  if ($this.text().toLowerCase() === "display") {
    $('#select' + fid).find('input').attr('disabled', true);
    $this.text("Hide"); 

    WebFont.load({
      google: {
        families: [control]
      }
    });

    displayAll(fid, control);
  } else {
    $('#select' + fid).find('input').attr('disabled', false);
    $this.text("Display");
    hideAll(fid);
  }
}

function displayAll(id, name) {
  $('.font' + id).each(function() {
    this.style.fontFamily = name;

    $(this).animate({
      opacity: 0.5
    }, 500);
  }); 

  if (!fontExists(name)) {
    alert("Font does not exist.");
  }
}

function hideAll(id) {
  $('.font' + id).animate({
    opacity: 0
  }, 500);
}

function fontExists(name) {
  var f1 = $('#fontcheck1')[0];
  var f2 = $('#fontcheck2')[0];

  f1.style.fontFamily = "monospace";
  f2.style.fontFamily = name + ",monospace";

  var w1 = Number(f1.offsetWidth);
  var w2 = Number(f2.offsetWidth);
  var h1 = Number(f1.offsetHeight);
  var h2 = Number(f2.offsetHeight);

  // first check if it would fall back to system default monospace
  if ((w1 === w2) && (h1 === h2)) {
    // second check (in case the input IS system default monospace) if it would 
    // fall back to Arial
    f1.style.fontFamily = "Arial";
    f2.style.fontFamily = name + ",Arial";
    
    if ((w1 === w2) && (h1 === h2)) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
