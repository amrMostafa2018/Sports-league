/************************        menu toggle      **************************/
$(document).ready(function() {
    $('.menu-toggle').click(function() {
        $('.left-col,.right-content').toggleClass('active');
        if ($('.left-col').hasClass('active')) {
            $('.left-col .left-nav .left-block a span:nth-child(2)').fadeOut(300);
            $('.left-col .left-nav .left-block a span:nth-child(3)').fadeOut(300);
            $('.left-main-link.active').siblings('.sub-menu').slideUp();
        } else {
            $('.left-col .left-nav .left-block a span:nth-child(2)').fadeIn(300);
            $('.left-col .left-nav .left-block a span:nth-child(3)').fadeIn(300);
            $('.left-main-link.active').siblings('.sub-menu').slideDown();
        }
    });
});


$(document).ready(function(){
    // patients panel filter
    $('.icon-filter-bar ul li').on("click", function() {
        $(this).toggleClass('active');
    });
    // Collapse patients panel
    $('.patient-panel .panel-header').on("click", function() {
        if($(this).find(".fas").hasClass("fa-angle-down")){
            $(this).find(".fas").removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this).closest('.patient-panel').find(".panel-list").collapse('show');
        }else{
            $(this).find(".fas").addClass("fa-angle-down").removeClass("fa-angle-up");
            $(this).closest('.patient-panel').find(".panel-list").collapse('hide');
        }
    });
    // patients panel
    $('.patient-panel .panel-item').on("click", function() {
        $('.patient-panel .panel-item').removeClass('active');
        $(this).addClass('active');
    });

    // open model when drop panel list
    // $(".patient-panel .panel-list").sortable({
    //     receive: function (event, ui) {
    //         $("#transferToTriage").modal("show");
    //     }
    // });
    //datapicker
    $(document).on("click", ".datepicker1", function () {
        $(this).datepicker({
                changeMonth: true,
                changeYear: true,
            });
    });
    // dynamic datapicker rang
    $("body").on("click", ".from", function () {
        if (!$(this).hasClass("hasDatepicker")) {
            $(this)
                .datepicker({
                    dateFormat: "dd/mm/yy",
                    numberOfMonths: 1,
                    defaultDate: "+1w",
                    changeMonth: true,
                    changeYear: true,
                    onSelect: function (selected) {
                        $(".to").datepicker("option", "minDate", selected);
                    }
                })
                .datepicker("show");
        }
    });
    $("body").on("click", ".to", function () {
        if (!$(this).hasClass("hasDatepicker")) {
            $(this)
                .datepicker({
                    dateFormat: "dd/mm/yy",
                    numberOfMonths: 1,
                    defaultDate: "+1w",
                    changeMonth: true,
                    changeYear: true,
                    onSelect: function (selected) {
                        $(".from").datepicker("option", "maxDate", selected);
                    }
                })
                .datepicker("show");
        }
    });
    /*
// datetimepicker
    $(".datetimepicker").datetimepicker({
        timeFormat: "hh:mm tt",
        controlType: 'select',
        oneLine: true,
    });*/
});
//
$(document).ready(function () {
    // select2
    $(".chosen-single").select2({
        width: "100%",
        allowClear: true,
        placeholder: function(){
            $(this).data('placeholder');
        }
    });
    // select2 multiselection
    $(".chosen-multiple").select2({
        width: "100%",
        multiple: true,
        dropdownAutoWidth: true,
        allowClear: true,
        closeOnSelect: false,
        tags: false
    });
    // result of selected items
    // $('.chosen-multiple').on('select2:close', function(evt) {
    //     var uldiv = $(this).siblings('span.select2').find('ul')
    //     var count = uldiv.find('li').length - 1;
    //     uldiv.html("<li>" + count +" items selected</li>")
    // });

    /*
    // DataTable Set Default Parameters
    $.extend(true, $.fn.dataTable.defaults, {
        fixedHeader: false,
        dom: "rtlip",
        pagingType: "full_numbers",
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        colReorder: true,
        paging: false,
        ordering: true,
        order: [],
        info: false,
        fixedColumns: false,
    });*/

    // action-box selected
    $(document).on("click", ".action-box a", function () {
        $(this).toggleClass("selected");
        $('.action-box a').not(this).removeClass('selected');
    });
// remove action box selected when close modal footer
    $(document).on("click", ".modal-footer .btnclose", function () {
        $('.action-box a').removeClass('selected');
    });
    // basedOn table based-Frequency based-indicators
    $(document).on("change", '#patient-status', function () {

        if (this.value == 'immediate') {
            $(".patient-status").removeClass("orange yellow green blue");
            $(".patient-status").addClass("red");
        };
        if (this.value == 'very-urgent') {
            $(".patient-status").removeClass("red yellow green blue");
            $(".patient-status").addClass("orange");
        };
        if (this.value == 'urgent') {
            $(".patient-status").removeClass("red orange green blue");
            $(".patient-status").addClass("yellow");
        };
        if (this.value == 'standard') {
            $(".patient-status").removeClass("red orange yellow blue");
            $(".patient-status").addClass("green");
        };
        if (this.value == 'no-urgent') {
            $(".patient-status").removeClass("red orange yellow green");
            $(".patient-status").addClass("blue");
        };
    });
    // add btn change
    $(".add-new").click(function () {
        var target = "#" + $(this).attr("data-target");
        $(target).toggleClass("in");
        $(this).children("span").toggleClass("glyphicon-plus glyphicon-minus");
        sizing();
    });
});
// Edit/Save Row
$(document).ready(function () {
    // Row inline editing
    $(document).on("click", ".row-inline-edit", function () {
        rowInlineEditing($(this).closest("tr"));
        // console.log($(this).closest('tr'));
    });

    // Row inline Save After Adding
    $(document).on('click', '.row-inline-add', function () {
        $('.addRow').show();
        var newRow = $(this).parent().parent();
        var oldRow = newRow.prev();
        rowInlineEditing(newRow);
        var newRowcontent = newRow.clone();
        newRowcontent.removeClass("new-row new-room active").children().removeClass("active").first().children(".row-inline-add").removeClass("row-inline-add").addClass("row-inline-edit");
        //newRowcontent.find(".chosen-container").remove();
        //newRowcontent.find(".chosen ").attr('style', '').removeClass('active');
        newRow.before(newRowcontent);
        newRow.removeClass("active main").children().first().children(".glyphicon-pencil.row-inline-add").removeClass("glyphicon-pencil").addClass("glyphicon-floppy-disk");
        //updateChosen();
    });

    // Row inline Editing Function
    function rowInlineEditing (element) {
        var editIcon = element.find(".row-inline-edit");
        //Editing
        if (editIcon.hasClass("glyphicon-pencil")) {
            editIcon.removeClass("glyphicon-pencil").addClass("glyphicon-floppy-disk");
            element.children(".row-inline-editable").addClass("active");
        }
        //Saving
        else if (editIcon.hasClass("glyphicon-floppy-disk")) {
            // console.log("Save Mode");
            editIcon.removeClass("glyphicon-floppy-disk").addClass("glyphicon-pencil");
            element.children(".row-inline-editable").each(function (index, value) {
                var value = $(this).children("span").text();
                var span = $(this).children("span");
                var text = $(this).children("input[type='text']");
                var checkbox = $(this).children("input[type='checkbox']");
                var select = $(this).children("select");
                var dataSearch = $(this); //
                //console.log("this is it:"+$(this));
                if (select.length) {
                    var input = select;
                    var value = input.val();
                    if (value) {
                        span.text(value);
                        dataSearch.attr("data-search", value);
                        // put datasearch value
                        // dataSearch.text(value);
                    } else {
                        span.text("");
                        dataSearch.attr("data-search", "");
                    }
                    //console.log("Select:"+ value);
                } else if (text.length) {
                    var input = text;
                    var value = input.val();
                    span.text(value);
                    dataSearch.attr("data-search", value);

                    //console.log("input:"+ value);
                } else if (checkbox.length) {
                    var input = checkbox;
                    var value = input.val();
                    //console.log("checkbox:"+ value);
                    if (checkbox.is(":checked")) {
                        $(this).find("span i").removeClass("fa-times");
                        $(this).find("span i").addClass("fa-check");
                        dataSearch.attr("data-search", "Yes");
                    } else {
                        $(this).find("span i").removeClass("fa-check");
                        $(this).find("span i").addClass("fa-times");
                        dataSearch.attr("data-search", "No");
                    }
                }
            });

            element.children(".row-inline-editable").removeClass("active");
        }
    }
    // Cell inline editing
    $("inline-editable span").click(function (e) {
        inlineEditing($(this).parent());
    });

    // Cell inline Editing Function Used for Row in Line editing
    function inlineEditing (element) {
        var value = element.children("span").text();
        var span = element.children("span");
        var text = element.children("input");
        var select = element.children("select");

        if (select.length) {
            var input = select;
        }
        if (text.length) {
            var input = text;
        }
        element.addClass("active");
        input.val(value);
        $(input).focus();
        $(input).blur(function () {
            //Send to DB and if success
            var value = input.val();
            span.text(value);
            $(element).removeClass("active");
        });
    }
    // delete row
    /*
    $(".t-delete").click(function () {
        if (confirm("You will delete the row ! Are you sure ?") == true) {
            $(this).closest("tr").remove();
        } else {
            return;
        }
    });*/
});
// Call & Recall Select2
function reSelect2 (element) {
    //$(element).select2("destroy");

    //Manual Select2 Destroy as it's function didn't work
    $(element).removeClass("select2-hidden-accessible").removeAttr("data-select2-id tabindex aria-hidden").siblings(".select2-container").remove();

    if (element.prop("multiple")) {
        $(element).select2({
            width: "100%",
            multiple: true,
            dropdownAutoWidth: true,
            allowClear: true,
            closeOnSelect: false,
            tags: false
        });
    } else {
        $(element).select2({
            width: "100%"
        });
    }
}
// Row inline Add
$(document).ready(function () {
    $(".addNewRows").click(function () {
        var newRow = $(this).closest(".sub-title").siblings().find(".newrow");
        var newRowcontent = newRow.clone().removeClass("newrow").addClass("notsaved");
        newRow.closest("tbody").prepend(newRowcontent);
        reSelect2(newRowcontent.find("select[class*='chosen-']"));
    });
});
// New Row
$(document).ready(function () {
// New Row
    $(".addRow a").click(function () {
        var newRow = $(this).parent().parent().parent().find(".newrow");
        var newRowcontent = newRow.clone().removeClass("newrow").addClass("notsaved");
        newRow.closest("tbody").prepend(newRowcontent);
         reSelect2(newRowcontent.find("select[class*='chosen-']"));
    });
//
    $(document).on('click', '.addRows', function () {
        var newRow = $(this).parent().parent().siblings().children().children().children().children().find(".new-row");
        var newRowcontent = newRow.clone().removeClass("new-row").addClass("notsaved");
        newRow.closest("tbody").prepend(newRowcontent);
         reSelect2(newRowcontent.find("select[class*='chosen-']"));
    });




});
// remove row
$(document).ready(function () {
    /*
    $(".right-content, table").on("click", ".remove-row", function () {
        if (confirm("You will delete the row ! Are you sure ?") == true) {
            $(this).closest("tr").remove();
        } else {
            return;
        }
    });*/

});
//openBedBrowser bedBrows
$(document).ready(function () {
    $(document).on("click", ".openBedBrowser", function () {
        $(".bedBrows").toggleClass("dnone");
    });
});
// ///////////////////////////////////// blank-box patient-content
$(document).ready(function () {
    $(document).on("click", ".patient-panel ul li", function () {
        $(".patient-content").removeClass("dnone");
        $(".blank-box").addClass("dnone");
    });
});

// Patients Panel Draggable Patient
//Define Lists and Relations
var dropableList = [
    ['#waiting-list', ['#ambulance-list > .panel-list  > .panel-item']],
    ['#triage-list', ['#ambulance-list > .panel-list  > .panel-item','#waiting-list > .panel-list  > .panel-item']],
    ['#examination-list', ['#ambulance-list > .panel-list  > .panel-item','#waiting-list > .panel-list  > .panel-item','#triage-list > .panel-list  > .panel-item']]
];


/*
function dropCards() {
    // Make Original Draggable List Draggable
    $( ".panel-item").draggable({
        cancel: "a.ui-icon", // clicking an icon won't initiate dragging
        revert: "invalid", // when not dropped, the item will revert back to its initial position
        containment: "document",
        helper: "clone",
        cursor: "move"
    });

    $('#waiting-list .panel-item').droppable({

        accept: '#ambulance-list > .panel-list  > .panel-item',
        classes: {
            "ui-droppable-active": "ui-state-highlight"
        },
        drop: function( event, ui ) {
            var destinationPanel    = $(this.closest(".patient-panel")),
                list                = destinationPanel.find(".panel-list"),
                modalSelector       = destinationPanel.attr("data-modal");

            ui.draggable.appendTo(list);
            //Catch This event to make what ever you want

            $(modalSelector).modal('show');
            $( ".panel-item").draggable({
                cancel: "a.ui-icon", // clicking an icon won't initiate dragging
                revert: "invalid", // when not dropped, the item will revert back to its initial position
                containment: "document",
                helper: "clone",
                cursor: "move"
            });
        }
    });

    $('#triage-list').droppable({
        accept: '#ambulance-list > .panel-list  > .panel-item, #waiting-list > .panel-list  > .panel-item',
        classes: {
            "ui-droppable-active": "ui-state-highlight"
        },
        drop: function( event, ui ) {
            var destinationPanel    = $(this.closest(".patient-panel")),
                list                = destinationPanel.find(".panel-list"),
                modalSelector       = destinationPanel.attr("data-modal");

            ui.draggable.appendTo(list);
            //Catch This event to make what ever you want

            $(modalSelector).modal('show');
            dropCards()
        }
    });

    $('#examination-list').droppable({
        accept: '#ambulance-list > .panel-list  > .panel-item , #waiting-list > .panel-list  > .panel-item, #triage-list > .panel-list  > .panel-item',
        classes: {
            "ui-droppable-active": "ui-state-highlight"
        },
        drop: function( event, ui ) {
            var destinationPanel    = $(this.closest(".patient-panel")),
                list                = destinationPanel.find(".panel-list"),
                modalSelector       = destinationPanel.attr("data-modal");

            ui.draggable.appendTo(list);
            //Catch This event to make what ever you want

            $(modalSelector).modal('show');
            dropCards()
        }
    });
};*/

// New Row
$(document).on('click', '.addRow a', function(){
    var addingArea      = $(this).closest(".addingArea");
    var newRow          = addingArea.find('.newrow');

    var newRowContent   = newRow.clone();
    newRowContent.removeClass("newrow");



    if($(this).hasClass("page-add")){
        var newRow = $(this).closest(".main-content").find(".newrow");
        console.log(newRow);
    }else{

    }
    var newRowcontent   = newRow.clone().removeClass("newrow").addClass("notsaved");
    var table           = $(newRow).closest("table");

    /*
    if ( $.fn.dataTable.fnIsDataTable(table) ) {

        // Get table reference - note: dataTable() not DataTable()
        var table = $(newRow).closest("table").dataTable();
        // Get api
        var dt = table.api();
        // Insert row (inserted as the last element in aiDisplayMaster array)
        dt.row.add(newRowcontent).draw(1);
        // Get the array holding the rows
        var aiDisplayMaster = table.fnSettings()['aiDisplayMaster'];
        // Remove the last element in the array
        var moveRow = aiDisplayMaster.pop();
        // add row to the beginning of the array
        aiDisplayMaster.unshift(moveRow);
        dt.draw(false);

    } else{
        newRow.closest("table").find("tbody").prepend(newRowcontent);
    }

*/
    var addRow = table.children('tbody').children('tr:first');

    if(addRow.find("select.select2")){
        reSelect2(addRow.find("select.select2"));
    }


});

$(document).ready(function () {
    //
   // dropCards();

});

    // tooltip //

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger : 'hover'
        });
    });

    // Collapse dropdown action menu //
    $('.dropdown-actions').on("click", function() {
        var div = $(this).parent().find(".position-relative");

        if(div.hasClass("show")){
            $(this).find(".ms-auto").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        }else{
            $(this).find(".ms-auto").addClass("fa-chevron-down").removeClass("fa-chevron-up");
        }
    });


$(document).ready(function(){
    var stop =false;
    $('.addInTitle .fas').click(function(){

        if($('.addInTitle .fas').hasClass('fa-plus') & !$('.createElement').hasClass('d-none')){//edit mood is active
            //alert("edit mood is active");
            $('.createElement').addClass('d-none');
        }

        $('.createElement  input').val("");
        $('.createElement').toggleClass('d-none');
        $(this).toggleClass('fa-plus fa-minus');




    });

    $('.editInTitle .fas').click(function(){

        if($('.addInTitle .fas').hasClass('fa-minus')){//Add mood is active
            //alert("Add mood is active");
            $('.addInTitle .fas').toggleClass('fa-plus fa-minus');
            $('.createElement').addClass('d-none');
        }

        $('.createElement  input').val("");
        $('.createElement').removeClass('d-none');





    });
});