$(document).ready(function() {
    var strings = [];
    var activeRows = 1;
    
    watchInputs();
    
    $('#add-cell').on('click', function() {
        var stringLength = 0;
        var string = '';
        activeRows++;
        
        if (strings[activeRows - 1]) {
            stringLength = strings[activeRows-1].length;
            string = strings[activeRows-1];
        }
        
        //gives a template for a row when add is called
        var rowTemplate = '' +
            '<tr>' +
                '<td>' +
                    '<span class="row-number">' + activeRows + '</span>' +
                '</td>' +
                '<td>' +
                    '<input type="text" value="' + string + '" data-index="' + (activeRows-1) + '">' +
                '</td>' +
                '<td>' +
                    '<span class="string-length">' + stringLength + '</span>' +
                '</td>' +
            '</tr>';
        
        $('tbody').append(rowTemplate); 
        watchInputs();
    });
    
    //had to put this into a function and call at beginning 
    //because it would only take affect on the first input
    function watchInputs() {
        $('input').on('keyup', function() {
            var element = $(this);
            var index = element.data('index');
            var string = element.val();
            var stringLength = string.length;

            strings[index] = string;
            element.closest('tr').find('.string-length').text(stringLength);
        });
    }
    
    //removes last child of row without affecting the array
    $('#remove-cell').on('click', function() {
        if (activeRows > 1) {
            activeRows--; 
            $('tr:last-child').remove();
        }
    });
    
    
    $('#sort').on('click', function() {
        var newArray=[];  
        for(var i=0; i<activeRows; i++) {
            newArray.push(strings[i]); 
        }
        
        newArray.sort();
        
        //push sorted array to original array, but only to 
        //activeRows so that the rest of the array
        //remains unchanged
        for(var j=0; j<activeRows; j++) {
            strings[j] = newArray[j];
            $($('input')[j]).val(strings[j]);
            if (strings[j]) {
                $($('.string-length')[j]).text(strings[j].length);
            }
        }
    });    
});