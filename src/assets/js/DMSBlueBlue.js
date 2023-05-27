/*!
 *
 * Name             : DMSBlueBlue
 * Version          : 0.16
 * Last Modified    : 10/10/2020
 *
 */

// Content resizable width
function sizing() {
    
 //   $(document).ready(function () {
        var windowHeight = $(window).height(),
            windowWidth = $(window).width(),
            headerHeight = $('nav.header').outerHeight(),
            itemsContentHeight = $('.items-content').outerHeight(),
            itemsLegendsHeight = $('.items-legends').outerHeight(),
            itemsFilterHeight = $('.items-filter').outerHeight(),
            mainContentHeight = $('.main-content').outerHeight(),
            nurseFilterHeight = $('.nurses-filter').outerHeight(),
            mainFilterHeight = $('.main-filter').outerHeight(),
            pageTitleHeight = $('.page-title').outerHeight(),
            footerHeight = $('.footer').outerHeight();

        $('.wrapper').outerHeight(windowHeight);
        
        $('.items-menu .items-links').outerHeight(itemsContentHeight - itemsFilterHeight - itemsLegendsHeight - 60);
       // console.log("windowHeight="+ windowHeight);
       // console.log("headerHeight="+ headerHeight);
      //  console.log("pageTitleHeight="+ pageTitleHeight);
      //  console.log("footerHeight="+ footerHeight);
        $('.real-content').outerHeight(windowHeight - headerHeight - pageTitleHeight - footerHeight);

    
   // });
};

// Left Menu
$(document).ready(function() {
    $('.left-main-link').click(function() {
        $(this).toggleClass('active');
        $(this).children('.glyphicon').toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
        $(this).children('.fas').toggleClass('fa-chevron-right fa-chevron-down');
        $(this).children('span:nth-child(1)').toggleClass('active');
        $(this).siblings('.sub-menu').slideToggle();
        if ($('.left-col,.items-menu,.right-content').hasClass('active')) {
            $('.left-col,.items-menu,.right-content').removeClass('active');
            $('.left-col .left-nav .left-block a span').fadeIn(300);
        }
        if (!$(this).siblings('.sub-menu').length) {
            $(this).parent('.left-block').siblings().children('.left-main-link').siblings('.sub-menu').children('a').removeClass('active');
        }
        $(this).parent('.left-block').siblings().children('.sub-menu').slideUp();
        $(this).parent('.left-block').siblings().children('.left-main-link').removeClass('active');
        $(this).parent('.left-block').siblings().children('.left-main-link').children('span:nth-child(1)').removeClass('active');
        $(this).parent('.left-block').siblings().children('.left-main-link').children('.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
        $(this).parent('.left-block').siblings().children('.left-main-link').children('.fas').removeClass('fa-chevron-down').addClass('fa-chevron-right');
    });
});
$(document).ready(function() {
    $('.sub-menu a').click(function() {
        $(this).toggleClass('active');
        $(this).siblings().removeClass('active');
        $(this).parent('.sub-menu').parent('.left-block').siblings().children('.left-main-link').siblings('.sub-menu').children('a').removeClass('active');
    });
    $('.navbar-toggle').on("click", function() {
        if ($('.left-col').hasClass('temp')) {
            $('.left-col').addClass('appear');
            $('.left-col').removeClass('temp');
            $('.left-col .left-nav .left-block a span:nth-child(2)').fadeIn(1);
            $('.left-col .left-nav .left-block a span:nth-child(3)').fadeIn(1);
        } else {
            $('.left-col').removeClass('appear');
            $('.left-col').addClass('temp');
        }

    });

    // Call Page filter collapse
    FilterCollapse();

    ModalFilterCollapse();
});


// Secondary Menu
$(document).ready(function () {

    $('.has-secondary-menu').click(function () {
        $(this).toggleClass('active');
        $(this).siblings('.has-secondary-menu').removeClass('active');
        var target = $(this).attr('data-menu-target');
        if ($('body').hasClass("show-menu")) {

            $('nav[data-menu-id]').addClass("hidden");
            $('nav[data-menu-id=' + target + ']').removeClass("hidden");

        } else {
            $('nav[data-menu-id=' + target + ']').removeClass("hidden");
            $('body').addClass("show-menu");
        }

    });
// close the menu element if the target it´s not the menu element or one of its descendants..
    $(window).click(function () {
        //Hide the menus if visible
        if ($('body').hasClass("show-menu")) {
            $('body').removeClass("show-menu");
            setTimeout(function () {
                $('nav[data-menu-id]').addClass("hidden");
            }, 500);

        }
    });

    $('.second-menu-wrap,.has-secondary-menu').click(function (event) {
        event.stopPropagation();
    });


    $('.second-menu a').click(function () {
        $('.second-menu a.active').removeClass('active');
        $(this).toggleClass('active');
        $('body').removeClass("show-menu");
        setTimeout(function () {
            $('nav[data-menu-id]').addClass("hidden");
        }, 500);


    });

});


// Page filter collapse Function
function FilterCollapse() {
    $('.page-title .filter-collapse-icon .glyphicon-chevron-up, .page-title .filter-collapse-icon .glyphicon-chevron-down,.page-title .filter-collapse-icon .fa-angle-up, .page-title .filter-collapse-icon .fa-angle-down').click(function () {
        $(this).toggleClass('glyphicon-chevron-down fa-angle-down glyphicon-chevron-up fa-angle-up');
        $(this).parent('.filter-collapse-icon').toggleClass('active');
        $('.page-title .filter-collapse').slideToggle();
        // setTimeout(function () {
        //   sizing();
        //}, 500)

        setInterval(function () {
           // sizing();
        }, 1);
    });

}
// Modal filter collapse
function ModalFilterCollapse() {
    $('.modal .filter-collapse-icon span').click(function () {
        $(this).toggleClass('glyphicon-chevron-down glyphicon-chevron-up fa-angle-up fa-angle-down');
        $(this).parent('.filter-collapse-icon').toggleClass('active');
        $(this).closest('.modal').find(".filter-collapse").slideToggle();
    });
}
// Modal filter collapse
function SimulateClick(target) {
    $(target).click();
}
// Row inline Editing Function
function InlineEditing(parent, mode) {

    //Editing
    if (parent.hasClass('editMode')) {
        //console.log("Save Mode");

        parent.find('.inline-edit').each(function(index, value) {

            var span = $(this).children("span.value");
            var text = $(this).find("input[type='text']");
            var textarea = $(this).find("textarea");
            var checkbox = $(this).find("input[type='checkbox']");
            var select = $(this).find("select");

            //console.log($(this));

            if (select.length) {
                var input = select;
                var value = input.val();
                if (value) {
                    span.text(value);
                } else {
                    span.text("");
                }

                //console.log("Select: "+ value);
            } else if (textarea.length) {
                var input = textarea;
                var value = input.val();
                span.text(value);
                //console.log("textarea: "+ value);
            } else if (text.length) {
                var input = text;
                var value = input.val();
                span.text(value);
                //console.log("input: "+ value);
            } else if (checkbox.length) {
                var input = checkbox;
                var value = input.val();
                //console.log("checkbox: "+ value);
                if (checkbox.is(':checked')) {
                    span.removeClass("glyphicon-remove")
                    span.addClass("glyphicon-ok")
                } else {
                    span.removeClass("glyphicon-ok")
                    span.addClass("glyphicon-remove")
                }
            }

        });

    }
    //Saving
    else if (parent.hasClass('liveMode')) {
        //console.log("Edit Mode");
        parent.find('.inline-edit').each(function(i) {
            var span        = $(this).children("span.value").text();
            var text        = $(this).children("input[type='text']");
            var textarea    = $(this).children("textarea");
            var checkbox    = $(this).children("input[type='checkbox']");
            var select      = $(this).children("select");

            //console.log($(this));

            if (select.length) {
                var input = select;
                if (span) {
                    input.val(span);
                } else {
                    input.val("");
                }

                //console.log("Select: "+ value);
            } else if (textarea.length) {
                var input = textarea;
                input.val(span);
                //console.log("textarea: "+ value);
            } else if (text.length) {
                var input = text;
                input.val(span);
                //console.log("input: "+ value);
            } else if (checkbox.length) {
                var input = checkbox;

                //console.log("checkbox: "+ value);
                if (span.hasClass("glyphicon-remove")) {
                    input.prop('checked', false);
                } else if (span.hasClass("glyphicon-ok")) {
                    input.prop('checked', true);
                }
            }

        });


    }
    parent.toggleClass("editMode liveMode");
}

// Data table Search
function showsearch(Me, e) {
    // alert(1);
    $(Me).parent().toggleClass("searching");
    $(Me).siblings("input,select").focus();
    $(Me).siblings("input,select").val("");
    $(Me).siblings("input,select").trigger("change");
    /*table.columns().search("" ).draw();*/
    disablesort(Me, e);
}

function disablesort(Me, e) {
    if (!e)
        e = window.event;

    //IE9 & Other Browsers
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    //IE8 and Lower
    else {
        e.cancelBubble = true;
    }
}
// Apply the search
function FilterDatatable(table) {
    var text    =   " <i class=\"fas fa-search\" onclick=\"showsearch(this)\"></i><input type=\"text\" class=\"form-control searchField\"  onclick=\"disablesort(this)\" />";
    var select  =   " <i class=\"fas fa-search\" onclick=\"showsearch(this)\"></i><select class=\"form-control searchField\" onclick=\"disablesort(this)\"><option value=\"\"></option></select>";
    var select2 =   " <i class=\"fas fa-search\" onclick=\"showsearch(this)\"></i><select class=\"form-control single-select searchField\" onclick=\"disablesort(this)\"><option value=\"\"></option></select>";

    $(table.table().header()).find( '.searchableTh' ).each(function(index, value){
        var searchtype = $(this).data('searchtype');
        //alert(searchtype);
        var that       = this;
        if (searchtype === 'text') {
            $(this).append(text);

        }
        else if(searchtype === 'select'){
            $(this).append(select);
            table.column( this ).cache( 'search' ).sort().unique().sort().each( function ( d, j ) {
                if(d !== ""){
                    $(that).find('select').append( '<option value="'+d+'">'+d+'</option>' )
                }

            } );

        }

    });



    table.columns().every(function () {
        var that = this;

        $('input', this.header()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });

        $('select', this.header()).on('change', function () {

            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });

    });
}


// popup position calculator
function popupPosition(element, holder) {
    if (holder === undefined) {
        holder = $(element).siblings("a").first();
    }
    var position = $(holder).offset(),
        element_width = $(element).outerWidth(true),
        element_height = $(element).outerHeight(true),
        holder_width = $(holder).outerWidth(true),
        holder_height = $(holder).outerHeight(true),
        winWidth = $(document).width(),
        winHeight = $(document).height(),
        safeLeft = winWidth - element_width - holder_width,
        safeTop = winHeight - element_height - holder_height,
        left = position.left , //add 50px for unknown reason 30/04/2020 Elgarhy PCY App
        right = (winWidth - (left + holder_width)),
        top = position.top + holder_height,
        bottom = winHeight - top + holder_height;

    //console.log(", left: " + left + " ,safeLeft: " + safeLeft + " ,right: " + right + " ,top: " + top + " ,safeTop: " + safeTop + " ,bottom: " + bottom);
    //console.log("(element_width: " + element_width + "), (element_height: " + element_height + "), (holder_width: " + holder_width + "), (holder_height: " + holder_height + "), (winWidth: " + winWidth + "), (winHeight: " + winHeight + "), (safeLeft: " + safeLeft + "), (safeTop: " + safeTop + "), (left: " + left + "), (right: " + right + "), (top: " + top + "), (bottom: " + bottom + ")");
    $(element).attr("style", "");
    $(element).css({ "z-index": "2", "position": "fixed" });

    if (left < safeLeft) {
        //console.log("safeLeft");
        $(element).css({ "left": left, "right": "auto" });
    } else {
        //console.log("Not safeLeft");
        $(element).css({ "left": "auto", "right": right });
    }
    if (top < safeTop) {
        //console.log("safeTop");
        $(element).css({ "top": top });

    } else {
        //console.log("Not safeTop");
        $(element).css({ "top": "auto", "bottom": bottom });
    };
};

function dataTablizer(table){
    var dom             = table.data('dom'),
        colReorder      = table.data('colreorder'),
        paging          = table.data('paging'),
        pageLength      = table.data('pagelength'),
        ordering        = table.data('ordering'),
        nonOrderable    = table.data('nonorderable');//No Order Class
    //nonOrderable    = $.parseJSON(table.attr('data-nonorderable'));

    if (dom === undefined) {dom = 'rtlip';}
    if (colReorder === undefined) {colReorder = true;}
    if (paging === undefined) {paging = false;}
    if (pageLength === undefined) {pageLength = 10;}
    if (ordering === undefined) {ordering = true;}
    if (nonOrderable === undefined) {nonOrderable = 'nonorderable';}
    //Hide Pagination if not rows are less or equal to item per page
    if (paging) {
        var rows = table.find('tbody').find('tr').length;

        if (rows <= parseInt(pageLength)) {
            dom = dom.replace('p', '').replace('l', '');

        }
    }
    var tabelizedTable = $(table).DataTable({
        dom             : dom,
        "stripeClasses" : [],
        pagingType      : "full_numbers",
        lengthMenu      : [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        colReorder      : colReorder,
        paging          : paging,
        pageLength      : pageLength,
        ordering        : ordering,
        order           : [],
        bDestroy        : true,
        info            : false,
        "autoWidth": false,
        'columnDefs': [ {
            'targets': nonOrderable,
            'orderable': false
        }]
    });
    return tabelizedTable
}

$(document).ready(function() {
    $('.autoDataTablized').each(function() {
        var autoTabalized = dataTablizer($(this));
        FilterDatatable(autoTabalized);
    });
});


//
$(document).ready(function() {
    $(".modal-wide").on("show.bs.modal", function() {
        var height = $(window).height() - 200;
        $(this).find(".modal-body").css("max-height", height);
    });


});

//callout
$(document).ready(function() {
    $('body').on('click', '.callout button.close', function () {
        $(this).closest('.callout').slideUp();

    });
});

//
$(document).ready(function() {



});
