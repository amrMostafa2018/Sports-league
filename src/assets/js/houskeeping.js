$(document).ready(function () {

    //Building Header edit & save
    $('.right-content').on('click', '.building-header  .edit', function(){
        var parent = $(this).closest('.building-header');

        parent.find(".buildingFloors input").attr("disabled","disabled")

        if(parent.hasClass("editMode")){
            var numberOfRows            = parseInt(parent.find('.buildingFloors input').val());
            var numberOfCurrentRows     = $(this).closest('.building').find('.building-table>tbody>tr').not(".new-row").length;
            var numberOfAddRows         = numberOfRows - numberOfCurrentRows;
            var newRow                  = $(this).closest('.building').find('.building-table>tbody>tr.new-row');


            for (i = 0; i < numberOfAddRows; i++) {
                var newRowContent   = newRow.clone();


                //prepare the new row content for cloning
                newRowContent.removeClass("new-row");
                newRowContent.addClass("editMode");
                //adding the min & max floor N#
                newRowContent.find(".number-spinner input[type='text']").attr('data-min',-Math.abs(numberOfRows)).attr('data-max',"1");
                //destroy and rebuild select2
                newRowContent.find("select.select2").removeAttr("data-select2-id tabindex aria-hidden").removeClass("select2-hidden-accessible");
                newRowContent.find("span.select2").remove();
                newRowContent.find("select.select2").select2({ width: '100%'});

                newRow.find(".show").text(parseInt(i)+1 );
                newRow.before(newRowContent);
                newRow.find(".number-spinner").remove();

            }

        }
        InlineEditing(parent);
        $(this).children(".glyphicon").toggleClass("glyphicon-pencil glyphicon-floppy-disk");

    });

    //Building Row edit & save
    $('.right-content').on('click', '.building-table  .edit', function(){
        var parent = $(this).closest('.building-table tr');

        InlineEditing(parent);
        $(this).children(".glyphicon").toggleClass("glyphicon-pencil glyphicon-floppy-disk");
    });


    //Number Spinner
    var numberSpinner = (function() {
        $('.right-content').on('click', '.number-spinner button', function(){
            var btn         = $(this),
                building    = $(this).closest(".building"),
                min         = parseInt(btn.closest('.number-spinner').find('input').attr("data-min").trim()),
                max         = parseInt(btn.closest('.number-spinner').find('input').attr("data-max").trim()),
                oldValue    = parseInt(btn.closest('.number-spinner').find('input').val().trim()),
                newVal      = parseInt(0);
                oldValue = oldValue || 0;

                //console.log(oldValue);

            if (btn.attr('data-dir') === 'up') {

                newVal = oldValue + 1;
                btn.closest('.number-spinner').find('.btn[data-dir="down"]').removeAttr("disabled");

                if (typeof max === 'undefined' || max === null) {

                }else {
                    if (oldValue === max) {
                        newVal = max;
                        btn.attr("disabled","disabled");
                    }

                }
            } else {
                //console.log(min);
                newVal = oldValue - 1;
                btn.closest('.number-spinner').find('.btn[data-dir="up"]').removeAttr("disabled");

                if (typeof min === 'undefined' || min === null) {

                }else {
                    if (oldValue === min) {
                        newVal = min;
                        btn.attr("disabled","disabled");
                    }

                }

            }
            btn.closest('.number-spinner').find('input').val(newVal);
            recountFloors(building, newVal);
        });

    })();

    //recount Floors
    function recountFloors(building, newVal) {

        building.find(".show").not(".number-spinner + .show").each(function (index, value) {
            var basement    = parseInt($(this).closest(".building").find('.number-spinner input').val());
            var floorNo     = basement + index + 1;
            $(this).text(floorNo);

        });

    };

    //Clone Department & Groups
    $('.right-content').on('click', '.departments .addRow, .groups .addRow', function(){

        var newRow          = $(this).closest('.departments, .groups').children('table').children('tbody').children('.new-row');
        var firstRow        = newRow.parent().children(":first");
        var newRowContent   = newRow.clone();
        newRowContent.removeClass("new-row");
        //newRowContent.find("select.select2").select2("destroy");
        newRowContent.find("select.select2").removeAttr("data-select2-id tabindex aria-hidden").removeClass("select2-hidden-accessible");
        newRowContent.find("span.select2").remove();

        newRowContent.find("select.select2").select2({ width: '100%'});
        firstRow.before(newRowContent);
    });

//Clone Cleaning Areas & Groups Members
    $('.right-content').on('click', '.departments .cleaningArea .addArea,.groups .groupMembers .addArea', function(){

        var newRow          = $(this).closest('.departments .cleaningArea,.groups .groupMembers').find('.new-row');
        var firstRow        = newRow.parent().children(":first");
        var newRowContent   = newRow.clone();
        newRowContent.removeClass("new-row");
        //newRowContent.find("select.select2").select2("destroy");
        newRowContent.find("select.select2").removeAttr("data-select2-id tabindex aria-hidden").removeClass("select2-hidden-accessible");
        newRowContent.find("span.select2").remove();

        newRowContent.find("select.select2").select2({ width: '100%'});
        firstRow.before(newRowContent);
    });

    //Clone Activity Type
    $('.right-content').on('click', '.addActivity', function(){
        var newRow          = $('.table .new-row');
        var newRowContent   = newRow.clone();
        newRowContent.removeClass("new-row");
        //newRowContent.find("select.select2").select2("destroy");
        newRowContent.find(".icon-picker").removeAttr("style");
        newRowContent.find(".icons-selector").remove();

        newRowContent.find(".icon-picker").fontIconPicker({iconsPerPage: 25,theme: 'fip-bootstrap'});
        newRow.before(newRowContent);
    });

});


$(document).ready(function () {
    $('.select2').select2({ width: '100%'});
});

jQuery(document).ready(function($) {

    $('.icon-picker').fontIconPicker({
        iconsPerPage: 25,
        theme: 'fip-bootstrap'
    });

});