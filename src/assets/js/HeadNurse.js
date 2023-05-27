//********************************
//          Home Page
//********************************

$(document).ready(function () {
    //***Notification & Messages
    //***************************
    $('#1.notification').click(function () {
        $('.dropdown-menu').slideUp();
        $('#2.alert-view').slideToggle();
    });


    $(".multi-select").chosen({
        width: "100%",
        rtl: false,
        no_results_text: "Oops, nothing found!",
        disable_search_threshold: 1,
        allow_single_deselect: true,
    });

    $(".single-select").chosen({
        width: "100%",
        rtl: false,
        no_results_text: "Oops, nothing found!",
        max_selected_options: 1,
        disable_search_threshold: 1,
        allow_single_deselect: true,
    });


    tablewidth = $('.panel-nurse .table').width();
    $('#tableheadcol col').outerWidth(tablewidth / 2);
    console.log(tablewidth);

    $('#action-menu .menu-main-link').click(function (e) {
        if ($(this).hasClass('disabled')) {
           // e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        } else {
            $(this).addClass('active');
            $(this).children('.glyphicon').toggleClass('glyphicon-chevron-right glyphicon-chevron-down');

            //added slide toggle setting to scroll the page down to see whats is opened
            $(this).siblings('.sub-menu').slideToggle("slow", "swing", function () {

                if ($(this).parents().hasClass('active')) {

                    $('.left-col').animate({
                        scrollTop: $(this).offset().top
                    }, 250);
                }
            });

            $(this).parent('.menu-block').siblings().children('.sub-menu').slideUp();
            $(this).parent('.menu-block').siblings().children('.menu-main-link').removeClass('active');
            $(this).parent('.menu-block').siblings().children('.menu-main-link').children('.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
        }
        });

});

//********************************
//          menu toggle
//********************************

$(document).ready(function () {
// get original names
var listOfNewNames = [];
var listOfNames = $('.menu-main-link');

listOfNames.each(function (index) {
    listOfNewNames[index] = $(this).html();
});

// menu toggle
$('.menu-toggle').click(function () {
    //        $(".main-menu").niceScroll();
    $('.left-col, .right-content').toggleClass('active');
    if ($('.left-col').hasClass('active')) {
        listOfNames.each(function (index) {
            var finalWord = '';
            var arr = $(this).text();
            var words = arr.split(' ');
            if (words.length == 1) {
                finalWord += words[0].substr(0, 1);
                finalWord += words[0].substr(1, 1).toLowerCase() + '.';

            } else {
                if (words.length > 1) {
                    for (i = 0; i < words.length; i++) {
                        finalWord += words[i].substr(0, 1) + '.';
                    }
                }
            }
            $(this).text(finalWord);
        });
    } else {
        listOfNames.each(function (index) {
            $(this).html(listOfNewNames[index]);
        });
    }
    $('.left-col .main-menu .sub-menu').slideUp();
});

// has sub
$('.left-col .main-menu .has-sub').click(function () {
    if ($('.left-col').hasClass('active')) {
        listOfNames.each(function (index) {
            $(this).html(listOfNewNames[index]);
        });
    }
    $('.left-col,.right-content').removeClass('active');
});
});
//********************************
//          Careplane Page
//********************************

$(document).ready(function () {
      /*****************template buttons click added by marwa***************/
    $(".real-content").on("click", ".add-templt", function (event) {
        if ($(this).siblings('.repetitive-select.loadTemplate').hasClass("open")) {
            $(this).siblings('.repetitive-select.loadTemplate').removeClass("open");
        }
        if ($(this).siblings('.repetitive-select.addTemplate').hasClass("open")) {
            $(this).siblings('.repetitive-select.addTemplate').removeClass("open");
        } else {
            $(".repetitive-select.addTemplate.open").removeClass("open");
            $(this).siblings('.repetitive-select.addTemplate').addClass("open");
        }
        //$(this).siblings('.repetitive-select').toggleClass("open");
    });
    $(".real-content").on("click", ".repetitive-select.addTemplate .btn.saveTemplate", function (event) {
        //savetemplate
        $(this).parent().removeClass("open");
    });
    $(".real-content").on("click", ".load-templt", function (event) {
        if ($(this).siblings('.repetitive-select.addTemplate').hasClass("open")) {
            $(this).siblings('.repetitive-select.addTemplate').removeClass("open");
        }
        if ($(this).siblings('.repetitive-select.loadTemplate').hasClass("open")) {
            $(this).siblings('.repetitive-select.loadTemplate').removeClass("open");
        } else {
            $(".repetitive-select.loadTemplate.open").removeClass("open");
            $(this).siblings('.repetitive-select.loadTemplate').addClass("open");
            //call ajax function Load Templates
            LoadSavedTemplates();
        }
        //$(this).siblings('.repetitive-select').toggleClass("open");
    });
    $(".real-content").on("click", ".repetitive-select.loadTemplate .btn.loadTemplate", function (event) {
        //savetemplate
        $(this).parent().removeClass("open");
    });
    /****************END OF UPDATED CODE***************************/

    //show care plane repetitive selection div
    $(".real-content").on("click", ".repetitive-dropdown", function (event) {

        if ($(this).siblings('.repetitive-select').hasClass("open")) {
            $(this).siblings('.repetitive-select').removeClass("open");
        } else {
            $(".repetitive-select.open").removeClass("open");
            $(this).siblings('.repetitive-select').addClass("open");
        }

        //$(this).siblings('.repetitive-select').toggleClass("open");


    });

    //hide care plane repetitive selection div when clicked outside
    $(document).mouseup(function (e) {
        var repetitiveContainer = $(".repetitive-container");
        var repetitiveSelect = $(".repetitive-select.open");
        // if the target of the click isn't the container nor a descendant of the container
        if (!repetitiveContainer.is(e.target) && repetitiveContainer.has(e.target).length === 0) {
            repetitiveSelect.removeClass("open");
        }

    });

    //Repetitive & Once
    $(".real-content").on("click", ".repetitive-select .btn.makeOnce", function (event) {

        $(this).parent().find("select").prop('selectedIndex', 0);
        $(this).parent().find("input").val('');
        $(this).parent().removeClass("open");
        $(this).parent().parent().addClass("once");
        $(this).parent().parent().removeClass("repetitive");
    });

    $(".real-content").on("click", ".repetitive-select .btn.makeRepetitive", function (event) {

        $(this).parent().removeClass("open");
        $(this).parent().parent().removeClass("once");
        $(this).parent().parent().addClass("repetitive");
    });

    //$(".real-content").on("click", ".evaluate", function (event) {
    //    $("#evaluateModal").modal('show');
    //});
    $(".real-content").on("click", ".careplan .save-careplan", function (event) {

        var careplan = $(this).closest('.careplan');

        InlineEditing(careplan);
    });




    //delete care plan parts
    $(".real-content").on("click", ".delete", function (event) {
        var target = "." + $(this).attr('data-target') + "-item";
        $(this).closest(target).remove();
    });

    //add care plan parts
    $(".real-content").on("click", ".add-new", function (event) {
        //var y = $(this).parent().siblings(".goal-item").last(".form-control").val();
        //alert(event.target.val  );
        var item = $(this).parent().siblings(":visible").last().find('textarea').val();
        if (item == "" || item == 'undefined') {

        }
        else {
            var newItem = $(this).parent().siblings(".new");

            var newItemContent = newItem.clone();

            newItemContent.removeClass("new");
            newItem.before(newItemContent);

            if ($(this).parent().siblings().hasClass("interventions-item")) {
                //console.log("interventions");

            } else if ($(this).parent().siblings().hasClass("goal-item")) {
                //console.log("goal");
            }
        }


    });
    //to scroll the page down to the opened nurse panel  disabled after a problem
    /*$('.real-content').on('shown.bs.collapse', '.panel-body', function () {
        var $panel = $(this).closest('.panel');
        var panelTopValue = $panel.offset().top - 100
        console.log($(this));
        console.log($(this));
        $('.real-content').animate({
            scrollTop: panelTopValue
        });
    });*/


    // Page filter collapse


    function FilterCollapse() {

        $('.real-content').on('click', '.page-title .filter-collapse-icon .glyphicon-chevron-up', function () {
            $(this).toggleClass('glyphicon-chevron-down');
            $(this).parent('.filter-collapse-icon').toggleClass('active');
            $('.page-title .filter-collapse').slideToggle();
            // setTimeout(function () {
            //   sizing();
            //}, 500)

            setInterval(function () {
                sizing();
            }, 1);
        });

    }
    FilterCollapse();


});
function LoadSavedTemplates()
{
    $.ajax({
        type: 'Get',
        url: SiteRoot + "CarePlanTemplt/GetSavedTemplates",
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            $(".TemplateDropList").empty();
            $.each(data, function (i, item) {
               // var o =
                //$(o).html("option text");
                    $(".TemplateDropList").append(new Option(item.TemplateName, item.TemplateId));
            });
        },
        error: function (result) {
            // alert(result.statusText);
            $(".alert").addClass('alert-danger');
            $('#MsgResult').html('Fail to Load templates!');
            msgShow("MsgResult", true);
        },
        complete: function () {
            //do something
        }
    });
}



////////////////////// added by mahmoud
/// FixedHeader
function FixedHeader() {

    // debugger;
    if ($('.grid').find('tbody tr').length == 0) {
        $('.grid-container').css("overflow", "auto");
        $('.grid-container2').css("overflow", "auto");
        $('.grid-container3').css("overflow", "auto");
        // ch();
        return;
    }

    //$('.grid').fixedHeaderTable({ autoShow: false });
    // $('.grid').fixedHeaderTable('show');

    $('.fht-thead table').attr('cellpadding', '0');
    $('.fht-thead table').attr('cellspacing', '0');

    //   ch();
}

////////// Search in Grid Created By kemo //////

function SearchHeader(Arr, num, URL, j, Namegrid) {

    if (Arr == null) { Arr = []; };
    var idData;
    var ColumName;
    var i = j;
    var value = "";
    var Header;
    if (!$("#" + Namegrid + " thead tr th:eq(" + i + ")").children().hasClass("Img" + i)) {
        $("#" + Namegrid + " thead tr th").each(function () {
            //Header = "<img src= '" + SiteRoot + "images/search-icon.png'   class='IMGIcon Img" + i + "' alt ='Search' width='15' height='14'>";
            Header = "<span class='glyphicon glyphicon-search IMGIcon Img" + i + "'></span>";

            $("#" + Namegrid + " thead tr th:eq(" + i + ")").append(Header);
            $("#" + Namegrid + " thead tr th:eq(" + i + ")").append("<br>");

            if (Arr[i] == undefined) { Arr.push(""); value = ""; }
            else { value = Arr[i]; }

            $("#" + Namegrid + " thead tr th:eq(" + i + ")").append(" <div class='search-form left clear" + i + "' > <input type='text'   class='txt_search search" + i + "'  value='" + value + "'   /><div class='clear-search searchicon" + i + "'>x</div> </div>");

            if ($(".search" + i).val() == "") {
                $(".clear" + i).hide();
                $(".searchicon" + i).css("display", "none");
            }


            ///////////  When User Click On Icon Search
            $(".IMGIcon.Img" + i).click(function () {

                var ClassName = $(this).parents('th:first').find(".IMGIcon").attr('class'); //// retrieve class Name

                ///////// Find Index Of  class Search ////////
                var Index = FindIndex(ClassName);
                var i = 0;
                ///////////////// Close any text is Open  ////////
                $(this).parents('th').siblings().each(function () {

                    if (i != Index) {
                        $(".clear" + i).css("display", "none");
                    }
                    i++;
                });
                ////////////////////////// End ////////////////////////

                //////////////////////////////////////// Open Text depend on User Click  ////////////
                $(this).parents('th:first').find(".clear" + Index).fadeToggle();
                $(".search" + Index).focus();

                ////////////    When User enter Any Character
                $(".txt_search").keyup(function () {
                    Search(0, this, j);
                });
            });
            i++;


        });



    }



    function Search(type, Me, StartIndexwithSearch) {
        if (StartIndexwithSearch == 2) {
            StartIndexwithSearch = 1; // i changed this flag becuse in invistgation not working search mahmoud eid
        }
        var ClassName = $(Me).parents('th:first').find(".clear-search").attr('class'); /// Retrieve Class Name
        idData = $(Me).val();
        ///////// Find Index Of  class Search
        var Index = FindIndex(ClassName);

        ///// End ////
        var data = $(Me).parents('th:first').find(".search" + Index).val();
        ///  Find colum Name is the same name in property of list

        ColumName = $(Me).parents('th:first').find('a').attr('href');
        ColumName = FindColumName(ColumName);
        /////   End ////////
        var val1 = parseInt(Index, 10);
        var val2 = parseInt(StartIndexwithSearch, 10);
        var ColumnIndex = ((val1 + val2));// parseInt(Index, 10) + parseInt(StartIndexwithSearch, 10);
        $('#' + Namegrid + ' tbody tr td:nth-child(' + ColumnIndex + ')').each(function () {
            if ($(this).text().toLowerCase().indexOf(idData.toLocaleLowerCase()) >= 0 || idData.trim() == "") {
                $(this).closest('tr').show();

            }
            else { $(this).closest('tr').hide(); }
        });
        if (idData != "" && idData != undefined && type != "1") {

            //Header = "<img src= '" + SiteRoot + "images/search-active-icon.png'  title ='( " + idData + " )" + "' class='IMGIcon Img" + Index + "' alt ='Search' width='15' height='14'>";
            Header = "<span class='glyphicon glyphicon-search IMGIcon Img" + Index + "' title='( " + idData + " )" + "'></span>";
        }
        else {
            //Header = "<img src= '" + SiteRoot + "images/search-icon.png'   class='IMGIcon Img" + Index + "' alt ='Search' width='15' height='14'>";
            Header = "<span class='glyphicon glyphicon-search IMGIcon Img" + Index + "'></span>";
        }


        $("#" + Namegrid + " thead tr th:eq(" + Index + ")").find('.IMGIcon.Img' + Index).replaceWith(Header);

        if ($(".search" + Index).val() == "") {
            // $(".clear" + Index).hide();
            $(".searchicon" + Index).css("display", "none");
        }
        else {

            $(".searchicon" + Index).css("display", "block");
            if (type == "1") {
                $(".search" + Index).val("");
                //$(".searchicon" + Index).css("display", "none");
            }
            var html = $(".search" + Index).val();
            $(".search" + Index).focus().val("").val(html);

        }
        ///////////   When User click on Symbol X To clear Text
        $(".clear-search").click(function () {

            Search(1, this, j);
        });
        ///////////  When User Click On Icon Search
        $(".IMGIcon.Img" + Index).click(function () {

            var ClassName = $(this).parents('th:first').find(".IMGIcon").attr('class'); //// retrieve class Name
            ///////// Find Index Of  class Search ////////
            var Index = FindIndex(ClassName);
            var i = 0;
            ///////////////// Close any text is Open  ////////
            $(this).parents('th').siblings().each(function () {

                if (i != Index) {
                    $(".clear" + i).css("display", "none");
                }
                i++;
            });
            ////////////////////////// End ////////////////////////
            //////////////////////////////////////// Open Text depend on User Click  ////////////
            $(this).parents('th:first').find(".clear" + Index).fadeToggle();
            $(".search" + Index).focus();



        });

    }

    ///  Find Index Of  class Search
    function FindIndex(ClassName) {
        var intRegex = /^\d+$/;
        var Ind = ClassName.substr(ClassName.length - 2);
        var Ind1 = ClassName.substr(ClassName.length - 1);
        var Index = "";
        if (intRegex.test(Ind)) { Index = Ind; }
        else { Index = Ind1; }
        return Index;
    }
    ///  Find colum Name With the same name of property
    function FindColumName(ColumName) {
        var index1 = ColumName.lastIndexOf("sort=");
        var index2 = ColumName.lastIndexOf("&sortdir");
        ColumName = ColumName.substring(index1 + 5, index2);
        return ColumName;
    }
};


////GridMode
function ColorGrid() {

    // alert('Color');

    $(".grid tr").each(function () {

        var Status = $(this).find("label#Status").html();
        //  alert(Status);

        if (Status == undefined) return;

        if (Status.trim() == "Cancel" || Status.trim() == "Canceled" || Status.trim() == "Rejected") {

            $(this).addClass("cancel");
        }
        if (Status.trim() == "InActive" || Status.trim() == "Inactive") {
            $(this).addClass("InActive");

        }

    });

    hideEdit();
}

function hideEdit() {

    var numItems = $('.grid div.hidden').length;

    if (numItems > 0) {
        // alert('hide');
        $('.grid th:nth-child(1)').hide();
        $('.grid td:nth-child(1)').hide();

        $('.grid td:nth-child(2)').css("border-left", "0 !important");
        $('.grid th:nth-child(2)').css("border", "0 !important");

        /*.grid td:first-child{
            border-left:0 !important;
        }

        .grid th:first-child{
            border:0 !important;
        }*/


    }

}
////GridZoom
function gridZoom() {



    $('.gridInfo').click(function () {
        var Data = $(this).parent().find('.gridAllInfo').attr("data-All");
        // alert($(this).parent().find('.gridAllInfo').html());

        $('#Dialog p').html(Data);
        $('#Dialog').show();
        $('#overlay').fadeIn('fast', function () {

        });
    });
    $('#boxclose').click(function () {
        //   debugger;
        $('#overlay').fadeOut('fast');
        $('#Dialog').hide();
        $('#SearchPopup').html("");

    });


}

////Assign Nurse
$(document).ready(function(){

    $('.nurse-select').each(function (index, value) {
        var select          = $(this);
        var data            = [];

        select.find('option').each(function(index,element){
            var option          = $(this);
            var id              = option.attr('value');
            var name            = option.text();
            var workLoad        = option.attr('data-workLoad');
            var patients        = option.attr('data-patients');
            var percentage      = option.attr('data-percentage');
            var progressClass   = option.attr('data-progressClass');

            var html    = name + ' <div class="info"><span class="nurse-patient mt-5 mb-5 left">'+ patients +' <i class="fas fa-user"></i></span>  <span class="nurse-time mt-5 mb-5 right">'+ workLoad +' <i class="far fa-clock"></i></span></div>\n' +
                '                                            <div class="progress clear">\n' +
                '                                                <div class="progress-bar '+ progressClass +' progress-bar-striped" role="progressbar" aria-valuenow="'+ percentage +'" aria-valuemin="0" aria-valuemax="100" style="width:'+ percentage +'%">\n' +
                '                                                    <span class="sr-only">'+ percentage +'%</span>\n' +
                '                                                </div>\n' +
                '                                            </div>';
            data.push( {id: id , text: name , html: html});
        });

        select.select2({
            allowClear: true,
            placeholder: "Select a Nurse",

            width: '100%',
            data: data,
            escapeMarkup: function(markup) {
                return markup;
            },
            templateResult: function(data) {
                return data.html;
            },
            templateSelection: function(data) {
                return data.html;
            }
        });

    });



});
