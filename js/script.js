$(document).ready(function () {

    $('body').scrollspy({ target: ".navbar", offset: 50 });

    $('[data-toggle="tooltip"]').tooltip();

    $("#myNavbar a").on('click', function (event) {
        if (this.hash !== "") {
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
            event.preventDefault();
        }
    });

    $.getJSON('data/skill.json', function (data) {
        $('.experience_list').html("");
        var experience = data.experience;
        $.each(experience, function (i, skill) {
            $('.experience_list').append(`
                <div class="col-sm-3">
                    <img src="` + skill.url + `" alt="` + skill.label + `">
                    <p>`+ skill.label + `</p>
                </div>
            `);
        });

        $('.knowledge_list').html("");
        var knowledge = data.knowledge;
        $.each(knowledge, function (i, skill) {
            $('.knowledge_list').append(`
                <div class="col-sm-3">
                    <img src="` + skill.url + `" alt="` + skill.label + `">
                    <p>`+ skill.label + `</p>
                </div>
            `);
        });
    });

    function loopProject(projects) {
        $.each(projects, function (i, project) {

            var roles = "";
            $.each(project.role, function (i, role) {
                roles += '<li>' + role + '</li>';
            });

            var tools = "";
            $.each(project.tool, function (i, tool) {
                tools += '<span class="tool">' + tool + '</span> ';
            });

            var sufix = i % 2;

            $('.list-' + sufix).append(`
    
                <div class="item">
                
                    <div class="item-main" data-toggle="collapse" data-target="#project`+ project.id + `">
                        <i class="fas fa-angle-down fa-2x pull-right" style="color: #bbb"></i>
                        <h3 class="item-title">`+ project.name + ` <small>(` + project.type + `)</small></h3>

                        <i>`+ project.title + `</i>

                        <div id="project`+ project.id + `" class="collapse out">
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
  
            `);
        });
    }

    $.getJSON('data/project.json', function (data) {
        $('.project_list').html("");

        var company_project = data.company;
        loopProject(company_project);

        var personal_project = data.personal;
        loopProject(personal_project);
    });

});
