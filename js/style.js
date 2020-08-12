$(document).ready(function () {
  $('body').scrollspy({ target: ".navbar", offset: 50 });

  $('[data-toggle="tooltip"]').tooltip();

  $("#myNavbar a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });

  $.getJSON('data/project.json', function (data) {

    $('.project_list').html("");

    $.each(data, function (i, project) {

      let roles = "";
      $.each(project.role, function (i, role) {
        roles += '<li>' + role + '</li>';
      });

      let tools = "";
      $.each(project.tool, function (i, tool) {
        tools += '<a href="#" class="tool">' + tool + '</a> ';
      });

      $('.project_list').append(`

        <div class="col-sm-6">
          <div class="item">
      
            <div class="item-main" data-toggle="collapse" data-target="#project`+ project.id + `">
              <h3 class="item-title">`+ project.name + ` <small>(` + project.type + `)</small></h3>
              <i>~ `+ project.title + `</i>
        
              <div id="project`+ project.id + `" class="collapse">
                <p class="item-detail">`+ project.description + `</p>
                <label>My role:</label>
                <ul>`+ roles + `</ul>
              </div>
            </div>
        
            <div class="item-info">
              <span>Build with:</span>
              `+ tools + `
            </div>
        
          </div>
        </div>

      `);
    });

  });

});
